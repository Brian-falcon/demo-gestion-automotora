# Guía de Instalación - AutoManager

## Instalación Paso a Paso en Windows

### 1. Verificar Node.js

Abre PowerShell y verifica:

```powershell
node --version
npm --version
```

Si no tienes Node.js instalado, descárgalo desde: https://nodejs.org/

### 2. Navegar al Proyecto

```powershell
cd "C:\Users\poron\OneDrive\Desktop\Administracion_RV_Automoviles"
```

### 3. Instalar Dependencias

```powershell
# Opción 1: Todo en uno (Recomendado)
npm run install-all

# Opción 2: Manual
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### 4. Configurar Base de Datos

```powershell
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
cd ..
```

### 5. Ejecutar la Aplicación

```powershell
# Ejecutar todo simultáneamente
npm run dev
```

O en terminales separadas:

**Terminal 1:**
```powershell
cd backend
npm run dev
```

**Terminal 2:**
```powershell
cd frontend
npm run dev
```

### 6. Acceder a la Aplicación

Abre tu navegador en: `http://localhost:3000`

**Credenciales:**
- Email: `admin@automanager.com`
- Password: `admin123`

## Comandos Útiles

```powershell
# Ver la base de datos
cd backend
npx prisma studio

# Reinstalar base de datos desde cero
cd backend
Remove-Item ../database/automanager.db
npx prisma db push
npx prisma db seed

# Limpiar y reinstalar dependencias
cd backend
Remove-Item -Recurse -Force node_modules
npm install

cd ../frontend
Remove-Item -Recurse -Force node_modules
npm install
```

## Solución de Problemas Comunes

### Puerto en uso

Si el puerto 3000 o 5000 está en uso:

```powershell
# Ver qué está usando el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Matar el proceso (reemplaza PID con el número que aparece)
taskkill /PID [número_PID] /F
```

### Error de Prisma

```powershell
cd backend
Remove-Item -Recurse -Force node_modules\.prisma
npx prisma generate
```

### Base de datos corrupta

```powershell
cd database
Remove-Item automanager.db
cd ../backend
npx prisma db push
npx prisma db seed
```
