# 🔍 VERIFICADOR PRE-DEPLOY - RV AUTOMÓVILES
# Ejecuta este script antes de hacer deploy para verificar que todo esté correcto

Write-Host "🔍 Verificando configuración para deploy en Vercel..." -ForegroundColor Cyan
Write-Host ""

$errores = 0
$advertencias = 0

Write-Host "📦 VERIFICANDO ARCHIVOS DE CONFIGURACIÓN..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Verificar archivos principales
$archivos = @(
    @{Ruta = "vercel.json"; Nombre = "vercel.json" },
    @{Ruta = "package.json"; Nombre = "package.json (raíz)" },
    @{Ruta = "backend\package.json"; Nombre = "backend/package.json" },
    @{Ruta = "frontend\package.json"; Nombre = "frontend/package.json" },
    @{Ruta = ".vercelignore"; Nombre = ".vercelignore" },
    @{Ruta = ".gitignore"; Nombre = ".gitignore" },
    @{Ruta = ".env.example"; Nombre = ".env.example" }
)

foreach ($archivo in $archivos) {
    if (Test-Path $archivo.Ruta) {
        Write-Host "✅ $($archivo.Nombre) encontrado" -ForegroundColor Green
    }
    else {
        Write-Host "❌ $($archivo.Nombre) NO encontrado" -ForegroundColor Red
        $errores++
    }
}

Write-Host ""
Write-Host "📖 VERIFICANDO DOCUMENTACIÓN..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

$docs = @(
    "VERCEL_DEPLOY_GUIDE.md",
    "QUICK_DEPLOY.md",
    "DEPLOY_CHECKLIST.md",
    "DEPLOY_READY.md",
    "POST_DEPLOY_INFO.md",
    "CAMBIOS_REALIZADOS.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "✅ $doc encontrado" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️ $doc NO encontrado" -ForegroundColor Yellow
        $advertencias++
    }
}

Write-Host ""
Write-Host "🔍 VERIFICANDO GIT..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

if (Test-Path ".git") {
    Write-Host "✅ Repositorio Git encontrado" -ForegroundColor Green
    
    $gitStatus = git status --porcelain 2>$null
    if ($gitStatus) {
        Write-Host "⚠️ Hay archivos sin commit" -ForegroundColor Yellow
        $advertencias++
    }
    else {
        Write-Host "✅ Todos los archivos están commiteados" -ForegroundColor Green
    }
    
    $rama = git branch --show-current 2>$null
    if ($rama) {
        Write-Host "📍 Rama actual: $rama" -ForegroundColor Cyan
        if ($rama -ne "main") {
            Write-Host "⚠️ No estás en la rama 'main'" -ForegroundColor Yellow
            $advertencias++
        }
    }
}
else {
    Write-Host "❌ No se encontró repositorio Git" -ForegroundColor Red
    $errores++
}

Write-Host ""
Write-Host "🎯 VARIABLES DE ENTORNO NECESARIAS EN VERCEL..." -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "📋 Asegúrate de configurar estas 5 variables:" -ForegroundColor Cyan
Write-Host "   1. DATABASE_URL" -ForegroundColor White
Write-Host "   2. JWT_SECRET" -ForegroundColor White
Write-Host "   3. NODE_ENV" -ForegroundColor White
Write-Host "   4. FRONTEND_URL" -ForegroundColor White
Write-Host "   5. VITE_API_URL" -ForegroundColor White

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Resumen
Write-Host "📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "   Errores: $errores" -ForegroundColor $(if ($errores -eq 0) { "Green" } else { "Red" })
Write-Host "   Advertencias: $advertencias" -ForegroundColor $(if ($advertencias -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($errores -eq 0) {
    Write-Host "🎉 ¡Todo listo para el deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "1. git add ." -ForegroundColor White
    Write-Host "2. git commit -m 'Listo para deploy'" -ForegroundColor White
    Write-Host "3. git push origin main" -ForegroundColor White
    Write-Host "4. Ir a: https://vercel.com/new" -ForegroundColor White
    Write-Host "5. Configurar variables de entorno" -ForegroundColor White
    Write-Host "6. Deploy!" -ForegroundColor White
}
else {
    Write-Host "Error: Hay $errores errores que debes corregir" -ForegroundColor Red
}

Write-Host ""
