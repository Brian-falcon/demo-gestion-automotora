// Script para crear un logo genérico simple
const fs = require('fs');
const path = require('path');

// Crear un canvas de texto simple con HTML/CSS que se puede convertir
const createSimpleLogoHTML = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 800px;
      height: 320px;
      background: linear-gradient(135deg, #1890cf 0%, #0c5a8a 100%);
    }
    .logo-container {
      text-align: center;
      color: white;
      font-family: Arial, sans-serif;
    }
    .icon {
      font-size: 80px;
      margin-bottom: 10px;
    }
    .title {
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
    }
    .subtitle {
      font-size: 32px;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="logo-container">
    <div class="icon">🚗</div>
    <div class="title">Gestión</div>
    <div class="subtitle">Automotora</div>
  </div>
</body>
</html>
`;
};

console.log('Para crear el logo PNG, abre este archivo HTML en un navegador:');
console.log('1. Copia el contenido HTML');
console.log('2. Abre el navegador y presiona F12');
console.log('3. Ve a Console y pega: document.body.innerHTML = `[CONTENIDO HTML]`');
console.log('4. Toma un screenshot del área del logo');
console.log('\nO usa el logo SVG que ya fue creado en: /assets/logo-generic.svg');
