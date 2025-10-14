# Database

Esta carpeta contiene la base de datos SQLite del proyecto.

El archivo `automanager.db` se generará automáticamente al ejecutar:

```bash
cd backend
npx prisma db push
npx prisma db seed
```

## Estructura de la Base de Datos

- **Usuario**: Administradores del sistema
- **Cliente**: Clientes de la automotora
- **Auto**: Vehículos en inventario
- **Pago**: Cuotas y pagos asociados a cada auto

## Herramientas

Para visualizar y editar la base de datos:

```bash
cd backend
npx prisma studio
```

Esto abrirá una interfaz web en `http://localhost:5555`
