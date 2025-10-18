# 🔐 Variables de Entorno Definitivas - RV Automóviles

## 📝 IMPORTANTE: Completa estos valores

Antes de configurar las variables, necesitas:

1. ✅ **URL de Vercel**: La obtendrás después del primer deploy
   - Formato: `https://gestio-rv-automoviles-[codigo-unico].vercel.app`
   - **NO incluyas `/` al final**

2. ✅ **Connection String de Neon**: Lo obtendrás al crear el proyecto en Neon
   - Formato: `postgresql://usuario:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require`
   - **DEBE incluir `?sslmode=require` al final**

3. ✅ **JWT Secret**: Genera uno seguro con:
   ```bash
   openssl rand -base64 32
   ```
   O usa: https://generate-secret.vercel.app/32

---

## 🔑 Variables para Vercel (5 variables)

### Variable 1: DATABASE_URL
```
Nombre: DATABASE_URL
Valor: [TU_CONNECTION_STRING_DE_NEON]
Environment: Production, Preview, Development
```

**Ejemplo de valor:**
```
postgresql://neondb_owner:AbCdEf123456@ep-cool-bird-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

### Variable 2: JWT_SECRET
```
Nombre: JWT_SECRET
Valor: [GENERA_UNO_SEGURO_32_CARACTERES]
Environment: Production, Preview, Development
```

**Cómo generar (elige uno):**

Opción A - Terminal (Windows PowerShell):
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Opción B - Terminal (Git Bash):
```bash
openssl rand -base64 32
```

Opción C - Online:
- Ve a: https://generate-secret.vercel.app/32
- Copia el valor generado

**Ejemplo de valor:**
```
kJ8mN2pQ5rT9vX3yZ6bC4dF7gH0jK3mN5pR8sU1wY4zA
```

---

### Variable 3: NODE_ENV
```
Nombre: NODE_ENV
Valor: production
Environment: Production, Preview
```

**Valor EXACTO:**
```
production
```

---

### Variable 4: FRONTEND_URL
```
Nombre: FRONTEND_URL
Valor: [TU_URL_DE_VERCEL]
Environment: Production, Preview, Development
```

**⚠️ IMPORTANTE:**
- **SIN** barra diagonal `/` al final
- **DEBE** incluir `https://`
- **Usar** tu URL real de Vercel

**Ejemplo de valor:**
```
https://gestio-rv-automoviles-abc123.vercel.app
```

**❌ INCORRECTO:**
```
https://gestio-rv-automoviles-abc123.vercel.app/
http://gestio-rv-automoviles-abc123.vercel.app
gestio-rv-automoviles-abc123.vercel.app
```

---

### Variable 5: VITE_API_URL
```
Nombre: VITE_API_URL
Valor: [TU_URL_DE_VERCEL]/api
Environment: Production, Preview, Development
```

**⚠️ IMPORTANTE:**
- **SÍ** incluye `/api` al final
- **Debe** ser la misma URL que FRONTEND_URL + `/api`

**Ejemplo de valor:**
```
https://gestio-rv-automoviles-abc123.vercel.app/api
```

**❌ INCORRECTO:**
```
https://gestio-rv-automoviles-abc123.vercel.app/api/
https://gestio-rv-automoviles-abc123.vercel.app
```

---

## 📋 Resumen Visual

Copia esto y completa los valores:

```env
# ==============================================
# VARIABLES DE ENTORNO - VERCEL PRODUCTION
# ==============================================

# Base de Datos (de Neon.tech)
DATABASE_URL="postgresql://[usuario]:[password]@[host].neon.tech/neondb?sslmode=require"

# Seguridad (genera uno nuevo con openssl rand -base64 32)
JWT_SECRET="[TU_SECRET_GENERADO_32_CARACTERES]"

# Entorno
NODE_ENV="production"

# URLs (reemplaza con tu URL real de Vercel)
FRONTEND_URL="https://[tu-proyecto].vercel.app"
VITE_API_URL="https://[tu-proyecto].vercel.app/api"
```

---

## ✅ Checklist de Validación

Antes de guardar, verifica:

### DATABASE_URL:
- [ ] Comienza con `postgresql://`
- [ ] Incluye usuario y password
- [ ] Incluye host `.neon.tech`
- [ ] Termina con `/neondb?sslmode=require`
- [ ] No tiene espacios

### JWT_SECRET:
- [ ] Tiene al menos 32 caracteres
- [ ] Es aleatorio (no uses "admin123" ni similar)
- [ ] No contiene espacios
- [ ] No tiene comillas dentro del valor

### NODE_ENV:
- [ ] Es exactamente: `production`
- [ ] Todo en minúsculas
- [ ] Sin espacios

### FRONTEND_URL:
- [ ] Comienza con `https://`
- [ ] Es tu URL real de Vercel
- [ ] NO termina con `/`
- [ ] No tiene espacios

### VITE_API_URL:
- [ ] Comienza con `https://`
- [ ] Es la misma URL que FRONTEND_URL
- [ ] Termina con `/api` (sin `/` extra al final)
- [ ] No tiene espacios

---

## 🔄 Flujo de Configuración

### PASO 1: Deploy inicial en Vercel
Configura estas 3 variables temporalmente:
```
JWT_SECRET = (genera uno seguro YA)
NODE_ENV = production
FRONTEND_URL = https://temp.vercel.app (cambiarás después)
```

### PASO 2: Obtener URL de Vercel
Después del deploy, copia tu URL real

### PASO 3: Crear DB en Neon
Obtén el connection string

### PASO 4: Actualizar todas las variables
```
DATABASE_URL = (de Neon)
JWT_SECRET = (el que generaste en paso 1)
NODE_ENV = production
FRONTEND_URL = (tu URL real)
VITE_API_URL = (tu URL real + /api)
```

### PASO 5: Redeploy
Para que tome los cambios

---

## 🎯 Valores de Ejemplo Completos

**⚠️ NO COPIES ESTOS - Son solo de ejemplo**

```env
# EJEMPLO - Reemplaza con tus valores reales
DATABASE_URL="postgresql://neondb_owner:npg_AbCd123XyZ@ep-cool-bird-12345678.us-east-2.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="kJ8mN2pQ5rT9vX3yZ6bC4dF7gH0jK3mN5pR8sU1wY4zA7bD9eF2gH5jK8mN"
NODE_ENV="production"
FRONTEND_URL="https://gestio-rv-automoviles-a1b2c3d4.vercel.app"
VITE_API_URL="https://gestio-rv-automoviles-a1b2c3d4.vercel.app/api"
```

---

## 🆘 Errores Comunes

### "Invalid connection string"
❌ Falta `?sslmode=require` al final de DATABASE_URL
✅ Agregar `?sslmode=require` al final

### "JWT malformed"
❌ JWT_SECRET tiene espacios o caracteres especiales problemáticos
✅ Generar uno nuevo con `openssl rand -base64 32`

### "CORS error"
❌ FRONTEND_URL tiene `/` al final
✅ Remover la `/` final

### "API endpoint not found"
❌ VITE_API_URL no termina en `/api`
✅ Agregar `/api` al final

---

## 📞 Siguiente Paso

Una vez que tengas:
1. ✅ JWT_SECRET generado
2. ✅ URL de Vercel (después del deploy)
3. ✅ Connection string de Neon

Vuelve aquí y completa los valores. Luego configúralos en Vercel → Settings → Environment Variables.

---

**¿Ya tienes tu URL de Vercel? Si sí, dímela y te genero los valores completos listos para copiar y pegar.**
