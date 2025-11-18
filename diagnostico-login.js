const axios = require('axios');

async function diagnosticarLogin() {
  console.log('🔍 DIAGNÓSTICO DE LOGIN\n');
  
  // 1. Verificar variables de entorno
  console.log('📋 Paso 1: Verificando variables de entorno...');
  try {
    const diagnosticResponse = await axios.get('http://localhost:3000/api/diagnostic');
    console.log('✅ Variables de entorno:');
    console.log(JSON.stringify(diagnosticResponse.data, null, 2));
  } catch (error) {
    console.log('❌ Error verificando variables:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️ El servidor no está corriendo. Inicia el backend primero.');
      return;
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // 2. Verificar conexión a base de datos
  console.log('📋 Paso 2: Verificando conexión a base de datos...');
  try {
    const healthResponse = await axios.get('http://localhost:3000/api/health');
    console.log('✅ Estado de la base de datos:');
    console.log(JSON.stringify(healthResponse.data, null, 2));
  } catch (error) {
    console.log('❌ Error verificando base de datos:', error.response?.data || error.message);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // 3. Intentar login
  console.log('📋 Paso 3: Intentando login...');
  try {
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'admin@rvautomoviles.com',
      password: 'Admin123!'
    });
    console.log('✅ Login exitoso:');
    console.log(JSON.stringify(loginResponse.data, null, 2));
  } catch (error) {
    console.log('❌ Error en login:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
      
      // Análisis del error
      console.log('\n🔍 ANÁLISIS DEL ERROR:\n');
      
      if (error.response.status === 500) {
        console.log('⚠️ Error 500 - Error del servidor');
        console.log('\nPosibles causas:');
        console.log('1. ❌ La base de datos no está conectada');
        console.log('2. ❌ Falta la variable JWT_SECRET');
        console.log('3. ❌ Las tablas no existen en la base de datos');
        console.log('4. ❌ Error en el hash de la contraseña');
        console.log('\nVerifica el log del servidor backend para más detalles.');
      } else if (error.response.status === 401) {
        console.log('⚠️ Error 401 - Credenciales inválidas');
        console.log('\nPosibles causas:');
        console.log('1. ❌ El usuario no existe en la base de datos');
        console.log('2. ❌ La contraseña es incorrecta');
        console.log('\nPrueba crear un nuevo usuario admin.');
      } else if (error.response.status === 400) {
        console.log('⚠️ Error 400 - Datos inválidos');
        console.log('Los datos enviados no cumplen con las validaciones.');
      }
    } else {
      console.log('Error completo:', error.message);
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  console.log('✅ Diagnóstico completado\n');
}

diagnosticarLogin().catch(console.error);
