# 🔧 Configuración de Base de Datos Neon

## 📋 Paso 1: Obtener las URLs de Conexión de Neon

1. **Abre tu dashboard de Neon:**
   ```
   https://console.neon.tech
   ```

2. **Selecciona tu proyecto** (RV Automóviles o el nombre que le hayas dado)

3. **Busca la sección "Connection Details"** o **"Dashboard"**

4. **Copia las dos URLs de conexión:**
   
   ### URL Pooled (con pgbouncer)
   Se ve algo así:
   ```
   postgresql://usuario:password@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
   ```
   Esta es para `POSTGRES_PRISMA_URL`

   ### URL Direct (sin pgbouncer)
   Se ve algo así:
   ```
   postgresql://usuario:password@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   Esta es para `POSTGRES_URL_NON_POOLING`

---

## 📋 Paso 2: Configurar el Archivo `.env` en la Carpeta `api`

1. **Abre el archivo:**
   ```
   c:\Users\poron\OneDrive\Desktop\Proyectos varios vs code\Administracion_RV_Automoviles\api\.env
   ```

2. **Reemplaza las URLs** con las que copiaste de Neon:

   ```env
   # Variables de entorno para desarrollo local
   NODE_ENV=development
   JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion

   # Base de datos PostgreSQL en Neon
   POSTGRES_PRISMA_URL="postgresql://usuario:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true"
   POSTGRES_URL_NON_POOLING="postgresql://usuario:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

   # Frontend URL (para CORS)
   FRONTEND_URL=http://localhost:5173
   VITE_API_URL=http://localhost:3000/api
   ```

---

## 📋 Paso 3: Verificar que las Tablas Existan

Abre tu terminal en la carpeta `api` y ejecuta:

```powershell
cd "c:\Users\poron\OneDrive\Desktop\Proyectos varios vs code\Administracion_RV_Automoviles\api"
npx prisma db push
```

Esto creará las tablas en tu base de datos Neon si no existen.

---

## 📋 Paso 4: Crear Usuario Admin

Ejecuta el script de verificación:

```powershell
node verificar-admin.js
```

Este script:
- ✅ Verificará la conexión a la base de datos
- ✅ Buscará usuarios admin existentes
- ✅ Si no encuentra ninguno, creará uno automáticamente con:
  - Email: `admin@rvautomoviles.com`
  - Contraseña: `Admin123!`

---

## 📋 Paso 5: Probar el Login

1. **Inicia el servidor backend** (si no está corriendo):
   ```powershell
   cd "c:\Users\poron\OneDrive\Desktop\Proyectos varios vs code\Administracion_RV_Automoviles\backend"
   npm run dev
   ```

2. **Inicia el frontend** (si no está corriendo):
   ```powershell
   cd "c:\Users\poron\OneDrive\Desktop\Proyectos varios vs code\Administracion_RV_Automoviles\frontend"
   npm run dev
   ```

3. **Abre el navegador** en `http://localhost:5173`

4. **Intenta iniciar sesión** con las credenciales del usuario admin creado

---

## 🔍 Solución de Problemas

### Error: "Environment variable not found: POSTGRES_PRISMA_URL"
- ✅ Verifica que el archivo `.env` esté en la carpeta `api`
- ✅ Verifica que las URLs estén entre comillas

### Error: "Error de conexión a la base de datos"
- ✅ Verifica que las URLs sean correctas
- ✅ Verifica que tu base de datos en Neon esté activa
- ✅ Verifica que tengas internet

### Error 500 en Login
- ✅ Verifica que las tablas existan (Paso 3)
- ✅ Verifica que exista un usuario admin (Paso 4)
- ✅ Revisa los logs del servidor backend

---

## 📌 Notas Importantes

- ⚠️ El archivo `.env` es **local** y NO se sube a Git
- ⚠️ Para producción (Vercel), las variables se configuran en el dashboard de Vercel
- ⚠️ Guarda las credenciales del admin en un lugar seguro
