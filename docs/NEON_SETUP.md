# 🚀 Guía de Migración a Neon Database

Esta guía te ayudará a migrar tu aplicación RV Automóviles de SQLite local a PostgreSQL en Neon.

---

## 📋 ¿Qué es Neon?

Neon es una plataforma de base de datos PostgreSQL serverless en la nube:
- ✅ **Gratis**: Hasta 3GB de almacenamiento
- ✅ **Rápido**: Configuración en 5 minutos
- ✅ **Seguro**: Conexiones SSL/TLS automáticas
- ✅ **Escalable**: Crece con tu aplicación

---

## 🎯 Paso 1: Crear Cuenta en Neon

1. Ve a **https://neon.tech**
2. Haz clic en **"Sign Up"**
3. Regístrate con:
   - GitHub (recomendado - más rápido)
   - Google
   - Email

---

## 🗄️ Paso 2: Crear tu Proyecto

1. Una vez dentro, haz clic en **"Create Project"**
2. Configura tu proyecto:
   - **Project Name**: `RV_Automoviles` (o el nombre que prefieras)
   - **Region**: Selecciona el más cercano a tu ubicación
     - 🇺🇸 US East (Ohio) - Para América
     - 🇪🇺 EU (Frankfurt) - Para Europa
   - **PostgreSQL Version**: Deja la última versión (16 o superior)
3. Haz clic en **"Create Project"**

---

## 🔑 Paso 3: Obtener tu Connection String

Después de crear el proyecto, verás una pantalla con tu **Connection String**:

```
postgresql://username:password@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### ⚠️ IMPORTANTE:
- **Copia esta cadena completa** - la necesitarás en el siguiente paso
- Esta cadena contiene tu usuario y contraseña
- **NO la compartas públicamente**

---

## ⚙️ Paso 4: Configurar tu Aplicación

### 4.1 Abrir el archivo `.env`

1. Ve a la carpeta `backend` de tu proyecto
2. Abre el archivo `.env`
3. Busca la línea que dice `DATABASE_URL`

### 4.2 Reemplazar la Connection String

**Antes:**
```env
DATABASE_URL="postgresql://TU_USUARIO:TU_PASSWORD@TU_HOST.neon.tech/neondb?sslmode=require"
```

**Después (pega tu connection string de Neon):**
```env
DATABASE_URL="postgresql://tu_usuario_real:tu_password_real@ep-xxxxx-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 4.3 Guardar el archivo

Guarda el archivo `.env` con **Ctrl + S**

---

## 🔧 Paso 5: Migrar la Base de Datos

Abre **PowerShell** en la carpeta raíz de tu proyecto y ejecuta:

```powershell
# Navegar al backend
cd backend

# 1. Generar el cliente de Prisma para PostgreSQL
npx prisma generate

# 2. Crear las tablas en Neon
npx prisma db push

# 3. Poblar con datos iniciales (admin, clientes de ejemplo)
npx prisma db seed

# Volver a la raíz
cd ..
```

### ✅ Deberías ver:

```
✔ Generated Prisma Client
✔ Your database is now in sync with your schema
✔ Seeding complete
```

---

## 🎨 Paso 6: Verificar la Migración

### Opción 1: Prisma Studio (Interfaz Visual)

```powershell
cd backend
npx prisma studio
```

Esto abrirá una interfaz web en `http://localhost:5555` donde podrás ver:
- ✅ Tabla `Usuario` con el admin
- ✅ Tabla `Cliente` con clientes de ejemplo
- ✅ Tabla `Auto` con autos
- ✅ Tabla `Pago` con pagos

### Opción 2: Dashboard de Neon

1. Ve a https://console.neon.tech
2. Selecciona tu proyecto `RV_Automoviles`
3. Haz clic en **"Tables"** en el menú lateral
4. Verás todas tus tablas creadas

---

## 🚀 Paso 7: Iniciar la Aplicación

```powershell
# Iniciar backend
cd backend
node server.js

# En otra terminal, iniciar frontend
cd frontend
npm run dev
```

### ✅ Login de Prueba:

**Admin:**
- Email: `admin@rvautomoviles.com`
- Password: `admin123`

**Cliente:**
- Cédula: `1234567890` (o cualquiera del seed)

---

## 🔍 Verificación Final

### ✅ Checklist:

- [ ] Neon project creado
- [ ] Connection string copiada y pegada en `.env`
- [ ] `npx prisma generate` ejecutado sin errores
- [ ] `npx prisma db push` ejecutado sin errores
- [ ] `npx prisma db seed` ejecutado sin errores
- [ ] Prisma Studio muestra las tablas con datos
- [ ] Backend inicia sin errores de conexión
- [ ] Frontend se conecta correctamente
- [ ] Puedo hacer login con las credenciales de prueba

---

## 🎉 ¡Listo!

Tu aplicación ahora está usando PostgreSQL en Neon. Los beneficios incluyen:

- 🌐 **Acceso desde cualquier lugar**: No solo desde tu PC
- 🔄 **Backups automáticos**: Neon hace copias de seguridad
- 📊 **Mejor rendimiento**: PostgreSQL es más robusto que SQLite
- 🚀 **Listo para producción**: Cuando quieras desplegar, ya tienes la DB en la nube

---

## 🆘 Solución de Problemas

### Error: "Can't reach database server"

**Causa**: Connection string incorrecta o falta de conexión a internet

**Solución**:
1. Verifica que copiaste la connection string completa
2. Asegúrate de que incluye `?sslmode=require` al final
3. Verifica tu conexión a internet

### Error: "Invalid DATABASE_URL"

**Causa**: Formato incorrecto del connection string

**Solución**:
Verifica que el formato sea exactamente:
```
postgresql://usuario:password@host.neon.tech/database?sslmode=require
```

### Error: "Password authentication failed"

**Causa**: Password incorrecta en el connection string

**Solución**:
1. Ve a Neon Dashboard
2. Haz clic en "Connection Details"
3. Copia nuevamente el connection string
4. Asegúrate de no tener espacios extras

### Las tablas están vacías después del seed

**Solución**:
```powershell
cd backend
npx prisma db seed
```

---

## 📞 Soporte

- **Documentación Neon**: https://neon.tech/docs
- **Documentación Prisma**: https://www.prisma.io/docs
- **Dashboard Neon**: https://console.neon.tech

---

## 🔒 Seguridad

### ⚠️ NUNCA compartas:
- Tu connection string completa
- Tus credenciales de Neon
- El archivo `.env` (ya está en `.gitignore`)

### ✅ Buenas prácticas:
- Cambia el `JWT_SECRET` en `.env` por algo único
- No subas el archivo `.env` a GitHub
- Usa variables de entorno diferentes para desarrollo y producción

---

## 📝 Notas Adicionales

### Diferencias entre SQLite y PostgreSQL:

- ✅ **Autoincrement**: Funciona igual
- ✅ **Relaciones**: Prisma las maneja automáticamente
- ✅ **Fechas**: PostgreSQL tiene mejor soporte para fechas
- ✅ **Tipos de datos**: PostgreSQL es más estricto (mejor para producción)

### Plan Gratuito de Neon:

- **Almacenamiento**: 3 GB
- **Compute**: 100 horas/mes
- **Proyectos**: 10 proyectos
- **Branches**: Ilimitados

Suficiente para desarrollo y aplicaciones pequeñas a medianas.

---

¡Felicidades! 🎊 Tu aplicación ahora usa una base de datos profesional en la nube.
