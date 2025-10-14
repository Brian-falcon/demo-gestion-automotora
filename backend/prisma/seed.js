const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes
  await prisma.pago.deleteMany();
  await prisma.auto.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.usuario.deleteMany();

  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.usuario.create({
    data: {
      email: 'admin@automanager.com',
      password: hashedPassword,
      rol: 'admin',
    },
  });
  console.log('✅ Usuario administrador creado:', admin.email);

  // Crear clientes de ejemplo con sus usuarios
  const clientesData = [
    {
      nombre: 'Juan Pérez',
      cedula: '1234567890',
      telefono: '0999123456',
      direccion: 'Av. Principal 123, Quito',
      email: 'juan.perez@email.com',
    },
    {
      nombre: 'María García',
      cedula: '0987654321',
      telefono: '0988765432',
      direccion: 'Calle Secundaria 456, Guayaquil',
      email: 'maria.garcia@email.com',
    },
    {
      nombre: 'Carlos Rodríguez',
      cedula: '1122334455',
      telefono: '0977889900',
      direccion: 'Av. Los Shyris 789, Quito',
      email: 'carlos.rodriguez@email.com',
    },
    {
      nombre: 'Ana Martínez',
      cedula: '5544332211',
      telefono: '0966554433',
      direccion: 'Av. 6 de Diciembre 321, Quito',
      email: 'ana.martinez@email.com',
    },
  ];

  const clientes = [];
  for (const clienteData of clientesData) {
    // Crear cliente
    const cliente = await prisma.cliente.create({
      data: clienteData,
    });

    // Crear usuario para el cliente con contraseña = últimos 4 dígitos de cédula
    const passwordCliente = clienteData.cedula.slice(-4);
    const hashedPasswordCliente = await bcrypt.hash(passwordCliente, 10);
    await prisma.usuario.create({
      data: {
        email: clienteData.email,
        password: hashedPasswordCliente,
        rol: 'cliente',
        clienteId: cliente.id,
      },
    });

    clientes.push(cliente);
    console.log(`✅ Cliente y usuario creado: ${cliente.nombre} (contraseña: ${passwordCliente})`);
  }
  console.log('✅ Total de clientes creados:', clientes.length);

  // Crear autos de ejemplo
  const auto1 = await prisma.auto.create({
    data: {
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2022,
      matricula: 'ABC-1234',
      precio: 25000,
      estado: 'vendido',
      clienteId: clientes[0].id,
    },
  });

  const auto2 = await prisma.auto.create({
    data: {
      marca: 'Chevrolet',
      modelo: 'Sail',
      anio: 2021,
      matricula: 'XYZ-5678',
      precio: 18000,
      estado: 'vendido',
      clienteId: clientes[1].id,
    },
  });

  const auto3 = await prisma.auto.create({
    data: {
      marca: 'Hyundai',
      modelo: 'Accent',
      anio: 2023,
      matricula: 'DEF-9012',
      precio: 22000,
      estado: 'reservado',
      clienteId: clientes[2].id,
    },
  });

  await prisma.auto.createMany({
    data: [
      {
        marca: 'Kia',
        modelo: 'Rio',
        anio: 2023,
        matricula: 'GHI-3456',
        precio: 20000,
        estado: 'disponible',
      },
      {
        marca: 'Nissan',
        modelo: 'Versa',
        anio: 2022,
        matricula: 'JKL-7890',
        precio: 21000,
        estado: 'disponible',
      },
      {
        marca: 'Mazda',
        modelo: 'Mazda 3',
        anio: 2023,
        matricula: 'MNO-2468',
        precio: 28000,
        estado: 'disponible',
      },
    ],
  });
  console.log('✅ Autos creados: 6');

  // Crear pagos/cuotas de ejemplo para autos vendidos
  const hoy = new Date();
  
  // Cuotas para auto1 (Toyota Corolla) - 24 cuotas mensuales
  const cuotasAuto1 = [];
  for (let i = 1; i <= 24; i++) {
    const fechaVencimiento = new Date(hoy);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + i - 1);
    
    let estado = 'pendiente';
    let fechaPago = null;
    
    // Marcar las primeras 8 cuotas como pagadas
    if (i <= 8) {
      estado = 'pagado';
      fechaPago = new Date(fechaVencimiento);
      fechaPago.setDate(fechaPago.getDate() - 2);
    }
    // La cuota 9 está vencida
    else if (i === 9) {
      fechaVencimiento.setMonth(hoy.getMonth() - 1);
    }

    cuotasAuto1.push({
      autoId: auto1.id,
      numeroCuota: i,
      monto: 1100,
      fechaVencimiento,
      fechaPago,
      estado,
    });
  }

  // Cuotas para auto2 (Chevrolet Sail) - 18 cuotas mensuales
  const cuotasAuto2 = [];
  for (let i = 1; i <= 18; i++) {
    const fechaVencimiento = new Date(hoy);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + i - 1);
    
    let estado = 'pendiente';
    let fechaPago = null;
    
    // Marcar las primeras 5 cuotas como pagadas
    if (i <= 5) {
      estado = 'pagado';
      fechaPago = new Date(fechaVencimiento);
      fechaPago.setDate(fechaPago.getDate() - 1);
    }

    cuotasAuto2.push({
      autoId: auto2.id,
      numeroCuota: i,
      monto: 1000,
      fechaVencimiento,
      fechaPago,
      estado,
    });
  }

  // Cuotas para auto3 (Hyundai Accent) - 20 cuotas mensuales
  const cuotasAuto3 = [];
  for (let i = 1; i <= 20; i++) {
    const fechaVencimiento = new Date(hoy);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + i - 1);
    
    let estado = 'pendiente';
    let fechaPago = null;
    
    // Marcar las primeras 3 cuotas como pagadas
    if (i <= 3) {
      estado = 'pagado';
      fechaPago = new Date(fechaVencimiento);
    }

    cuotasAuto3.push({
      autoId: auto3.id,
      numeroCuota: i,
      monto: 1150,
      fechaVencimiento,
      fechaPago,
      estado,
    });
  }

  await prisma.pago.createMany({
    data: [...cuotasAuto1, ...cuotasAuto2, ...cuotasAuto3],
  });
  console.log('✅ Pagos/cuotas creados:', cuotasAuto1.length + cuotasAuto2.length + cuotasAuto3.length);

  console.log('🎉 Seed completado exitosamente!');
  console.log('\n📋 Credenciales de acceso:');
  console.log('   Email: admin@automanager.com');
  console.log('   Password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
