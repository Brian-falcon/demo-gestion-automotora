const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function actualizarAdmin() {
  try {
    console.log('🔄 Actualizando credenciales del administrador...\n');

    // Eliminar usuario anterior
    await prisma.usuario.deleteMany({
      where: {
        email: 'admin@automanager.com'
      }
    });
    console.log('✅ Usuario anterior eliminado');

    // Crear hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash('Marcos1985', 10);

    // Crear o actualizar el nuevo administrador
    const admin = await prisma.usuario.upsert({
      where: { email: 'marcos@rvautomoviles.com' },
      update: {
        password: hashedPassword,
        rol: 'admin'
      },
      create: {
        email: 'marcos@rvautomoviles.com',
        password: hashedPassword,
        rol: 'admin'
      }
    });

    console.log('✅ Nuevo administrador creado/actualizado:');
    console.log('   Email:', admin.email);
    console.log('   Rol:', admin.rol);
    console.log('\n🎉 ¡Credenciales actualizadas exitosamente!');
    console.log('\n📧 Email: marcos@rvautomoviles.com');
    console.log('🔑 Password: Marcos1985\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

actualizarAdmin();
