# ⚡ INICIO RÁPIDO - DEPLOY EN VERCEL

## 🚀 Solo 6 Pasos para Desplegar

### 1️⃣ Sube tu código a GitHub
```powershell
git add .
git commit -m "Listo para deploy en Vercel"
git push origin main
```

### 2️⃣ Crea Base de Datos en Neon
- Ir a: https://console.neon.tech
- Crear proyecto: "rv-automoviles-db"
- Copiar Connection String

### 3️⃣ Genera un JWT Secret
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 4️⃣ Importa en Vercel
- Ir a: https://vercel.com/new
- Importar repositorio: Gestio_RV_Automoviles

### 5️⃣ Configura Variables (5)
```
DATABASE_URL = [Connection String de Neon]
JWT_SECRET = [Secret generado en paso 3]
NODE_ENV = production
FRONTEND_URL = https://tu-app.vercel.app
VITE_API_URL = https://tu-app.vercel.app/api
```

### 6️⃣ Deploy y Actualizar
1. Click "Deploy" → Esperar 3-5 min
2. Copiar URL real
3. Actualizar FRONTEND_URL y VITE_API_URL
4. Redeploy

---

## 🗄️ Inicializar Base de Datos (DESPUÉS del deploy)

```bash
cd backend
echo "DATABASE_URL=tu_connection_string_de_neon" > .env
npx prisma db push
npm run prisma:seed
```

---

## ✅ Verificar

1. API: https://tu-app.vercel.app/api/health
2. App: https://tu-app.vercel.app
3. Login: admin@rvautomoviles.com / admin123

---

## 📖 Más Info

- Guía completa: `VERCEL_DEPLOY_GUIDE.md`
- Checklist: `DEPLOY_CHECKLIST.md`
- Resumen: `DEPLOY_READY.md`

---

**¡Listo en menos de 10 minutos! 🎉**
