require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const app = express();

// Inicializar Prisma Client
const prisma = new PrismaClient();

// Verificar conexión a base de datos al iniciar
async function verifyDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conexión a base de datos PostgreSQL exitosa');
    
    // Verificar que las tablas existan
    const tables = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    console.log(`📊 Tablas encontradas: ${tables.length}`);
    
    if (tables.length === 0) {
      console.error('❌ ERROR: No se encontraron tablas en la base de datos');
      console.error('🔧 Por favor, ejecuta el script SQL para crear las tablas');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ ERROR: No se pudo conectar a la base de datos');
    console.error('Detalles:', error.message);
    console.error('🔧 Verifica que DATABASE_URL esté correctamente configurado');
    process.exit(1); // Fallar si no hay conexión
  }
}

// Verificar conexión antes de iniciar el servidor
verifyDatabaseConnection();

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const autosRoutes = require('./routes/autos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const pagosRoutes = require('./routes/pagos.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// ===== SEGURIDAD =====

// 1. Helmet - Protección contra vulnerabilidades comunes
app.use(helmet());

// 2. CORS Restrictivo
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 3. Rate Limiting General (100 peticiones por 15 minutos)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de peticiones
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(generalLimiter);

// 4. Rate Limiting para Autenticación (5 intentos por 15 minutos)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Demasiados intentos de inicio de sesión, intenta de nuevo en 15 minutos',
  skipSuccessfulRequests: true // No cuenta intentos exitosos
});

// Middleware
app.use(express.json({ limit: '10mb' })); // Limitar tamaño de JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Log de peticiones en desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Rutas (con rate limiting en auth)
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/autos', autosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RV Automoviles API está funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor (solo en desarrollo local)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api`);
  });
}

// Exportar para Vercel serverless
module.exports = app;
