async function probarLoginCliente() {
  try {
    console.log('🔐 Probando login de cliente con cédula...\n');
    
    const cedula = '54764325'; // Cédula del cliente Mateo Rodriguez
    
    console.log(`Intentando login con cédula: ${cedula}`);
    
    const response = await fetch('http://localhost:5000/api/auth/login-cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cedula })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('\n❌ Error en login:');
      console.log('Status:', response.status);
      console.log('Error:', data);
    } else {
      console.log('\n✅ Login exitoso!');
      console.log('Token:', data.token);
      console.log('Usuario:', JSON.stringify(data.user, null, 2));
    }

  } catch (error) {
    console.log('\n❌ Error en login:');
    console.log(error.message);
  }
}

probarLoginCliente();
