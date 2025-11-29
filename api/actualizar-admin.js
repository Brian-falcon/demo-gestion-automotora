const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function actualizarAdmin() {
  try {
    console.log('🔄 Actualizando credenciales del administrador...\n');

    // Contraseña del admin
    const password = 'Marcos1985';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear o actualizar el administrador
    const admin = await prisma.usuario.upsert({
      where: {
        email: 'marcos@rvautomoviles.com'
      },
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

    console.log('✅ Administrador actualizado exitosamente:');
    console.log('   Email:', admin.email);
    console.log('   Rol:', admin.rol);
    console.log('   ID:', admin.id);
    console.log('\n🔑 Contraseña:', password);
    console.log('\n✅ Puedes iniciar sesión con estas credenciales\n');

  } catch (error) {
    console.error('❌ Error al actualizar admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

actualizarAdmin();
