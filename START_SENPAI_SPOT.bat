@echo off
title Senpai Spot — Setup & Launch
color 0A
cls

echo.
echo  ==========================================
echo    SENPAI SPOT — Auto Setup ^& Launch
echo  ==========================================
echo.

:: Change to the project directory
cd /d "%~dp0"

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo  [ERROR] Node.js is not installed!
    echo.
    echo  Please install Node.js from: https://nodejs.org
    echo  Download the LTS version, install it, then run this file again.
    echo.
    pause
    start https://nodejs.org/en/download
    exit /b 1
)

:: Show Node version
for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('npm --version')  do set NPM_VER=%%v
echo  Node.js : %NODE_VER%
echo  npm     : v%NPM_VER%
echo.

:: Check if node_modules already exists
if exist "node_modules\next\package.json" (
    echo  [OK] Dependencies already installed — skipping npm install
    echo.
    goto :start_server
)

echo  [1/2] Installing dependencies (first-time setup, ~1-2 minutes) ...
echo.
call npm install --no-audit --no-fund
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo  [ERROR] npm install failed. Check your internet connection and try again.
    pause
    exit /b 1
)
echo.
echo  [OK] Dependencies installed successfully!
echo.

:start_server
echo  [2/2] Starting Senpai Spot development server ...
echo.
echo  ------------------------------------------
echo   Site URL  :  http://localhost:3000
echo   Press Ctrl+C to stop the server
echo  ------------------------------------------
echo.

:: Open browser after 4 seconds (in background)
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

:: Start Next.js dev server (stays in foreground)
call npm run dev

pause
