# 🚀 Despliegue Rápido en Vercel - RV Automóviles

## ✅ Checklist de Pre-Deploy

Antes de empezar, asegúrate de tener:

- [ ] Cuenta en [Vercel](https://vercel.com) (gratis)
- [ ] Cuenta en [Neon](https://neon.tech) (gratis) 
- [ ] Repositorio en GitHub actualizado
- [ ] Base de datos PostgreSQL en Neon creada

---

## 📦 Paso 1: Preparar Base de Datos en Neon

### 1.1 Crear Proyecto en Neon

1. Ve a [https://console.neon.tech](https://console.neon.tech)
2. Click en **"Create a project"**
3. Configura:
   - **Name**: `rv-automoviles-db`
   - **Region**: Elige la más cercana a tu ubicación
   - **Postgres version**: 16
4. Click **"Create project"**

### 1.2 Copiar Connection String

1. En tu proyecto de Neon, ve a **Dashboard** o **Connection Details**
2. Copia el **Connection String** completo
3. Debe verse así:
   ```
   postgresql://neondb_owner:AbCdEf...@ep-cool-bird-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **¡GUÁRDALO!** Lo necesitarás en el paso 3

---

## 🔐 Paso 2: Generar JWT Secret

Genera un secreto seguro usando uno de estos métodos:

**Opción A - PowerShell (Windows):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Opción B - Online:**
Visita: https://generate-secret.vercel.app/32

**Opción C - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**¡GUARDA EL RESULTADO!** Lo necesitarás en el paso 3

---

## 🌐 Paso 3: Deploy en Vercel

### 3.1 Importar Proyecto

1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Selecciona el repositorio **Gestio_RV_Automoviles**
5. Click **"Import"**

### 3.2 Configurar Variables de Entorno

En la pantalla de configuración del proyecto, ve a **Environment Variables** y agrega:

#### Variable 1: DATABASE_URL
```
Name: DATABASE_URL
Value: [PEGA TU CONNECTION STRING DE NEON AQUÍ]
Environment: Production, Preview, Development
```

#### Variable 2: JWT_SECRET
```
Name: JWT_SECRET
Value: [PEGA EL SECRET QUE GENERASTE EN EL PASO 2]
Environment: Production, Preview, Development
```

#### Variable 3: NODE_ENV
```
Name: NODE_ENV
Value: production
Environment: Production
```

#### Variable 4: FRONTEND_URL
```
Name: FRONTEND_URL
Value: https://gestio-rv-automoviles.vercel.app
Environment: Production, Preview, Development
```
*(Nota: Después del primer deploy, actualiza esto con tu URL real de Vercel)*

#### Variable 5: VITE_API_URL
```
Name: VITE_API_URL
Value: https://gestio-rv-automoviles.vercel.app/api
Environment: Production, Preview, Development
```
*(Nota: Después del primer deploy, actualiza esto con tu URL real de Vercel)*

### 3.3 Configurar Build

Vercel detectará automáticamente la configuración del `vercel.json`, pero verifica que:

- **Framework Preset**: Other
- **Build Command**: (se usará el comando del vercel.json)
- **Output Directory**: frontend/dist
- **Install Command**: (se usará el comando del vercel.json)

### 3.4 Deploy

1. Click **"Deploy"**
2. Espera de 3-5 minutos mientras Vercel:
   - Instala dependencias del frontend y backend
   - Genera el cliente de Prisma
   - Construye el frontend con Vite
   - Configura las funciones serverless

### 3.5 Verificar Deployment

Una vez completado el deploy:

1. Vercel te mostrará tu URL, algo como:
   ```
   https://gestio-rv-automoviles-abc123.vercel.app
   ```

2. **ACTUALIZA las variables de entorno** con tu URL real:
   - Ve a **Settings** → **Environment Variables**
   - Edita `FRONTEND_URL` y pon: `https://tu-url-real.vercel.app`
   - Edita `VITE_API_URL` y pon: `https://tu-url-real.vercel.app/api`

3. Ve a **Deployments** y haz click en **"Redeploy"** para aplicar los cambios

---

## 🗄️ Paso 4: Inicializar Base de Datos

### 4.1 Ejecutar Migraciones (Opción A - Desde Local)

Si tienes el proyecto clonado localmente:

```bash
# Ve a la carpeta backend
cd backend

# Crea un archivo .env temporal
echo DATABASE_URL=tu_connection_string_de_neon > .env

# Ejecuta las migraciones
npx prisma db push

# Ejecuta el seed (datos iniciales)
npm run prisma:seed
```

### 4.2 Ejecutar SQL Directamente (Opción B - Desde Neon)

Si prefieres usar la consola de Neon:

1. Ve a tu proyecto en Neon
2. Click en **"SQL Editor"**
3. Copia el contenido de `backend/prisma/create_tables.sql`
4. Pégalo en el editor SQL
5. Click **"Run"**
6. Para crear el usuario admin, ejecuta:

```sql
-- Crear usuario administrador
-- Password: admin123 (¡Cámbiala después!)
INSERT INTO "Usuario" (email, password, rol, "createdAt", "updatedAt")
VALUES (
  'admin@rvautomoviles.com',
  '$2a$10$YourHashedPasswordHere', -- Hash de bcrypt para 'admin123'
  'admin',
  NOW(),
  NOW()
);
```

Para generar el hash de la contraseña, usa el archivo `backend/generate-hash.js`:

```bash
cd backend
node generate-hash.js admin123
```

---

## ✅ Paso 5: Verificar Funcionamiento

### 5.1 Verificar API

Abre en tu navegador:
```
https://tu-url-vercel.vercel.app/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "RV Automoviles API está funcionando correctamente",
  "timestamp": "2025-10-22T..."
}
```

### 5.2 Verificar Frontend

1. Abre tu URL de Vercel en el navegador
2. Deberías ver la página de login
3. Intenta iniciar sesión con:
   - Email: `admin@rvautomoviles.com`
   - Password: `admin123` (o la que configuraste)

### 5.3 Verificar Funcionalidades

Una vez logueado, verifica:
- [ ] Dashboard carga correctamente
- [ ] Puedes ver, crear, editar clientes
- [ ] Puedes ver, crear, editar autos
- [ ] Puedes registrar pagos
- [ ] Puedes ver reportes

---

## 🔧 Solución de Problemas

### Error: "Database connection failed"

**Causa:** Connection string incorrecto o base de datos no accesible

**Solución:**
1. Verifica que el `DATABASE_URL` en Vercel sea correcto
2. Asegúrate de que incluya `?sslmode=require` al final
3. Verifica que tu proyecto en Neon esté activo (plan gratuito tiene límites)

### Error: "Token validation failed" o 401

**Causa:** JWT_SECRET no está configurado o no coincide

**Solución:**
1. Verifica que `JWT_SECRET` esté configurado en Vercel
2. Re-genera el token de sesión (cierra sesión y vuelve a iniciar)

### Error 404 en rutas del frontend

**Causa:** Configuración de rutas en vercel.json

**Solución:**
Ya está corregido en el `vercel.json` actualizado. Si persiste:
1. Ve a Vercel → Tu Proyecto → Settings → General
2. Verifica que el Output Directory sea `frontend/dist`

### Frontend no se conecta al backend

**Causa:** `VITE_API_URL` no está configurado correctamente

**Solución:**
1. Ve a Vercel → Settings → Environment Variables
2. Verifica que `VITE_API_URL` sea: `https://tu-url-vercel.vercel.app/api`
3. Redeploy el proyecto

### Prisma Client no está generado

**Causa:** El build command no generó el cliente de Prisma

**Solución:**
1. Verifica que `backend/package.json` tenga el script:
   ```json
   "vercel-build": "npx prisma generate"
   ```
2. Redeploy el proyecto

---

## 🎯 Comandos Útiles para Mantenimiento

### Ver logs en tiempo real
```bash
vercel logs
```

### Ver logs de una función específica
```bash
vercel logs --follow
```

### Redeploy forzado
```bash
vercel --force
```

### Ver variables de entorno actuales
```bash
vercel env ls
```

---

## 📱 URLs Importantes

Guarda estas URLs después del deploy:

- **Frontend**: `https://tu-proyecto.vercel.app`
- **API**: `https://tu-proyecto.vercel.app/api`
- **Health Check**: `https://tu-proyecto.vercel.app/api/health`
- **Dashboard Vercel**: `https://vercel.com/tu-usuario/tu-proyecto`
- **Dashboard Neon**: `https://console.neon.tech/app/projects/tu-proyecto`

---

## 🔄 Actualizaciones Futuras

Cuando hagas cambios en el código:

1. Haz push a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push
   ```

2. Vercel detectará automáticamente los cambios y hará un nuevo deploy

3. Verifica el deployment en: `https://vercel.com/tu-usuario/tu-proyecto/deployments`

---

## 📧 Soporte

Si necesitas ayuda:

1. Revisa los logs en Vercel Dashboard
2. Verifica la consola del navegador (F12) para errores del frontend
3. Verifica que todas las variables de entorno estén correctas
4. Consulta la documentación oficial:
   - [Vercel Docs](https://vercel.com/docs)
   - [Neon Docs](https://neon.tech/docs)
   - [Prisma Docs](https://www.prisma.io/docs)

---

## ✨ ¡Listo!

Tu aplicación RV Automóviles está ahora en producción con:

✅ Frontend optimizado con Vite y React  
✅ Backend serverless con Express y Prisma  
✅ Base de datos PostgreSQL en Neon  
✅ Autenticación JWT segura  
✅ Deploy automático con cada push  
✅ SSL/HTTPS incluido  
✅ CDN global de Vercel  

**¡Disfruta tu aplicación en la nube! 🎉**
