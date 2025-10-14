# 🔐 Credenciales de Acceso - RV Automoviles

## Sistema de Roles Implementado

RV Automoviles ahora cuenta con **dos niveles de acceso**:

1. **Administrador**: Acceso completo a toda la aplicación
2. **Cliente**: Acceso limitado solo a sus propios datos (ver cuotas pendientes)

---

## 👨‍💼 Acceso Administrador

**Email:** `admin@automanager.com`  
**Contraseña:** `admin123`

### Permisos del Administrador:
- ✅ Ver y gestionar todos los autos
- ✅ Ver y gestionar todos los clientes
- ✅ Ver y gestionar todos los pagos
- ✅ Acceder a reportes y exportaciones
- ✅ Ver estadísticas globales del negocio

---

## 👤 Acceso Clientes

### 🆕 NUEVO: Login Simplificado para Clientes

Los clientes ahora pueden iniciar sesión **únicamente con su cédula**, sin necesidad de contraseña.

**Requisito:** El cliente solo puede acceder si tiene **cuotas pendientes** por pagar.

### Cédulas de Prueba (Acceso Directo):

#### Cliente 1: Juan Pérez
- **Cédula:** `1234567890`
- **Auto:** Toyota Corolla 2022
- ✅ Tiene cuotas pendientes

#### Cliente 2: María García
- **Cédula:** `0987654321`
- **Auto:** Chevrolet Sail 2021
- ✅ Tiene cuotas pendientes

#### Cliente 3: Carlos Rodríguez
- **Cédula:** `1122334455`
- **Auto:** Hyundai Accent 2023
- ✅ Tiene cuotas pendientes

#### Cliente 4: Ana Martínez
- **Cédula:** `5544332211`
- **Autos:** Kia Rio 2022, Nissan Versa 2021, Mazda 3 2023
- ✅ Tiene cuotas pendientes

### 📝 Método de Login Alternativo (Obsoleto)

Los clientes también pueden iniciar sesión con su **email** y contraseña (últimos 4 dígitos de su cédula):

- `juan.perez@email.com` / `7890`
- `maria.garcia@email.com` / `4321`
- `carlos.rodriguez@email.com` / `4455`
- `ana.martinez@email.com` / `2211`

### Permisos del Cliente:
- ✅ Ver solo sus propios autos
- ✅ Ver solo sus propios pagos pendientes
- ✅ Ver su dashboard personal con sus estadísticas
- ❌ No puede ver datos de otros clientes
- ❌ No puede acceder a reportes globales
- ❌ No puede gestionar clientes ni otros autos

---

## 🔄 Creación de Nuevos Clientes

Cuando un administrador crea un nuevo cliente desde la aplicación:

1. Se debe proporcionar: **nombre, cédula, teléfono, dirección y email**
2. El sistema automáticamente crea un usuario para ese cliente
3. La contraseña temporal será los **últimos 4 dígitos de la cédula**
4. El cliente podrá iniciar sesión inmediatamente con su email y contraseña temporal

**Ejemplo:**
- Si se crea un cliente con cédula `1726354890`
- Su contraseña será: `4890`
- Podrá iniciar sesión con su email y esa contraseña

---

## 🏠 URLs de Acceso

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

---

## 📋 Rutas Protegidas por Rol

### Rutas Solo para Administrador:
- `/api/clientes/*` - Gestión de clientes
- `/api/reportes` - Reportes (frontend)

### Rutas con Filtrado por Rol:
- `/api/autos` - Admin ve todos, cliente ve solo los suyos
- `/api/pagos` - Admin ve todos, cliente ve solo los suyos
- `/api/dashboard/stats` - Estadísticas según el rol

### Rutas Públicas:
- `/api/auth/login` - Inicio de sesión
- `/api/auth/register` - Registro (si está habilitado)
- `/api/health` - Estado del servidor

---

## 🔐 Seguridad

- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Tokens válidos por 24 horas
- ✅ Middleware de autorización por roles
- ✅ Validación de permisos en cada endpoint
- ✅ Filtrado automático de datos según el usuario

---

## 💡 Recomendaciones

1. **Para Administradores:**
   - Cambia la contraseña del admin por defecto en producción
   - Informa a los clientes su contraseña temporal
   - Considera implementar un sistema de cambio de contraseña

2. **Para Clientes:**
   - Se recomienda cambiar la contraseña temporal al primer acceso
   - Guarda tus credenciales en un lugar seguro

3. **Para Desarrollo:**
   - Usa las credenciales de prueba proporcionadas
   - El seed reinicia la base de datos cada vez que se ejecuta
   - Ejecuta `node prisma/seed.js` para restaurar los datos de prueba
