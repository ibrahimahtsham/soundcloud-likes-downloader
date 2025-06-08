@echo off
setlocal

:: Check if dependencies are already installed
if not exist "node_modules" (
    echo First run detected. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Failed to install dependencies.
        goto end
    )
    echo Dependencies installed successfully!
    goto menu
)

:menu
echo.
echo ========================================
echo   SoundCloud Likes Downloader
echo ========================================
echo Choose an option:
echo 1) Start dev server
echo 2) Deploy to GitHub Pages
echo 3) Exit
set /p choice=Enter your choice [1-3]: 

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto deploy
if "%choice%"=="3" goto exit
echo Invalid choice. Please select 1-3.
goto menu

:dev
echo Starting development server...
echo Opening development server in your browser...
call npx vite --port 3000 --open
goto end

:deploy
echo Deploying to GitHub Pages...
echo Make sure you have committed your changes first!
timeout /t 3 /nobreak

echo Step 1: Building for production...
call npx vite build
if errorlevel 1 (
    echo Build failed. Cannot deploy.
    goto end
)

echo Step 2: Installing gh-pages if not already installed...
call npm list gh-pages >nul 2>&1
if errorlevel 1 (
    echo Installing gh-pages...
    call npm install --save-dev gh-pages
)

echo Step 3: Deploying to GitHub Pages...
call npx gh-pages -d dist
if errorlevel 1 (
    echo Deployment failed.
    goto end
)
echo Successfully deployed to GitHub Pages!
echo Opening GitHub Actions page in your default browser...
timeout /t 2 /nobreak
start https://github.com/ibrahimahtsham/soundcloud-likes-downloader/actions/
goto end

:exit
echo Goodbye!
goto cleanup

:end
echo.
echo Press any key to exit...
pause >nul

:cleanup
endlocal