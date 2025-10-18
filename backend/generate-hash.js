const bcrypt = require('bcryptjs');

// Generar hash de "admin123"
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('\n==============================================');
console.log('🔐 Hash de contraseña para admin@rv.com');
console.log('==============================================\n');
console.log('Contraseña:', password);
console.log('Hash:', hash);
console.log('\n==============================================');
console.log('Usa este hash en el SQL:');
console.log('==============================================\n');
console.log(`INSERT INTO "Usuario" ("email", "password", "rol")
VALUES ('admin@rv.com', '${hash}', 'admin');`);
console.log('\n');
