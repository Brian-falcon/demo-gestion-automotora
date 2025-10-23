# ✅ CHECKLIST COMPLETO DE DEPLOY - RV AUTOMÓVILES

## 📋 Antes de Empezar

- [ ] Tengo cuenta en Vercel (https://vercel.com)
- [ ] Tengo cuenta en Neon (https://neon.tech)
- [ ] Mi código está en GitHub
- [ ] He leído `VERCEL_DEPLOY_GUIDE.md`

---

## 🗄️ BASE DE DATOS (Neon)

- [ ] Proyecto creado en Neon
- [ ] Connection String copiado y guardado
- [ ] Connection String tiene formato: `postgresql://...?sslmode=require`

---

## 🔐 SEGURIDAD

- [ ] JWT_SECRET generado (32 caracteres mínimo)
- [ ] JWT_SECRET guardado en lugar seguro
- [ ] Contraseña del admin preparada (no usar admin123 en producción)

---

## 📦 PREPARACIÓN LOCAL

- [ ] Todos los cambios commitados
- [ ] Último push a GitHub realizado
- [ ] Rama main actualizada

---

## 🌐 DEPLOY EN VERCEL

### Importar Proyecto
- [ ] Proyecto importado desde GitHub
- [ ] Repositorio correcto seleccionado

### Configurar Variables de Entorno (5 VARIABLES)

- [ ] **DATABASE_URL** configurada (connection string de Neon)
- [ ] **JWT_SECRET** configurada (secreto generado)
- [ ] **NODE_ENV** configurada (valor: `production`)
- [ ] **FRONTEND_URL** configurada (tu URL de Vercel)
- [ ] **VITE_API_URL** configurada (tu URL de Vercel + `/api`)

### Configuración de Build
- [ ] Framework Preset: Other
- [ ] Build Command: (automático desde vercel.json)
- [ ] Output Directory: `frontend/dist`

### Deploy Inicial
- [ ] Click en "Deploy"
- [ ] Esperar 3-5 minutos
- [ ] Deploy completado sin errores
- [ ] URL de producción obtenida

---

## 🔄 POST-DEPLOY (IMPORTANTE)

### Actualizar Variables con URL Real
- [ ] Copiar URL real de Vercel
- [ ] Actualizar `FRONTEND_URL` en Vercel
- [ ] Actualizar `VITE_API_URL` en Vercel
- [ ] Hacer Redeploy

---

## 🗄️ INICIALIZAR BASE DE DATOS

Elige UNA de estas opciones:

### Opción A: Desde Local (Recomendado)
- [ ] Crear archivo `.env` temporal en `/backend`
- [ ] Agregar `DATABASE_URL` con connection string de Neon
- [ ] Ejecutar: `cd backend`
- [ ] Ejecutar: `npx prisma db push`
- [ ] Ejecutar: `npm run prisma:seed`
- [ ] Verificar que se creó el usuario admin

### Opción B: SQL Directo en Neon
- [ ] Abrir SQL Editor en Neon
- [ ] Copiar contenido de `backend/prisma/create_tables.sql`
- [ ] Ejecutar SQL
- [ ] Generar hash de contraseña con `node backend/generate-hash.js`
- [ ] Insertar usuario admin manualmente

---

## ✅ VERIFICACIÓN FINAL

### Verificar API
- [ ] Abrir: `https://tu-url.vercel.app/api/health`
- [ ] Respuesta: `{"status":"OK", ...}`

### Verificar Frontend
- [ ] Abrir: `https://tu-url.vercel.app`
- [ ] Ver página de login
- [ ] Poder iniciar sesión con admin

### Verificar Funcionalidades
- [ ] Dashboard carga correctamente
- [ ] Ver lista de clientes
- [ ] Crear nuevo cliente
- [ ] Ver lista de autos
- [ ] Crear nuevo auto
- [ ] Registrar pago
- [ ] Ver reportes
- [ ] Exportar a PDF

---

## 🎯 CONFIGURACIÓN RECOMENDADA POST-DEPLOY

### Seguridad
- [ ] Cambiar contraseña del admin
- [ ] Crear cuentas de usuario adicionales si necesario
- [ ] Verificar que CORS esté configurado correctamente

### Rendimiento
- [ ] Probar velocidad de carga
- [ ] Verificar que no haya errores en consola
- [ ] Probar en diferentes navegadores

### Datos
- [ ] Crear algunos clientes de prueba
- [ ] Crear algunos autos de prueba
- [ ] Registrar algunos pagos de prueba
- [ ] Verificar reportes con datos reales

---

## 📱 INFORMACIÓN A GUARDAR

Guarda estos datos en un lugar seguro:

```
# URLs
Frontend: https://______.vercel.app
API: https://______.vercel.app/api
Dashboard Vercel: https://vercel.com/____/gestio-rv-automoviles
Dashboard Neon: https://console.neon.tech/app/projects/____

# Credenciales
Admin Email: admin@rvautomoviles.com
Admin Password: ________________

# Variables (mantener secretas)
DATABASE_URL: postgresql://________________
JWT_SECRET: ________________
```

---

## 🔧 SOLUCIÓN RÁPIDA DE PROBLEMAS

### ❌ Error en Build
- Verificar que todas las dependencias estén en package.json
- Ver logs completos en Vercel Dashboard
- Verificar que vercel.json esté correcto

### ❌ Error de Conexión a Base de Datos
- Verificar DATABASE_URL en variables de entorno
- Confirmar que incluye `?sslmode=require`
- Verificar que proyecto en Neon esté activo

### ❌ Frontend no carga
- Verificar que build de Vite fue exitoso
- Verificar Output Directory en Vercel
- Verificar rutas en vercel.json

### ❌ API retorna 500
- Ver logs en Vercel: `vercel logs`
- Verificar variables de entorno
- Verificar que Prisma Client esté generado

### ❌ Login no funciona
- Verificar JWT_SECRET en Vercel
- Verificar que usuario admin existe en BD
- Verificar CORS (FRONTEND_URL debe estar correcto)

---

## 📊 MÉTRICAS DE ÉXITO

Tu deploy está completo cuando:

✅ URL principal carga sin errores  
✅ /api/health retorna status OK  
✅ Puedes hacer login con admin  
✅ Puedes crear, editar, eliminar clientes  
✅ Puedes crear, editar, eliminar autos  
✅ Puedes registrar y ver pagos  
✅ Puedes generar reportes y exportar PDF  
✅ Sin errores en consola del navegador  
✅ Sin errores en logs de Vercel  

---

## 🎉 ¡DEPLOY COMPLETADO!

Si marcaste todas las casillas:

🎊 ¡Felicitaciones! Tu aplicación está en producción  
🌍 Accesible 24/7 desde cualquier lugar  
🚀 Con deploy automático en cada push  
🔒 Segura con HTTPS y autenticación JWT  
📊 Lista para gestionar tu negocio  

---

## 📞 PRÓXIMOS PASOS

1. Compartir URL con usuarios
2. Capacitar en el uso del sistema
3. Comenzar a cargar datos reales
4. Monitorear uso y rendimiento
5. Planificar mejoras y nuevas funcionalidades

---

**Fecha de deploy:** _____________  
**URL de producción:** _____________  
**Desplegado por:** _____________  

---

*Para soporte técnico o preguntas, consulta VERCEL_DEPLOY_GUIDE.md o los docs oficiales de Vercel y Neon.*
