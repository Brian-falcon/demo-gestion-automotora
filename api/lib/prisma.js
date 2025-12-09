// Prisma Client - Conexión a PostgreSQL (Neon)
const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  // Usar POSTGRES_PRISMA_URL de Neon o DATABASE_URL como fallback
  const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ ERROR: POSTGRES_PRISMA_URL o DATABASE_URL no están configuradas');
    throw new Error('POSTGRES_PRISMA_URL o DATABASE_URL no están configuradas');
  }

  console.log('🔗 Conectando a base de datos:', databaseUrl.substring(0, 30) + '...');

  return new PrismaClient({
    log: ['query', 'error', 'warn', 'info'],
    errorFormat: 'pretty',
  });
};

const globalForPrisma = global;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Verificar conexión al iniciar
prisma.$connect()
  .then(() => {
    console.log('✅ Prisma conectado exitosamente a la base de datos');
  })
  .catch((error) => {
    console.error('❌ Error al conectar Prisma:', error);
  });

module.exports = prisma;
