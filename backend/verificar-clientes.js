const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verificarClientes() {
  try {
    console.log('🔍 Verificando clientes sin usuario...\n');
    
    const clientesSinUsuario = await prisma.cliente.findMany({
      where: { usuario: null },
      include: {
        autos: {
          include: {
            pagos: true
          }
        }
      }
    });

    console.log(`📊 Total de clientes sin usuario: ${clientesSinUsuario.length}\n`);

    if (clientesSinUsuario.length > 0) {
      console.log('❌ Clientes sin usuario:');
      clientesSinUsuario.forEach(cliente => {
        const totalPagos = cliente.autos.reduce((sum, auto) => sum + auto.pagos.length, 0);
        const pagosPendientes = cliente.autos.reduce((sum, auto) => 
          sum + auto.pagos.filter(p => p.estado === 'pendiente').length, 0
        );
        
        console.log(`\n  - ID: ${cliente.id}`);
        console.log(`    Nombre: ${cliente.nombre}`);
        console.log(`    Cédula: ${cliente.cedula}`);
        console.log(`    Email: ${cliente.email}`);
        console.log(`    Autos: ${cliente.autos.length}`);
        console.log(`    Total pagos: ${totalPagos}`);
        console.log(`    Pagos pendientes: ${pagosPendientes}`);
      });
    } else {
      console.log('✅ Todos los clientes tienen usuario asignado');
    }

    console.log('\n📋 Resumen de todos los clientes:');
    const todosClientes = await prisma.cliente.findMany({
      include: {
        usuario: true,
        autos: {
          include: {
            pagos: true
          }
        }
      }
    });

    todosClientes.forEach(cliente => {
      const pagosPendientes = cliente.autos.reduce((sum, auto) => 
        sum + auto.pagos.filter(p => p.estado === 'pendiente').length, 0
      );
      
      console.log(`\n  Cliente: ${cliente.nombre} (${cliente.cedula})`);
      console.log(`    Usuario: ${cliente.usuario ? '✅ SÍ' : '❌ NO'}`);
      console.log(`    Email: ${cliente.email}`);
      console.log(`    Pagos pendientes: ${pagosPendientes}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verificarClientes();
