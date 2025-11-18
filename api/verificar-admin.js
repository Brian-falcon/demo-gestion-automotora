const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function verificarYCrearAdmin() {
  console.log('🔍 Verificando usuario admin...\n');
  
  try {
    // Verificar conexión
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Conexión a base de datos exitosa\n');
    
    // Buscar usuarios admin
    const admins = await prisma.usuario.findMany({
      where: { rol: 'admin' }
    });
    
    if (admins.length > 0) {
      console.log(`✅ Se encontraron ${admins.length} usuario(s) admin:`);
      admins.forEach((admin, index) => {
        console.log(`\n${index + 1}. Email: ${admin.email}`);
        console.log(`   ID: ${admin.id}`);
        console.log(`   Creado: ${admin.createdAt}`);
      });
      
      console.log('\n⚠️ Si no puedes iniciar sesión con estos usuarios, es posible que hayas olvidado la contraseña.');
      console.log('¿Deseas crear un NUEVO usuario admin? Ejecuta: node crear-admin.js\n');
    } else {
      console.log('❌ No se encontraron usuarios admin\n');
      console.log('🔧 Creando usuario admin por defecto...\n');
      
      const email = "admin@rvautomoviles.com";
      const password = "Admin123!";
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const admin = await prisma.usuario.create({
        data: {
          email,
          password: hashedPassword,
          rol: "admin",
        },
      });
      
      console.log('✅ Usuario admin creado exitosamente!\n');
      console.log('📧 Email:', email);
      console.log('🔑 Contraseña:', password);
      console.log('\n⚠️ IMPORTANTE: Guarda estas credenciales en un lugar seguro.');
      console.log('⚠️ Cambia la contraseña después del primer login.\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'P1001' || error.code === 'P1000') {
      console.error('\n⚠️ Error de conexión a la base de datos.');
      console.error('Verifica que:');
      console.error('1. Las variables POSTGRES_PRISMA_URL y POSTGRES_URL_NON_POOLING estén configuradas');
      console.error('2. La base de datos en Neon esté activa');
      console.error('3. Las URLs sean correctas\n');
    } else if (error.code === 'P2021') {
      console.error('\n⚠️ La tabla "Usuario" no existe en la base de datos.');
      console.error('Ejecuta: npx prisma db push\n');
    } else {
      console.error('\nError completo:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

verificarYCrearAdmin();
