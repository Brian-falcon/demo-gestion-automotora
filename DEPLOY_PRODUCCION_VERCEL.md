# 🚀 Guía de Deploy a Vercel - RV Automóviles

## ✅ Pre-requisitos
- ✅ Base de datos Neon configurada
- ✅ Código funcionando en local
- ✅ Cuenta de Vercel

---

## 📋 PASO 1: Configurar Variables de Entorno en Vercel

### 1.1 Acceder a Vercel Dashboard
1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto: **rv-gestion-automotora** (o similar)
3. Ve a **Settings** → **Environment Variables**

### 1.2 Agregar las 6 Variables Obligatorias

#### Variable 1: NODE_ENV
```
Name: NODE_ENV
Value: production
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: JWT_SECRET
```
Name: JWT_SECRET
Value: tu_secreto_super_seguro_cambiar_en_produccion
Environments: ✅ Production ✅ Preview ✅ Development
```
**⚠️ IMPORTANTE:** Genera un secreto más seguro con:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Variable 3: POSTGRES_PRISMA_URL
```
Name: POSTGRES_PRISMA_URL
Value: postgresql://neondb_owner:npg_dTz7KykatCR4@ep-fancy-breeze-adnc6v56-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 4: POSTGRES_URL_NON_POOLING
```
Name: POSTGRES_URL_NON_POOLING
Value: postgresql://neondb_owner:npg_dTz7KykatCR4@ep-fancy-breeze-adnc6v56-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
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
Value: https://TU-PROYECTO.vercel.app
Environments: ✅ Production
```
**⚠️ NOTA:** Actualiza este valor después del primer deploy con tu URL real de Vercel.

---

## 📋 PASO 2: Verificar Configuración del Proyecto

### 2.1 Verificar vercel.json
Asegúrate que existe `vercel.json` en la raíz con:
```json
{
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm run install:vercel",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2.2 Verificar package.json (raíz)
```json
{
  "scripts": {
    "install:vercel": "cd api && npm install && cd ../frontend && npm install",
    "build:vercel": "cd frontend && npm run vercel-build"
  }
}
```

### 2.3 Verificar frontend/package.json
```json
{
  "scripts": {
    "vercel-build": "npm install && vite build"
  }
}
```

---

## 📋 PASO 3: Hacer el Deploy

### Opción A: Deploy desde Git (Recomendado)

1. **Asegúrate de que tu código esté en GitHub:**
   ```bash
   git add .
   git commit -m "Configuración para deploy en Vercel con Neon"
   git push origin main
   ```

2. **En Vercel Dashboard:**
   - Ve a: https://vercel.com/new
   - Selecciona tu repositorio: `Mateo14RDGZ/RV-Gestion-Automotora`
   - Framework Preset: **Other**
   - Root Directory: `./` (raíz)
   - Build Command: `npm run build:vercel` (debería autodetectarse)
   - Output Directory: `frontend/dist` (debería autodetectarse)
   - Install Command: `npm run install:vercel` (debería autodetectarse)
   - Click **Deploy**

3. **Espera a que termine el deploy** (2-5 minutos)

### Opción B: Deploy desde CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# Login en Vercel
vercel login

# Deploy a producción
vercel --prod
```

---

## 📋 PASO 4: Actualizar FRONTEND_URL

1. **Después del primer deploy exitoso**, copia la URL que te da Vercel
   - Ejemplo: `https://rv-gestion-automotora-abc123.vercel.app`

2. **Actualiza la variable FRONTEND_URL en Vercel:**
   - Ve a Settings → Environment Variables
   - Edita `FRONTEND_URL`
   - Pega tu URL real
   - Guarda los cambios

3. **Haz un redeploy** para aplicar los cambios:
   - Ve a Deployments
   - Click en el último deployment
   - Click en el menú (⋮) → **Redeploy**

---

## 📋 PASO 5: Verificar que Todo Funcione

### 5.1 Probar el endpoint de salud
Abre en tu navegador:
```
https://TU-URL.vercel.app/api/health
```

**Deberías ver:**
```json
{
  "status": "OK",
  "message": "RV Automoviles API funcionando correctamente",
  "database": "connected"
}
```

### 5.2 Probar el endpoint de diagnóstico
```
https://TU-URL.vercel.app/api/diagnostic
```

**Deberías ver todas las variables con ✅:**
```json
{
  "message": "Diagnóstico de variables de entorno",
  "variables": {
    "NODE_ENV": "✅ Configurado",
    "JWT_SECRET": "✅ Configurado",
    "POSTGRES_PRISMA_URL": "✅ Configurado",
    "POSTGRES_URL_NON_POOLING": "✅ Configurado",
    "FRONTEND_URL": "✅ Configurado",
    "VITE_API_URL": "✅ Configurado"
  }
}
```

### 5.3 Probar el login
1. Abre tu aplicación: `https://TU-URL.vercel.app`
2. Intenta iniciar sesión con:
   - **Email:** `admin@rvautomoviles.com`
   - **Contraseña:** `Admin123!`
3. Si el login funciona, ¡todo está correcto! 🎉

---

## 🔧 Solución de Problemas

### Error: "Environment variable not found"
- ✅ Verifica que todas las variables estén configuradas en Vercel
- ✅ Haz un redeploy después de agregar variables

### Error 500 en Login
- ✅ Verifica el endpoint `/api/diagnostic`
- ✅ Verifica el endpoint `/api/health`
- ✅ Revisa los logs en Vercel: Deployments → Click en deployment → **View Function Logs**

### Error de CORS
- ✅ Verifica que `FRONTEND_URL` esté configurado correctamente
- ✅ Asegúrate de haber hecho redeploy después de configurar `FRONTEND_URL`

### Las rutas no funcionan (404 en refresh)
- ✅ Verifica que `vercel.json` tenga los rewrites correctos
- ✅ Verifica que el `outputDirectory` sea `frontend/dist`

### Base de datos desconectada
- ✅ Verifica que tu base de datos en Neon esté activa
- ✅ Verifica que las URLs de conexión sean correctas
- ✅ Verifica que las tablas existan (usa Prisma Studio local)

---

## 📌 Comandos Útiles

### Ver logs en tiempo real
```bash
vercel logs https://TU-URL.vercel.app --follow
```

### Hacer redeploy
```bash
vercel --prod
```

### Ver variables de entorno configuradas
```bash
vercel env ls
```

---

## ✅ Checklist Final

- [ ] Variables de entorno configuradas en Vercel (6 variables)
- [ ] `vercel.json` configurado correctamente
- [ ] Scripts de build configurados en `package.json`
- [ ] Código subido a GitHub
- [ ] Deploy exitoso en Vercel
- [ ] `/api/health` responde OK
- [ ] `/api/diagnostic` muestra todas las variables ✅
- [ ] `FRONTEND_URL` actualizado con URL real
- [ ] Redeploy después de actualizar `FRONTEND_URL`
- [ ] Login funciona correctamente
- [ ] Dashboard carga sin errores

---

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en producción. Si tienes algún problema, revisa los logs en Vercel o contáctame.

**URL de tu aplicación:** https://TU-URL.vercel.app
**Panel de Vercel:** https://vercel.com/dashboard
**Base de datos Neon:** https://console.neon.tech
