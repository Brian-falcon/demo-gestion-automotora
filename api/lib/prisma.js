// Prisma Client compartido para todas las funciones serverless
const { PrismaClient } = require('@prisma/client');

// Singleton pattern para Prisma Client (evita múltiples instancias)
const prismaClientSingleton = () => {
  // Verificar que las variables de entorno estén configuradas
  if (!process.env.POSTGRES_PRISMA_URL) {
    console.error('❌ ERROR: POSTGRES_PRISMA_URL no está configurada');
  }
  if (!process.env.POSTGRES_URL_NON_POOLING) {
    console.error('❌ ERROR: POSTGRES_URL_NON_POOLING no está configurada');
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.POSTGRES_PRISMA_URL,
      },
    },
  });
};

const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// En producción (Vercel serverless), también guardamos en global para reutilizar
if (process.env.NODE_ENV === 'production') {
  globalForPrisma.prisma = prisma;
} else {
  globalForPrisma.prisma = prisma;
}

// Función helper para asegurar conexión (si no existe)
if (!prisma.$connect || typeof prisma.$connect !== 'function') {
  const originalConnect = prisma.$connect;
  prisma.$connect = async () => {
    try {
      // Si ya está conectado, no hacer nada
      if (prisma._connectionState === 'connected') {
        return;
      }
      await prisma.$queryRaw`SELECT 1`;
      prisma._connectionState = 'connected';
      console.log('✅ Prisma Client conectado correctamente');
    } catch (error) {
      prisma._connectionState = 'disconnected';
      console.error('❌ Error conectando Prisma:', error.message);
      console.error('Error completo:', error);
      throw error;
    }
  };
}

module.exports = prisma;
