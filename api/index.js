// Función serverless de Vercel para manejar todas las peticiones API
// Las variables de entorno son inyectadas automáticamente por Vercel

// Importar el servidor Express
const app = require('../backend/server');

// Exportar como función serverless de Vercel
module.exports = app;
