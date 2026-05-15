# Senpai Spot — Deploy to Vercel + Connect senpaispot.in
# Right-click this file → Run with PowerShell

$Host.UI.RawUI.WindowTitle = "Senpai Spot — Deploy"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $dir

Write-Host ""
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host "    SENPAI SPOT — Deploy to Vercel" -ForegroundColor Yellow
Write-Host "    Domain: www.senpaispot.in" -ForegroundColor Cyan
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host ""

# Step 1 — Git init
Write-Host "  [1/4] Setting up Git..." -ForegroundColor Cyan
git init 2>$null
git branch -M main 2>$null
git add .
git commit -m "Senpai Spot — initial commit" 2>$null
Write-Host "  [OK] Git ready." -ForegroundColor Green
Write-Host ""

# Step 2 — Open GitHub to create repo
Write-Host "  [2/4] Opening GitHub — Create a new repo" -ForegroundColor Cyan
Write-Host ""
Write-Host "   On GitHub:" -ForegroundColor White
Write-Host "    - Repository name: senpai-spot" -ForegroundColor Gray
Write-Host "    - Set to PUBLIC" -ForegroundColor Gray
Write-Host "    - Do NOT tick 'Add a README'" -ForegroundColor Gray
Write-Host "    - Click 'Create repository'" -ForegroundColor Gray
Write-Host ""
Start-Process "https://github.com/new"
Read-Host "  Press Enter AFTER you have created the repo on GitHub"

# Step 3 — Push code
Write-Host ""
$username = Read-Host "  [3/4] Enter your GitHub username"
$remote = "https://github.com/$username/senpai-spot.git"

Write-Host ""
Write-Host "  Pushing code to GitHub..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin $remote
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "  [ERROR] Push failed. Make sure the repo exists and try again." -ForegroundColor Red
    Read-Host "  Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "  [OK] Code pushed to GitHub!" -ForegroundColor Green
Write-Host ""

# Step 4 — Vercel deploy
Write-Host "  [4/4] Opening Vercel — Deploy your site" -ForegroundColor Cyan
Write-Host ""
Write-Host "   On Vercel:" -ForegroundColor White
Write-Host "    1. Sign in with GitHub" -ForegroundColor Gray
Write-Host "    2. Click 'Add New Project'" -ForegroundColor Gray
Write-Host "    3. Select 'senpai-spot' repo" -ForegroundColor Gray
Write-Host "    4. Open 'Environment Variables' and add:" -ForegroundColor Gray
Write-Host ""
Write-Host "       BLOGGER_BLOG_ID      = 5909176973464303118" -ForegroundColor Yellow
Write-Host "       NEXT_PUBLIC_SITE_URL = https://www.senpaispot.in" -ForegroundColor Yellow
Write-Host ""
Write-Host "    5. Click Deploy — wait ~2 minutes" -ForegroundColor Gray
Write-Host ""
Start-Process "https://vercel.com/new"
Read-Host "  Press Enter AFTER your site is deployed on Vercel"

Write-Host ""
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host "   NEXT: Connect your domain senpaispot.in" -ForegroundColor Yellow
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host ""
Write-Host "  STEP A — Add domain in Vercel:" -ForegroundColor Cyan
Write-Host "   Go to your Vercel project → Settings → Domains" -ForegroundColor Gray
Write-Host "   Add:  senpaispot.in" -ForegroundColor Yellow
Write-Host "   Add:  www.senpaispot.in" -ForegroundColor Yellow
Write-Host ""
Write-Host "  STEP B — Update DNS on GoDaddy:" -ForegroundColor Cyan
Write-Host "   Go to godaddy.com → My Products → senpaispot.in → DNS" -ForegroundColor Gray
Write-Host ""
Write-Host "   Delete any existing A record for '@', then add:" -ForegroundColor White
Write-Host ""
Write-Host "   TYPE    NAME    VALUE                    TTL" -ForegroundColor DarkGray
Write-Host "   ────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "   A       @       76.76.21.21              600" -ForegroundColor Green
Write-Host "   CNAME   www     cname.vercel-dns.com     600" -ForegroundColor Green
Write-Host ""
Write-Host "   DNS changes take 10-30 minutes to go live." -ForegroundColor DarkYellow
Write-Host ""
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host "   Your site will be live at:" -ForegroundColor White
Write-Host "   https://www.senpaispot.in" -ForegroundColor Green
Write-Host "  ==========================================" -ForegroundColor DarkYellow
Write-Host ""
Start-Process "https://godaddy.com"
Read-Host "  Press Enter to exit"
