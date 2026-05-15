# Senpai Spot — Auto Setup & Launch
# Right-click → Run with PowerShell

$Host.UI.RawUI.WindowTitle = "Senpai Spot — Setup & Launch"
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

Write-Host ""
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host "    SENPAI SPOT — Auto Setup & Launch" -ForegroundColor Yellow
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host ""

# Check Node.js
try {
    $nodeVer = node --version 2>&1
    $npmVer  = npm --version  2>&1
    Write-Host "  Node.js : $nodeVer" -ForegroundColor Green
    Write-Host "  npm     : v$npmVer"  -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "  [ERROR] Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    Start-Process "https://nodejs.org/en/download"
    Read-Host "Press Enter to exit"
    exit 1
}

# Install if needed
$nextPkg = Join-Path $projectDir "node_modules\next\package.json"
if (Test-Path $nextPkg) {
    Write-Host "  [OK] Dependencies already installed" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "  [1/2] Installing dependencies (first run ~1-2 min)..." -ForegroundColor Cyan
    Write-Host ""
    npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "  [ERROR] npm install failed." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
    Write-Host "  [OK] Packages installed!" -ForegroundColor Green
    Write-Host ""
}

# Open browser after delay
Start-Job -ScriptBlock {
    Start-Sleep 5
    Start-Process "http://localhost:3000"
} | Out-Null

# Start dev server
Write-Host "  [2/2] Starting dev server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "  ------------------------------------------" -ForegroundColor DarkGray
Write-Host "   http://localhost:3000   (opening browser)" -ForegroundColor White
Write-Host "   Ctrl+C to stop" -ForegroundColor DarkGray
Write-Host "  ------------------------------------------" -ForegroundColor DarkGray
Write-Host ""

npm run dev
