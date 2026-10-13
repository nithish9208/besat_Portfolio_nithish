@echo off
title Nithishkumar K - Data Analyst Portfolio & Simulation Lab
color 0B

echo =======================================================================
echo          NITHISHKUMAR K - DATA ANALYST PORTFOLIO
echo               Interactive Analytics ^& Simulation Lab
echo =======================================================================
echo.

cd /d "%~dp0"

echo [1/3] Verifying dependencies...
if not exist "node_modules\" (
    echo node_modules not found. Running npm install...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install npm dependencies. Please check Node.js installation.
        pause
        exit /b %errorlevel%
    )
) else (
    echo [OK] Dependencies ready.
)

echo.
echo [2/3] Launching your browser at http://localhost:5173 ...
timeout /t 2 /nobreak >nul
start http://localhost:5173

echo.
echo [3/3] Starting Vite development server...
echo -----------------------------------------------------------------------
echo  Press Ctrl+C in this terminal window to stop the server anytime.
echo -----------------------------------------------------------------------
call npm run dev -- --host 127.0.0.1 --port 5173

pause
