# Verificador Pre-Deploy - RV Automoviles
# Ejecuta este script antes de hacer deploy

Write-Host "Verificando configuracion para deploy en Vercel..." -ForegroundColor Cyan
Write-Host ""

$errores = 0
$advertencias = 0

Write-Host "Verificando archivos de configuracion..." -ForegroundColor Yellow
Write-Host ""

$archivos = @(
    "vercel.json",
    "package.json",
    "backend\package.json",
    "frontend\package.json",
    ".vercelignore",
    ".gitignore",
    ".env.example"
)

foreach ($archivo in $archivos) {
    if (Test-Path $archivo) {
        Write-Host "[OK] $archivo encontrado" -ForegroundColor Green
    }
    else {
        Write-Host "[ERROR] $archivo NO encontrado" -ForegroundColor Red
        $errores++
    }
}

Write-Host ""
Write-Host "Verificando documentacion..." -ForegroundColor Yellow
Write-Host ""

$docs = @(
    "VERCEL_DEPLOY_GUIDE.md",
    "QUICK_DEPLOY.md",
    "DEPLOY_CHECKLIST.md",
    "DEPLOY_READY.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "[OK] $doc encontrado" -ForegroundColor Green
    }
    else {
        Write-Host "[WARN] $doc NO encontrado" -ForegroundColor Yellow
        $advertencias++
    }
}

Write-Host ""
Write-Host "Verificando Git..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path ".git") {
    Write-Host "[OK] Repositorio Git encontrado" -ForegroundColor Green
    
    $gitStatus = git status --porcelain 2>$null
    if ($gitStatus) {
        Write-Host "[WARN] Hay archivos sin commit" -ForegroundColor Yellow
        $advertencias++
    }
    else {
        Write-Host "[OK] Todos los archivos commiteados" -ForegroundColor Green
    }
}
else {
    Write-Host "[ERROR] No se encontro repositorio Git" -ForegroundColor Red
    $errores++
}

Write-Host ""
Write-Host "Variables de entorno necesarias en Vercel:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. DATABASE_URL" -ForegroundColor White
Write-Host "  2. JWT_SECRET" -ForegroundColor White
Write-Host "  3. NODE_ENV" -ForegroundColor White
Write-Host "  4. FRONTEND_URL" -ForegroundColor White
Write-Host "  5. VITE_API_URL" -ForegroundColor White

Write-Host ""
Write-Host "RESUMEN:" -ForegroundColor Cyan
Write-Host "  Errores: $errores" -ForegroundColor $(if ($errores -eq 0) { "Green" } else { "Red" })
Write-Host "  Advertencias: $advertencias" -ForegroundColor $(if ($advertencias -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($errores -eq 0) {
    Write-Host "TODO LISTO PARA DEPLOY!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Proximos pasos:" -ForegroundColor Cyan
    Write-Host "1. git add ." -ForegroundColor White
    Write-Host "2. git commit -m 'Listo para deploy'" -ForegroundColor White
    Write-Host "3. git push origin main" -ForegroundColor White
    Write-Host "4. Ir a vercel.com/new" -ForegroundColor White
    Write-Host "5. Configurar variables y Deploy" -ForegroundColor White
}
else {
    Write-Host "HAY ERRORES QUE DEBES CORREGIR" -ForegroundColor Red
}

Write-Host ""
