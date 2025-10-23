# 📋 INFORMACIÓN POST-DEPLOY - RV AUTOMÓVILES

## 🌐 URLs de Producción

```
Frontend:        https://______________________________________.vercel.app
API:             https://______________________________________.vercel.app/api
Health Check:    https://______________________________________.vercel.app/api/health
```

## 🔐 Credenciales de Administrador

```
Email:           admin@rvautomoviles.com
Password:        ______________________________
```

**⚠️ IMPORTANTE: Cambia la contraseña del admin después del primer login**

## 🔑 Variables de Entorno (Mantener Secretas)

### DATABASE_URL
```
postgresql://_________________________________________________
```

### JWT_SECRET
```
________________________________________________________________
```

## 📊 Dashboards

### Vercel Dashboard
```
https://vercel.com/__________/gestio-rv-automoviles
```

### Neon Database Dashboard
```
https://console.neon.tech/app/projects/__________
```

## 📱 Información del Deploy

```
Fecha de deploy:        _____________
Versión desplegada:     _____________
Branch desplegado:      main
Desplegado por:         _____________
```

## ✅ Funcionalidades Verificadas

- [ ] API Health Check funciona
- [ ] Login de admin funciona
- [ ] Dashboard carga correctamente
- [ ] Gestión de clientes funciona
- [ ] Gestión de autos funciona
- [ ] Registro de pagos funciona
- [ ] Reportes funcionan
- [ ] Exportación a PDF funciona
- [ ] Sin errores en consola
- [ ] Sin errores en logs de Vercel

## 🔧 Comandos Útiles

### Ver logs en tiempo real
```bash
vercel logs --follow
```

### Ver lista de deployments
```bash
vercel ls
```

### Ver variables de entorno
```bash
vercel env ls
```

### Forzar redeploy
```bash
vercel --force
```

## 📞 Contactos Importantes

```
Desarrollador:          _____________
Email de soporte:       _____________
Teléfono:              _____________
```

## 🔄 Procedimiento de Actualización

1. Hacer cambios en el código local
2. Probar localmente
3. Commit: `git commit -m "descripción"`
4. Push: `git push origin main`
5. Vercel detecta y despliega automáticamente
6. Verificar en URL de producción

## ⚠️ Notas Importantes

- ✅ Backup de base de datos: Manual desde Neon (exportar datos periódicamente)
- ✅ Límites del plan gratuito de Vercel: 100GB bandwidth/mes
- ✅ Límites del plan gratuito de Neon: 3GB storage, 512MB RAM
- ✅ SSL/HTTPS incluido automáticamente por Vercel
- ✅ Deploy automático en cada push a main

## 🎯 Tareas Post-Deploy

- [ ] Cambiar contraseña del admin
- [ ] Crear usuarios adicionales si es necesario
- [ ] Cargar datos iniciales (clientes, autos)
- [ ] Configurar dominio personalizado (opcional)
- [ ] Agregar URL a favoritos
- [ ] Capacitar usuarios en el sistema
- [ ] Configurar backup regular de datos

## 📈 Métricas a Monitorear

- Visitar periódicamente el dashboard de Vercel para ver:
  - Número de peticiones
  - Tiempo de respuesta
  - Errores (si hay)
  - Uso de bandwidth

---

**Fecha de creación de este documento:** _____________

**Última actualización:** _____________

---

*Guarda este archivo en un lugar seguro. Contiene información sensible de tu aplicación en producción.*
