# 🚀 Deploy Paso a Paso - Vercel Primero, DB Después

## ✅ PASO 1: Deploy Inicial en Vercel (10 minutos)

### 1.1 Ir a Vercel

1. Ve a: **https://vercel.com**
2. Click en **"Log in"** o **"Sign Up"** si no tienes cuenta
3. Conecta con tu cuenta de GitHub

### 1.2 Importar Proyecto

1. Click en **"Add New Project"** o **"Import Project"**
2. Busca y selecciona: **`Gestio_RV_Automoviles`**
3. Click en **"Import"**

### 1.3 Configuración del Proyecto

**Framework Preset:**
- Selecciona: **"Other"**

**Root Directory:**
- Deja **en blanco** (es un monorepo)

**Build Command:**
```bash
cd frontend && npm install && npm run build
```

**Output Directory:**
```bash
frontend/dist
```

**Install Command:**
```bash
cd backend && npm install && npm run build && cd ../frontend && npm install
```

### 1.4 Variables de Entorno (Temporales)

Por ahora, agrega solo estas 3 variables básicas:

| Variable | Valor |
|----------|-------|
| `JWT_SECRET` | `temporal_secret_123456789_cambiar_luego` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://tu-dominio-temporal.vercel.app` |

**⚠️ Nota:** Por ahora deja `FRONTEND_URL` con valor temporal. Lo actualizaremos después.

### 1.5 Iniciar Deploy

1. Click en **"Deploy"**
2. Espera 2-5 minutos mientras Vercel:
   - ✅ Clona tu repositorio
   - ✅ Instala dependencias
   - ✅ Build del frontend
   - ✅ Genera funciones serverless

### 1.6 Copiar URL de Producción

Una vez completado el deploy:

1. Verás mensaje: **"Congratulations! Your project has been deployed"**
2. Copia tu URL de producción (ejemplo):
   ```
   https://gestio-rv-automoviles-abc123.vercel.app
   ```
3. **GUÁRDALA** - la necesitarás en el siguiente paso

---

## 🗄️ PASO 2: Crear Base de Datos en Neon (5 minutos)

### 2.1 Crear Cuenta en Neon

1. Ve a: **https://neon.tech**
2. Click en **"Sign Up"**
3. Puedes usar tu cuenta de GitHub para login rápido

### 2.2 Crear Proyecto

1. Click en **"Create a project"**
2. Configura:
   - **Project name**: `rv-automoviles-db`
   - **Region**: **US East (Ohio)** (recomendado para latencia baja)
   - **Postgres version**: **16** (más reciente)
   - **Compute size**: **Shared** (gratis)

3. Click en **"Create project"**

### 2.3 Copiar Connection String

1. Verás una pantalla con **"Connection String"**
2. Asegúrate de que esté seleccionado: **"Prisma"**
3. Copia el connection string completo (debe verse así):

```
postgresql://usuario:password@ep-cool-name-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
```

4. **¡MUY IMPORTANTE!** Guarda este string en un lugar seguro

### 2.4 Probar Conexión (Opcional)

En Neon Console:
1. Click en **"SQL Editor"** en el menú lateral
2. Ejecuta una query simple:
   ```sql
   SELECT version();
   ```
3. Si funciona, la DB está lista ✅

---

## 🔧 PASO 3: Conectar Vercel con Neon (5 minutos)

### 3.1 Agregar Variables de Entorno

1. Ve a tu proyecto en Vercel
2. Click en **"Settings"** (en el menú superior)
3. Click en **"Environment Variables"** (menú lateral)

### 3.2 Agregar DATABASE_URL

1. Click en **"Add New"**
2. Llena:
   - **Key**: `DATABASE_URL`
   - **Value**: (pega tu connection string de Neon)
   - **Environment**: Selecciona **Production**, **Preview**, y **Development**
3. Click en **"Save"**

### 3.3 Actualizar FRONTEND_URL y agregar VITE_API_URL

1. **Editar FRONTEND_URL**:
   - Busca la variable `FRONTEND_URL` existente
   - Click en los 3 puntos → **"Edit"**
   - Actualiza con tu URL real: `https://gestio-rv-automoviles-abc123.vercel.app`
   - **Sin `/` al final**
   - Save

2. **Agregar VITE_API_URL**:
   - Click en **"Add New"**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://gestio-rv-automoviles-abc123.vercel.app/api`
   - **Environment**: Production, Preview, Development
   - Save

### 3.4 Verificar Variables

Deberías tener estas 5 variables configuradas:

| Variable | Ejemplo de Valor |
|----------|------------------|
| `DATABASE_URL` | `postgresql://usuario:password@ep-xxx.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | `temporal_secret_123456789_cambiar_luego` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://gestio-rv-automoviles-abc123.vercel.app` |
| `VITE_API_URL` | `https://gestio-rv-automoviles-abc123.vercel.app/api` |

---

## 🔄 PASO 4: Redeploy para Aplicar Cambios (2 minutos)

### 4.1 Hacer Redeploy

1. Ve a **"Deployments"** (menú superior)
2. Busca el deployment más reciente (arriba de todo)
3. Click en los **3 puntos** (⋯) a la derecha
4. Click en **"Redeploy"**
5. Confirma: **"Redeploy"**

### 4.2 Esperar Deployment

- Espera 2-3 minutos
- Vercel ejecutará automáticamente:
  - `npx prisma generate` (genera cliente Prisma)
  - `npx prisma db push` (crea tablas en Neon)

### 4.3 Ver Logs

Para verificar que todo está bien:
1. Click en el deployment activo
2. Scroll hasta **"Building"** y revisa los logs
3. Busca:
   ```
   ✅ Prisma schema loaded
   ✅ Prisma Client generated
   ✅ Database synchronized
   ```

---

## ✅ PASO 5: Verificación (5 minutos)

### 5.1 Verificar Frontend

1. Abre: `https://tu-dominio.vercel.app`
2. Deberías ver:
   - ✅ Página de login de RV Automóviles
   - ✅ Botón de modo oscuro funciona
   - ✅ Sin errores en consola

### 5.2 Verificar API

1. Abre: `https://tu-dominio.vercel.app/api/health`
2. Deberías ver JSON:
   ```json
   {
     "status": "OK",
     "message": "RV Automoviles API está funcionando correctamente",
     "timestamp": "2025-10-18T..."
   }
   ```

### 5.3 Verificar Base de Datos

En Neon Console:
1. Ve a **"Tables"** en el menú lateral
2. Deberías ver las tablas creadas:
   - ✅ Usuario
   - ✅ Cliente
   - ✅ Auto
   - ✅ Pago

---

## 👤 PASO 6: Crear Usuario Administrador (5 minutos)

### Opción A: Usando Thunder Client / Postman (Recomendado)

1. Abre Thunder Client o Postman
2. Crea nueva request:
   - **Method**: POST
   - **URL**: `https://tu-dominio.vercel.app/api/auth/register`
   - **Headers**: `Content-Type: application/json`
   - **Body** (raw JSON):
     ```json
     {
       "email": "admin@rv.com",
       "password": "admin123",
       "nombre": "Administrador Principal"
     }
     ```
3. Click en **"Send"**
4. Deberías recibir respuesta exitosa con el usuario creado

### Opción B: Usando cURL (Terminal)

```bash
curl -X POST https://tu-dominio.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@rv.com",
    "password": "admin123",
    "nombre": "Administrador Principal"
  }'
```

### Opción C: Desde Neon SQL Editor (Manual)

1. Ve a Neon Console → SQL Editor
2. Ejecuta (necesitas generar hash de password con bcrypt antes):
   ```sql
   INSERT INTO "Usuario" (email, password, rol, "createdAt", "updatedAt")
   VALUES (
     'admin@rv.com',
     '$2a$10$...',  -- Reemplaza con hash bcrypt de "admin123"
     'admin',
     NOW(),
     NOW()
   );
   ```

---

## 🎉 PASO 7: Probar Login (2 minutos)

### 7.1 Login como Admin

1. Ve a: `https://tu-dominio.vercel.app`
2. Click en **"Soy Administrador"**
3. Ingresa:
   - **Email**: `admin@rv.com`
   - **Contraseña**: `admin123`
4. Click en **"Iniciar Sesión"**

### 7.2 Verificar Dashboard

Si todo funciona:
- ✅ Deberías ver el Dashboard
- ✅ Navegación funcionando
- ✅ Estadísticas en 0 (es una DB nueva)

---

## 🔐 PASO 8: Cambiar JWT_SECRET (Importante)

### 8.1 Generar Secret Seguro

En tu terminal local:
```bash
openssl rand -base64 32
```

O usa un generador online: https://generate-secret.vercel.app

### 8.2 Actualizar en Vercel

1. Ve a Settings → Environment Variables
2. Edita `JWT_SECRET`
3. Pega el nuevo secret generado
4. Save
5. **NO necesitas redeploy** para esto

---

## 📊 PASO 9: Monitoreo (Continuo)

### 9.1 Ver Logs en Tiempo Real

1. Ve a tu proyecto en Vercel
2. Click en **"Logs"** (menú superior)
3. Selecciona **"Functions"** para ver logs del backend
4. Selecciona **"Edge"** para logs del frontend

### 9.2 Ver Uso de Base de Datos

1. Ve a Neon Console
2. Click en **"Monitoring"**
3. Verás:
   - Storage usado
   - Conexiones activas
   - Queries ejecutadas

---

## 🎯 Resumen de URLs Importantes

| Servicio | URL |
|----------|-----|
| **Aplicación** | `https://tu-dominio.vercel.app` |
| **API Health** | `https://tu-dominio.vercel.app/api/health` |
| **Vercel Dashboard** | `https://vercel.com/tu-usuario/gestio-rv-automoviles` |
| **Neon Console** | `https://console.neon.tech` |

---

## ✅ Checklist Final

- [ ] Deploy inicial en Vercel completado
- [ ] URL de producción copiada
- [ ] Base de datos creada en Neon
- [ ] Connection string copiado
- [ ] Variables de entorno configuradas (5 variables)
- [ ] Redeploy con DB conectada exitoso
- [ ] Frontend carga correctamente
- [ ] API responde en /api/health
- [ ] Tablas creadas en Neon
- [ ] Usuario admin creado
- [ ] Login funciona correctamente
- [ ] JWT_SECRET actualizado a valor seguro

---

## 🆘 Problemas Comunes

### Error: "Cannot connect to database"
→ Verifica que `DATABASE_URL` incluya `?sslmode=require` al final

### Error: "Prisma Client not generated"
→ Redeploy el proyecto para que ejecute `prisma generate`

### Error: CORS blocked
→ Verifica que `FRONTEND_URL` no tenga `/` al final

### Login no funciona
→ Verifica que el usuario admin se haya creado correctamente en Neon SQL Editor

---

**¡Listo! Sigue estos pasos en orden y tu aplicación estará en producción! 🚀**
