# 🚀 CONFIGURACIÓN DE PRODUCCIÓN EN VERCEL

## Variables de Entorno Requeridas en Vercel

Para que tu aplicación funcione correctamente en producción, necesitas configurar estas variables de entorno en Vercel:

### 📋 Paso a Paso

1. **Ve a tu proyecto en Vercel**
   - https://vercel.com/dashboard
   - Selecciona tu proyecto `GestionAutomotoraEjemplo`

2. **Configura las Variables de Entorno**
   - Ve a **Settings** → **Environment Variables**
   - Agrega las siguientes variables:

#### Variables REQUERIDAS:

```
DATABASE_URL
Valor: postgresql://[tu_usuario]:[tu_password]@[tu_host].neon.tech/neondb?sslmode=require
Environments: Production, Preview, Development
```

```
JWT_SECRET
Valor: [genera uno seguro con: openssl rand -base64 32]
Environments: Production, Preview, Development
```

```
NODE_ENV
Valor: production
Environments: Production
```

```
FRONTEND_URL
Valor: https://tu-dominio.vercel.app
Environments: Production, Preview, Development
```

### 🔑 Cómo obtener tu DATABASE_URL de Neon:

1. Ve a https://console.neon.tech
2. Selecciona tu proyecto
3. En el dashboard, busca **Connection String**
4. **IMPORTANTE**: Usa la conexión **Pooled** (con pgbouncer)
5. Copia la cadena completa que incluye:
   - Usuario
   - Password
   - Host
   - Database name

### ⚡ Ejemplo de DATABASE_URL correcta:

```
postgresql://mateo14:AbC123XyZ@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 🔄 Después de Configurar las Variables:

1. Ve a **Deployments** en Vercel
2. Haz clic en los 3 puntos (...) del último deployment
3. Selecciona **Redeploy**
4. Marca la opción **Use existing Build Cache**
5. Haz clic en **Redeploy**

### ✅ Verificación

Después del redeploy:

1. Abre tu aplicación en producción
2. Inicia sesión
3. Crea un nuevo auto o cliente
4. Recarga la página
5. **Si los datos persisten, ¡todo está funcionando correctamente!**

### 🆘 Problemas Comunes

#### Error: "DATABASE_URL no está configurada"
- Verifica que agregaste DATABASE_URL en las variables de entorno de Vercel
- Asegúrate de que está configurada para Production

#### Los datos desaparecen al recargar
- La DATABASE_URL no está correctamente configurada
- Verifica que sea la conexión de Neon (no una URL de ejemplo)
- Asegúrate de hacer redeploy después de agregar las variables

#### Error: "Cannot connect to database"
- Verifica que la URL de Neon sea correcta
- Usa la conexión **Pooled** (con pgbouncer)
- Verifica que tu proyecto en Neon esté activo

### 📝 Nota sobre Neon

Si Neon configuró automáticamente las variables:
- Verifica en Vercel → Settings → Integrations
- Debe aparecer "Neon" conectado
- Las variables DATABASE_URL deberían estar ya configuradas
- Si no aparecen, configúralas manualmente siguiendo los pasos arriba

### 🔍 Cómo verificar si DATABASE_URL está configurada en Vercel:

1. Ve a Settings → Environment Variables
2. Busca DATABASE_URL
3. Debería mostrar: `postgresql://****:****@****.neon.tech/****`
4. Si aparece, está configurada ✅
5. Si no aparece, agrégala manualmente

