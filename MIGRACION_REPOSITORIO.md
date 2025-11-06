# 🔄 Actualización de Base de Datos - Nuevo Repositorio

## ✅ Repositorio Migrado Exitosamente

El proyecto se ha movido correctamente a:
**https://github.com/Mateo14RDGZ/RV_Gestion_Automotora.git**

---

## 📊 Actualizar Base de Datos en Neon

Si ya tenías una base de datos en Neon y quieres usarla con el nuevo deployment:

### Opción A: Usar la Misma Base de Datos (Recomendado)

**No necesitas hacer nada adicional**. Solo configura las mismas variables de entorno en Vercel:

1. Ve a tu proyecto de Neon
2. Copia las URLs de conexión:
   - `POSTGRES_PRISMA_URL` (con pgbouncer=true)
   - `POSTGRES_URL_NON_POOLING` (sin pgbouncer)
3. Úsalas en el nuevo deployment de Vercel

✅ Tus datos existentes se mantendrán
✅ No perderás información
✅ Los usuarios pueden seguir usando sus cuentas

---

### Opción B: Crear Nueva Base de Datos

Si prefieres empezar desde cero:

#### 1. Crear Nuevo Proyecto en Neon

1. Ve a [https://neon.tech](https://neon.tech)
2. Click en **"Create a project"**
3. Configura:
   - **Project name**: `rv-automoviles-production` (o el nombre que prefieras)
   - **Region**: Selecciona la más cercana a tus usuarios
   - **Postgres version**: 16 (la más reciente)
4. Click **"Create project"**

#### 2. Obtener URLs de Conexión

1. En el dashboard de Neon, ve a **"Connection Details"**
2. Copia estas 2 URLs:
   - **Pooled connection** → `POSTGRES_PRISMA_URL`
   - **Direct connection** → `POSTGRES_URL_NON_POOLING`

Ejemplo:
```
POSTGRES_PRISMA_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

#### 3. Actualizar Variables en Vercel

1. Ve a Vercel → Tu nuevo proyecto
2. **Settings** → **Environment Variables**
3. Actualiza o agrega:
   - `POSTGRES_PRISMA_URL` = (nueva URL con pgbouncer)
   - `POSTGRES_URL_NON_POOLING` = (nueva URL sin pgbouncer)
4. **Guarda** los cambios
5. **Redeploy** el proyecto

#### 4. Inicializar Nueva Base de Datos

En tu computadora local:

```bash
# Navega a la carpeta del proyecto
cd "C:\Users\poron\OneDrive\Desktop\Proyectos varios vs code\Administracion_RV_Automoviles"

# Ve a la carpeta api
cd api

# Crea archivo .env con las nuevas URLs
@"
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
"@ | Out-File -FilePath ".env" -Encoding utf8

# Instala dependencias (si no lo has hecho)
npm install

# Ejecuta migraciones
npx prisma db push
```

Deberías ver:
```
✅ Database is now in sync with your schema
```

#### 5. Crear Usuario Administrador

**Opción 1: Usando Prisma Studio**

```bash
npx prisma studio
```

Esto abre una interfaz web. Luego:

1. Click en **"Usuario"**
2. Click en **"Add record"**
3. Completa:
   - `email`: `admin@rvautomoviles.com`
   - `password`: (hash generado - ver abajo)
   - `rol`: `admin`
4. **Save**

**Para generar el hash de contraseña:**

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('TuContraseña123!', 10).then(h=>console.log(h))"
```

Copia el resultado y pégalo en el campo `password`.

**Opción 2: Usando script**

Crea `api/seed.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  
  const admin = await prisma.usuario.create({
    data: {
      email: 'admin@rvautomoviles.com',
      password: hashedPassword,
      rol: 'admin'
    }
  });
  
  console.log('✅ Usuario admin creado:', admin.email);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
```

Ejecuta:
```bash
node seed.js
```

---

### Opción C: Migrar Datos de BD Antigua a Nueva

Si quieres mover los datos existentes a una nueva base de datos:

#### 1. Exportar datos de la BD antigua

```bash
# Conectar a la BD antigua y exportar
npx prisma db pull --schema=old-schema.prisma
npx prisma db seed --schema=old-schema.prisma
```

O usando pg_dump:

```bash
# Obtener la URL de tu BD antigua
$OLD_DB_URL = "postgresql://..."

# Exportar a archivo SQL
pg_dump $OLD_DB_URL > backup.sql
```

#### 2. Importar a la nueva BD

```bash
# URL de la nueva BD
$NEW_DB_URL = "postgresql://..."

# Importar el backup
psql $NEW_DB_URL < backup.sql
```

---

## 🚀 Configuración Completa en Vercel

### Variables de Entorno Requeridas

Asegúrate de tener TODAS estas variables configuradas:

```env
NODE_ENV=production
POSTGRES_PRISMA_URL=postgresql://... (de Neon)
POSTGRES_URL_NON_POOLING=postgresql://... (de Neon)
JWT_SECRET=tu_clave_secreta_64_caracteres
FRONTEND_URL=https://tu-proyecto.vercel.app
VITE_API_URL=/api
```

### Pasos en Vercel

1. **Importar nuevo repositorio**:
   - Ve a Vercel → **Add New Project**
   - Selecciona `RV_Gestion_Automotora`

2. **Configurar proyecto**:
   - Framework Preset: **Other**
   - Build/Output/Install Commands: (dejar vacíos)

3. **Agregar variables de entorno**:
   - Agrega las 6 variables listadas arriba
   - Marca: Production ✓, Preview ✓, Development ✓

4. **Deploy**:
   - Click **"Deploy"**
   - Espera 2-4 minutos

5. **Actualizar FRONTEND_URL**:
   - Copia la URL de Vercel (ej: `https://rv-gestion-automotora.vercel.app`)
   - Actualiza la variable `FRONTEND_URL` en Vercel
   - **Redeploy**

---

## ✅ Verificación

Después de completar la configuración:

### 1. Verificar Frontend
Ve a: `https://tu-proyecto.vercel.app`
- ✅ Debe cargar la página de login

### 2. Verificar API
Ve a: `https://tu-proyecto.vercel.app/api/health`
- ✅ Debe mostrar JSON con status "OK"

### 3. Probar Login
- Ingresa con el usuario admin creado
- ✅ Debe entrar al dashboard

### 4. Probar Funcionalidades
- ✅ Crear cliente
- ✅ Crear auto
- ✅ Generar cuotas
- ✅ Registrar pago

---

## 📝 Resumen

✅ **Repositorio migrado a**: https://github.com/Mateo14RDGZ/RV_Gestion_Automotora.git
✅ **Referencias actualizadas** en README.md y guías
✅ **Listo para deployment en Vercel**

### Próximos Pasos:

1. Si vas a usar la **misma BD**: Solo configura las mismas variables en Vercel
2. Si vas a crear **nueva BD**: Sigue "Opción B" arriba
3. **Deploy en Vercel** con el nuevo repositorio
4. **Verifica** que todo funcione

---

## 🆘 Problemas Comunes

### "Database connection failed"
- Verifica que las URLs de Neon sean correctas
- Asegúrate de que `POSTGRES_PRISMA_URL` tenga `?pgbouncer=true`
- Verifica que la BD esté activa en Neon

### "No tables found"
- Ejecuta `npx prisma db push` localmente
- Verifica que las migraciones se aplicaron

### "Usuario no encontrado"
- Crea el usuario admin usando Prisma Studio o el script
- Verifica que el email y contraseña sean correctos

---

**¡Tu proyecto está listo en el nuevo repositorio! 🎉**

Sigue la guía completa de deployment: `VERCEL_DEPLOY_GUIDE.md`
