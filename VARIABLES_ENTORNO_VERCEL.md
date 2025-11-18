# 🔐 Variables de Entorno para Vercel - RV Automóviles

## 📋 Lista Completa de Variables de Entorno

Esta guía lista todas las variables de entorno que debes configurar en Vercel para que tu aplicación funcione correctamente.

---

## ✅ Variables OBLIGATORIAS (6 variables)

### 1. `NODE_ENV`
- **Valor**: `production`
- **Descripción**: Indica que la aplicación está en modo producción
- **Dónde se usa**: Backend (configuración de Prisma, logs, manejo de errores)
- **Ambientes**: ✅ Production, ✅ Preview, ✅ Development

### 2. `JWT_SECRET`
- **Valor**: Clave secreta generada (64+ caracteres)
- **Descripción**: Clave secreta para firmar y verificar tokens JWT de autenticación
- **Dónde se usa**: 
  - `backend/routes/auth.routes.js` - Generación de tokens
  - `api/lib/auth.js` - Verificación de tokens
  - `backend/middleware/auth.middleware.js` - Verificación de tokens
- **Cómo generarla**:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- **Ejemplo**: `a3f8b9c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2`
- **Ambientes**: ✅ Production, ✅ Preview, ✅ Development
- **⚠️ CRÍTICO**: Sin esta variable, el login fallará con error 500

### 3. `POSTGRES_PRISMA_URL`
- **Valor**: URL de conexión de Neon con pooling (pgbouncer)
- **Descripción**: URL de conexión a PostgreSQL para Prisma con connection pooling
- **Dónde se usa**: 
  - `api/prisma/schema.prisma` - Conexión principal a la base de datos
  - `backend/prisma/schema.prisma` - Conexión principal a la base de datos
- **Formato**: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require&pgbouncer=true`
- **Cómo obtenerla**:
  1. Ve a tu proyecto en Neon: https://console.neon.tech
  2. Ve a "Connection Details"
  3. Copia la "Pooled connection" (debe incluir `pgbouncer=true`)
- **Ambientes**: ✅ Production, ✅ Preview, ✅ Development
- **⚠️ CRÍTICO**: Sin esta variable, la aplicación no podrá conectarse a la base de datos

### 4. `POSTGRES_URL_NON_POOLING`
- **Valor**: URL de conexión de Neon sin pooling (directa)
- **Descripción**: URL de conexión directa a PostgreSQL para migraciones y operaciones que requieren conexión directa
- **Dónde se usa**: 
  - `api/prisma/schema.prisma` - Para migraciones y operaciones directas
  - `backend/prisma/schema.prisma` - Para migraciones y operaciones directas
- **Formato**: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`
- **Cómo obtenerla**:
  1. Ve a tu proyecto en Neon: https://console.neon.tech
  2. Ve a "Connection Details"
  3. Copia la "Direct connection" (NO debe incluir `pgbouncer`)
- **Ambientes**: ✅ Production, ✅ Preview, ✅ Development
- **⚠️ CRÍTICO**: Necesaria para migraciones de Prisma

### 5. `VITE_API_URL`
- **Valor**: `/api`
- **Descripción**: URL base para las peticiones API desde el frontend
- **Dónde se usa**: 
  - `frontend/src/services/api.js` - Configuración de Axios
  - `frontend/src/pages/Login.jsx` - Login de cliente
- **Nota**: En producción, usa ruta relativa `/api` para que funcione con el mismo dominio
- **Ambientes**: ✅ Production, ✅ Preview, ✅ Development

### 6. `FRONTEND_URL`
- **Valor**: `https://rv-gestion-automotora20.vercel.app` (tu URL de Vercel)
- **Descripción**: URL del frontend para configuración de CORS
- **Dónde se usa**: 
  - `api/index.js` - Configuración de CORS
  - `backend/server.js` - Configuración de CORS
- **Cómo obtenerla**: 
  1. Después del primer deploy en Vercel, copia la URL que te da
  2. Ejemplo: `https://rv-gestion-automotora20.vercel.app`
- **Ambientes**: ✅ Production (puedes agregarla también a Preview y Development si quieres)
- **⚠️ IMPORTANTE**: Actualiza esta variable después del primer deploy con tu URL real

---

## 📝 Resumen Rápido para Configurar en Vercel

### Paso 1: Ve a Vercel Dashboard
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto: `rv-gestion-automotora20`
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agrega cada variable

#### Variable 1: NODE_ENV
```
Name: NODE_ENV
Value: production
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: JWT_SECRET
```
Name: JWT_SECRET
Value: [Genera con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"]
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: POSTGRES_PRISMA_URL
```
Name: POSTGRES_PRISMA_URL
Value: postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require&pgbouncer=true
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 4: POSTGRES_URL_NON_POOLING
```
Name: POSTGRES_URL_NON_POOLING
Value: postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 5: VITE_API_URL
```
Name: VITE_API_URL
Value: /api
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 6: FRONTEND_URL
```
Name: FRONTEND_URL
Value: https://rv-gestion-automotora20.vercel.app
Environments: ✅ Production (y opcionalmente Preview/Development)
```

---

## 🔍 Verificación de Variables

### Cómo verificar que todas están configuradas:

1. **En Vercel Dashboard**:
   - Settings → Environment Variables
   - Debes ver las 6 variables listadas arriba

2. **Verificar en los logs**:
   - Si falta `JWT_SECRET`: Verás error 500 en `/api/auth/login`
   - Si falta `POSTGRES_PRISMA_URL`: Verás errores de conexión a base de datos
   - Si falta `VITE_API_URL`: El frontend no podrá hacer peticiones a la API

---

## 🚨 Variables Opcionales (No necesarias para funcionar)

### `PORT`
- **Valor**: `5000` (por defecto)
- **Descripción**: Puerto donde corre el servidor (solo para desarrollo local)
- **Nota**: En Vercel, no es necesario configurarla (Vercel asigna el puerto automáticamente)

---

## 📊 Tabla de Referencias

| Variable | Usado en | Crítico | Valor Ejemplo |
|----------|----------|---------|---------------|
| `NODE_ENV` | Backend, Prisma | ✅ | `production` |
| `JWT_SECRET` | Auth routes, Middleware | ✅ | `a3f8b9c2...` (64+ chars) |
| `POSTGRES_PRISMA_URL` | Prisma schema | ✅ | `postgresql://...?pgbouncer=true` |
| `POSTGRES_URL_NON_POOLING` | Prisma schema | ✅ | `postgresql://...` (sin pgbouncer) |
| `VITE_API_URL` | Frontend API calls | ✅ | `/api` |
| `FRONTEND_URL` | CORS config | ✅ | `https://tu-app.vercel.app` |

---

## 🔄 Orden de Configuración Recomendado

### Opción A: Configurar todo antes del primer deploy
1. Configura las primeras 5 variables (sin `FRONTEND_URL`)
2. Haz el primer deploy
3. Copia la URL de Vercel
4. Agrega `FRONTEND_URL` con la URL real
5. Haz redeploy

### Opción B: Configurar todo después del primer deploy
1. Haz el primer deploy (fallará, pero obtendrás la URL)
2. Configura todas las 6 variables
3. Haz redeploy

---

## ✅ Checklist de Configuración

Antes de considerar que todo está configurado, verifica:

- [ ] `NODE_ENV` = `production` (en los 3 ambientes)
- [ ] `JWT_SECRET` = [clave generada] (en los 3 ambientes)
- [ ] `POSTGRES_PRISMA_URL` = [URL de Neon con pgbouncer] (en los 3 ambientes)
- [ ] `POSTGRES_URL_NON_POOLING` = [URL de Neon sin pgbouncer] (en los 3 ambientes)
- [ ] `VITE_API_URL` = `/api` (en los 3 ambientes)
- [ ] `FRONTEND_URL` = [tu URL de Vercel] (al menos en Production)

---

## 🆘 Solución de Problemas

### Error: "JWT_SECRET no está configurado"
**Solución**: Agrega la variable `JWT_SECRET` en Vercel y haz redeploy

### Error: "Database connection failed"
**Solución**: 
1. Verifica que `POSTGRES_PRISMA_URL` y `POSTGRES_URL_NON_POOLING` estén configuradas
2. Verifica que las URLs sean correctas (cópialas nuevamente de Neon)
3. Haz redeploy

### Error: "Failed to load resource: 404" en /api
**Solución**: Verifica que `VITE_API_URL` esté configurada como `/api`

### Error de CORS
**Solución**: Verifica que `FRONTEND_URL` tenga la URL correcta de tu aplicación en Vercel

---

## 📝 Notas Importantes

1. **Seguridad**: Nunca compartas tus variables de entorno, especialmente `JWT_SECRET` y las URLs de la base de datos
2. **Actualización**: Si cambias alguna variable, debes hacer redeploy para que los cambios surtan efecto
3. **Ambientes**: Puedes tener valores diferentes para Production, Preview y Development si lo necesitas
4. **Sensibilidad**: Todas estas variables son sensibles, Vercel las oculta en los logs por seguridad

---

**Última actualización**: 2025-01-XX

