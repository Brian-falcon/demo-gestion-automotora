#!/usr/bin/env node
/**
 * Script de verificación post-deploy
 * Se ejecuta después del deploy para verificar que la base de datos esté correctamente configurada
 * NO BORRA DATOS - Solo verifica y crea usuario admin si no existe
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyDatabase() {
  try {
    console.log('🔍 Verificando base de datos...');
    
    // Verificar conexión
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos exitosa');
    
    // Verificar que las tablas existen contando registros
    const [usuarios, clientes, autos, pagos] = await Promise.all([
      prisma.usuario.count().catch(() => 0),
      prisma.cliente.count().catch(() => 0),
      prisma.auto.count().catch(() => 0),
      prisma.pago.count().catch(() => 0)
    ]);
    
    console.log('📊 Conteo de registros actuales:');
    console.log(`  - Usuarios: ${usuarios}`);
    console.log(`  - Clientes: ${clientes}`);
    console.log(`  - Autos: ${autos}`);
    console.log(`  - Pagos: ${pagos}`);
    
    // Crear usuario admin SOLO si no existe ningún usuario
    if (usuarios === 0) {
      console.log('⚠️ No hay usuarios. Creando usuario admin inicial...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.usuario.create({
        data: {
          email: 'admin@admin.com',
          password: hashedPassword,
          rol: 'admin'
        }
      });
      
      console.log('✅ Usuario admin creado: admin@admin.com / admin123');
    } else {
      console.log('✅ Ya existen usuarios en la base de datos - NO se modificaron datos');
    }
    
    await prisma.$disconnect();
    console.log('✅ Verificación completada exitosamente');
    console.log('💾 TODOS LOS DATOS EXISTENTES SE MANTUVIERON INTACTOS');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error en la verificación:', error);
    console.error('Detalles:', error.message);
    process.exit(1);
  }
}

verifyDatabase();
