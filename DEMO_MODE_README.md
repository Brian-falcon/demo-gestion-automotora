# 🎭 Modo Demo - Sin Base de Datos Externa

Esta versión está configurada para funcionar **completamente sin base de datos externa**, usando datos simulados en memoria. Perfecta para demos, presentaciones y pruebas.

## ✨ Características del Modo Demo

- ✅ **Sin configuración de base de datos** - No necesitas PostgreSQL, MySQL ni ninguna BD
- ✅ **Datos de ejemplo incluidos** - 4 clientes, 6 autos, 12 pagos pre-cargados
- ✅ **Login funcional** - Usuario admin listo para usar
- ✅ **Todas las funciones disponibles** - CRUD completo, reportes, dashboards
- ✅ **Deploy simple en Vercel** - Solo clic y listo

## 🚀 Deploy Rápido en Vercel

### Paso 1: Importar Repositorio
1. Ve a [vercel.com](https://vercel.com) y logueate con GitHub
2. Click en **"Add New Project"**
3. Selecciona el repositorio `GestionAutomotoraEjemplo`

### Paso 2: Configurar Variables de Entorno
En la sección de **Environment Variables**, agrega:

```
USE_MOCK_DB=true
NODE_ENV=production
JWT_SECRET=tu_secret_key_segura_cambiar_esto
```

### Paso 3: Deploy
- Click en **"Deploy"**
- Espera 2-3 minutos
- ¡Listo! Tu demo estará funcionando

## 🔐 Credenciales de Acceso

### Usuario Administrador:
- **Email:** `admin@demo.com`
- **Contraseña:** `admin123`

### Usuario Alternativo:
- **Email:** `demo@demo.com`
- **Contraseña:** `admin123`

## 📊 Datos Incluidos

### Clientes:
- Juan Pérez (Cédula: 12345678)
- María González (Cédula: 87654321)
- Carlos Rodríguez (Cédula: 11223344)
- Ana Martínez (Cédula: 55667788)

### Vehículos:
- Toyota Corolla 2020
- Honda Civic 2021 (vendido a Juan Pérez)
- Chevrolet Onix 2022 (vendido a María González)
- Volkswagen Golf 2019 (reservado por Carlos)
- Ford Focus 2021 (vendido a Ana Martínez)
- Nissan Sentra 2020

### Estadísticas:
- ✅ 3 pagos realizados
- ⏳ 3 pagos pendientes
- ⚠️ 1 pago vencido
- 💰 Total recaudado: $3,000+

## 🛠️ Desarrollo Local

### 1. Clonar e Instalar:
```bash
git clone https://github.com/Mateo14RDGZ/GestionAutomotoraEjemplo.git
cd GestionAutomotoraEjemplo
```

### 2. Configurar Backend:
```bash
cd api
npm install
```

Crea archivo `.env`:
```env
USE_MOCK_DB=true
JWT_SECRET=demo_secret_key_2024
NODE_ENV=development
```

### 3. Configurar Frontend:
```bash
cd ../frontend
npm install
```

Crea archivo `.env`:
```env
VITE_API_URL=/api
```

### 4. Ejecutar:

**Terminal 1 - Backend:**
```bash
cd api
npm start
# Se ejecuta en http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Se ejecuta en http://localhost:5173
```

### 5. Acceder:
- Frontend: http://localhost:5173
- API: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

## 📝 Limitaciones del Modo Demo

⚠️ **Los datos se reinician** cada vez que se reinicia el servidor (no persisten)
⚠️ **Emails deshabilitados** por defecto (puedes configurarlos opcionalmente)
⚠️ **No apto para producción real** - Solo para demos y presentaciones

## 🔄 Migrar a Producción Real

Si quieres usar este sistema con base de datos real:

### 1. Crear Base de Datos en Neon:
1. Ve a [neon.tech](https://neon.tech)
2. Crea un proyecto PostgreSQL gratuito
3. Copia las URLs de conexión

### 2. Actualizar Variables de Entorno:
```env
USE_MOCK_DB=false
POSTGRES_PRISMA_URL=tu_url_con_pgbouncer
DATABASE_URL_UNPOOLED=tu_url_sin_pgbouncer
JWT_SECRET=tu_secret_seguro
```

### 3. Inicializar Base de Datos:
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 4. Re-deployar en Vercel:
- Actualiza las variables de entorno
- Vercel re-desplegará automáticamente

## 📞 Soporte

- 📖 [Documentación Completa](./VERCEL_DEPLOY_GUIDE.md)
- 📋 [Cambios Versión Demo](./CAMBIOS_VERSION_DEMO.md)
- 🐛 Reportar Issues en GitHub

---

**Versión Demo - Gestión Automotora**  
Sin base de datos externa | Deploy en 5 minutos | Datos de ejemplo incluidos
