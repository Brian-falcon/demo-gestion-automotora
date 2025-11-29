const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');
const prisma = require('../lib/prisma');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Solo admin puede gestionar clientes
router.use(isAdmin);

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const { buscar, incluirInactivos } = req.query;
    
    const where = {
      // Por defecto, solo mostrar clientes activos (no archivados)
      activo: incluirInactivos === 'true' ? undefined : true
    };
    
    if (buscar) {
      where.OR = [
        { nombre: { contains: buscar, mode: 'insensitive' } },
        { cedula: { contains: buscar, mode: 'insensitive' } },
        { telefono: { contains: buscar, mode: 'insensitive' } },
        { email: { contains: buscar, mode: 'insensitive' } },
      ];
    }

    const clientes = await prisma.cliente.findMany({
      where,
      include: {
        autos: {
          select: {
            id: true,
            marca: true,
            modelo: true,
            matricula: true,
            estado: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: {
        autos: {
          include: {
            pagos: true
          }
        }
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
  try {
    const { nombre, cedula, telefono, direccion, email } = req.body;

    console.log('📝 Creando cliente:', { nombre, cedula, telefono, email });

    // Validar campos obligatorios
    if (!nombre || !cedula || !telefono) {
      return res.status(400).json({ error: 'Nombre, cédula y teléfono son obligatorios' });
    }

    // Función para generar cédula/email únicos con sufijo
    const generarCedulaUnica = async (cedulaBase) => {
      let cedula = cedulaBase;
      let contador = 1;
      
      while (await prisma.cliente.findFirst({ where: { cedula } })) {
        contador++;
        cedula = `${cedulaBase}-${contador}`;
      }
      
      return { cedula, esDuplicada: contador > 1, sufijo: contador > 1 ? `-${contador}` : '' };
    };

    const generarEmailUnico = async (emailBase) => {
      if (!emailBase) return { email: null, esDuplicado: false, sufijo: '' };
      
      let email = emailBase;
      let contador = 1;
      const [localPart, domain] = emailBase.split('@');
      
      while (await prisma.usuario.findFirst({ where: { email } })) {
        contador++;
        email = `${localPart}+plan${contador}@${domain}`;
      }
      
      return { email, esDuplicado: contador > 1, sufijo: contador > 1 ? `+plan${contador}` : '' };
    };

    // Generar cédula y email únicos
    const { cedula: cedulaUnica, esDuplicada, sufijo: sufijoCedula } = await generarCedulaUnica(cedula);
    const { email: emailUnico, esDuplicado, sufijo: sufijoEmail } = await generarEmailUnico(email);

    console.log('🔄 Generando identificadores únicos:', { 
      cedulaOriginal: cedula, 
      cedulaUnica, 
      emailOriginal: email, 
      emailUnico 
    });

    // Crear cliente y opcionalmente usuario en una transacción
    const result = await prisma.$transaction(async (tx) => {
      // Crear cliente con cédula única
      const cliente = await tx.cliente.create({
        data: {
          nombre,
          cedula: cedulaUnica,
          telefono,
          direccion: direccion || null,
          email: emailUnico,
        }
      });

      let passwordCliente = null;

      // Solo crear usuario si se proporciona email
      if (emailUnico) {
        // Crear usuario con contraseña = últimos 4 dígitos de cédula ORIGINAL
        passwordCliente = cedula.slice(-4);
        const hashedPassword = await bcrypt.hash(passwordCliente, 10);
        
        await tx.usuario.create({
          data: {
            email: emailUnico,
            password: hashedPassword,
            rol: 'cliente',
            clienteId: cliente.id,
          }
        });
      }

      return { cliente, passwordCliente, esDuplicada, sufijoCedula, esDuplicado, sufijoEmail };
    });

    console.log('✅ Cliente creado:', result.cliente.id);

    const response = {
      ...result.cliente,
    };

    // Agregar información sobre cambios realizados
    if (result.esDuplicada || result.esDuplicado) {
      response.mensajeInfo = `Cliente creado con ajustes automáticos:\n`;
      if (result.esDuplicada) {
        response.mensajeInfo += `- Cédula ajustada: ${cedula} → ${result.cliente.cedula}\n`;
      }
      if (result.esDuplicado) {
        response.mensajeInfo += `- Email ajustado: ${email} → ${result.cliente.email}\n`;
      }
    }

    if (result.passwordCliente) {
      response.passwordTemporal = result.passwordCliente;
    }

    res.status(201).json(response);
  } catch (error) {
    console.error('❌ Error al crear cliente:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Error al crear cliente',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, telefono, direccion, email } = req.body;

    console.log('📝 Actualizando cliente:', id, { nombre, cedula, telefono, email });

    // Verificar si el cliente existe
    const existingCliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const cliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        cedula,
        telefono,
        direccion: direccion || null,
        email: email || null,
      }
    });

    console.log('✅ Cliente actualizado:', cliente.id);

    res.json(cliente);
  } catch (error) {
    console.error('❌ Error al actualizar cliente:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Error al actualizar cliente',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: {
        autos: true
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Si tiene autos asociados, no permitir eliminación directa
    if (cliente.autos.length > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar un cliente con autos asociados. Elimine o reasigne los autos primero.' 
      });
    }

    await prisma.cliente.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;
