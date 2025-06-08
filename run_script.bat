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
echo 2) Build for production
echo 3) Deploy to GitHub Pages
echo 4) Run lint and depcheck
echo 5) Preview production build
set /p choice=Enter your choice [1-5]: 

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto deploy
if "%choice%"=="4" goto lint
if "%choice%"=="5" goto preview
echo Invalid choice. Please select 1-5.
goto menu

:dev
echo Starting development server...
echo Opening development server in your browser...
call npx vite --port 3000 --open
goto end

:build
echo Building for production...
call npx vite build
if errorlevel 1 (
    echo Build failed.
    goto end
)
echo Build completed successfully!
echo Built files are in the 'dist' folder.
goto menu

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
echo Opening GitHub repository in your default browser...
timeout /t 2 /nobreak
start https://github.com/ibrahimahtsham/soundcloud-likes-downloader
goto end

:preview
echo Starting preview server for production build...
echo Make sure you have built the project first (option 2)
call npx vite preview --port 4173 --open
goto end

:lint
echo Checking if ESLint is installed...
call npm list eslint >nul 2>&1
if errorlevel 1 (
    echo Installing ESLint...
    call npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
)

echo Running ESLint...
call npx eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0
if errorlevel 1 (
    echo ESLint found issues.
) else (
    echo ESLint passed!
)

echo.
echo Checking if depcheck is installed...
call npm list depcheck >nul 2>&1[plugin:vite:import-analysis] Failed to resolve import "./theme" from "src/App.jsx". Does the file exist?
if errorlevel 1 (
    echo Installing depcheck...
    call npm install --save-dev depcheck
)

echo Running depcheck to find unused dependencies...
call npx depcheck
echo.
echo Lint check completed.
goto menu

:end
echo.
echo Press any key to exit...
pause >nul
endlocal