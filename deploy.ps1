# 🚀 SCRIPT DE DEPLOY AUTOMÁTICO - RV AUTOMÓVILES
# Este script te ayuda a preparar y hacer deploy a Vercel

Write-Host "🚀 Iniciando proceso de deploy para RV Automóviles..." -ForegroundColor Cyan
Write-Host ""

# 1. Verificar que estamos en el directorio correcto
if (-not (Test-Path "vercel.json")) {
    Write-Host "❌ Error: No se encuentra vercel.json. Asegúrate de estar en el directorio raíz del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Directorio correcto detectado" -ForegroundColor Green
Write-Host ""

# 2. Verificar Git
Write-Host "📦 Verificando estado de Git..." -ForegroundColor Cyan
$gitStatus = git status --porcelain

if ($gitStatus) {
    Write-Host "📝 Cambios detectados. Preparando commit..." -ForegroundColor Yellow
    
    git add .
    
    $commitMessage = Read-Host "Ingresa el mensaje del commit (o presiona Enter para usar mensaje automático)"
    
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Deploy: Actualización $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    git commit -m $commitMessage
    
    Write-Host "✅ Commit realizado: $commitMessage" -ForegroundColor Green
}
else {
    Write-Host "✅ No hay cambios pendientes en Git" -ForegroundColor Green
}

Write-Host ""

# 3. Push a GitHub
Write-Host "🔄 Enviando cambios a GitHub..." -ForegroundColor Cyan

try {
    git push origin main
    Write-Host "✅ Cambios enviados a GitHub exitosamente" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ Error al hacer push. Intenta manualmente: git push origin main" -ForegroundColor Yellow
}

Write-Host ""

# 4. Información de Vercel
Write-Host "🌐 SIGUIENTE PASO: Configurar en Vercel" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "1. Ve a: https://vercel.com/new" -ForegroundColor White
Write-Host "2. Importa el repositorio: Gestio_RV_Automoviles" -ForegroundColor White
Write-Host "3. Configura las 5 variables de entorno (ver VERCEL_DEPLOY_GUIDE.md)" -ForegroundColor White
Write-Host "4. Click en 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "📖 Para instrucciones detalladas, abre: VERCEL_DEPLOY_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

# 5. Verificar variables de entorno
Write-Host "🔐 RECORDATORIO: Variables de entorno necesarias en Vercel" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "1. DATABASE_URL          (Connection string de Neon)" -ForegroundColor White
Write-Host "2. JWT_SECRET            (Genera con: openssl rand -base64 32)" -ForegroundColor White
Write-Host "3. NODE_ENV             (Valor: production)" -ForegroundColor White
Write-Host "4. FRONTEND_URL         (Tu URL de Vercel)" -ForegroundColor White
Write-Host "5. VITE_API_URL         (Tu URL de Vercel + /api)" -ForegroundColor White
Write-Host ""

# 6. Abrir documentación
$openDocs = Read-Host "¿Deseas abrir la guía de deploy? (S/N)"

if ($openDocs -eq "S" -or $openDocs -eq "s") {
    if (Test-Path "VERCEL_DEPLOY_GUIDE.md") {
        Start-Process "VERCEL_DEPLOY_GUIDE.md"
        Write-Host "✅ Abriendo guía de deploy..." -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "✨ ¡Listo! Tus cambios están en GitHub." -ForegroundColor Green
Write-Host "🚀 Ahora sigue los pasos en Vercel para completar el deploy." -ForegroundColor Green
Write-Host ""
