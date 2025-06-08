/**
 * Windows batch script template for yt-dlp downloads
 */

export function generateBatchScript(tracks) {
  const scriptContent = [
    "@echo off",
    "setlocal enabledelayedexpansion",
    "title SoundCloud Batch Downloader",
    "",
    "REM ========================================",
    "REM SoundCloud Batch Download Script",
    "REM Auto-handles yt-dlp installation and downloads",
    "REM ========================================",
    "",
    ":main_menu",
    "cls",
    "echo.",
    "echo ========================================",
    "echo   SoundCloud Batch Downloader",
    "echo ========================================",
    `echo Total tracks selected: ${tracks.length}`,
    "echo.",
    "echo Choose an option:",
    "echo 1) Check yt-dlp status",
    "echo 2) Install yt-dlp (via pip)",
    "echo 3) Install yt-dlp (via winget)",
    "echo 4) Install yt-dlp (download executable)",
    "echo 5) Download all selected tracks",
    "echo 6) Show track list",
    "echo 7) Exit",
    "echo.",
    "set /p choice=Enter your choice [1-7]: ",
    "",
    ...generateMenuLogic(),
    ...generateInstallationMethods(),
    ...generateDownloadSection(tracks),
    ...generateTrackListSection(tracks),
    ...generateExitSection(),
  ].join("\n");

  return scriptContent;
}

function generateMenuLogic() {
  return [
    'if "%choice%"=="1" goto check_ytdlp',
    'if "%choice%"=="2" goto install_pip',
    'if "%choice%"=="3" goto install_winget',
    'if "%choice%"=="4" goto install_exe',
    'if "%choice%"=="5" goto download_tracks',
    'if "%choice%"=="6" goto show_tracks',
    'if "%choice%"=="7" goto exit',
    "echo Invalid choice. Please select 1-7.",
    "pause",
    "goto main_menu",
    "",
  ];
}

function generateInstallationMethods() {
  return [
    ":check_ytdlp",
    "cls",
    "echo Checking yt-dlp installation...",
    "echo.",
    "yt-dlp --version >nul 2>&1",
    "if errorlevel 1 (",
    "    echo ❌ yt-dlp is NOT installed or not in PATH",
    "    echo.",
    "    echo Please install yt-dlp using one of the installation options.",
    ") else (",
    "    echo ✅ yt-dlp is installed and working!",
    "    echo Version:",
    "    yt-dlp --version",
    ")",
    "echo.",
    "pause",
    "goto main_menu",
    "",
    ":install_pip",
    "cls",
    "echo Installing yt-dlp via pip...",
    "echo.",
    "python --version >nul 2>&1",
    "if errorlevel 1 (",
    "    echo ❌ Python is not installed or not in PATH",
    "    echo Please install Python from https://python.org first",
    "    pause",
    "    goto main_menu",
    ")",
    "echo Python found. Installing yt-dlp...",
    "pip install --upgrade yt-dlp",
    "if errorlevel 1 (",
    "    echo ❌ Installation failed",
    ") else (",
    "    echo ✅ yt-dlp installed successfully via pip!",
    ")",
    "pause",
    "goto main_menu",
    "",
    ":install_winget",
    "cls",
    "echo Installing yt-dlp via winget...",
    "echo.",
    "winget --version >nul 2>&1",
    "if errorlevel 1 (",
    "    echo ❌ winget is not available",
    "    echo Please use Windows 10/11 with App Installer from Microsoft Store",
    "    pause",
    "    goto main_menu",
    ")",
    "echo winget found. Installing yt-dlp...",
    "winget install yt-dlp",
    "if errorlevel 1 (",
    "    echo ❌ Installation failed",
    ") else (",
    "    echo ✅ yt-dlp installed successfully via winget!",
    ")",
    "pause",
    "goto main_menu",
    "",
    ":install_exe",
    "cls",
    "echo Installing yt-dlp executable...",
    "echo.",
    "echo This will download yt-dlp.exe to the current directory.",
    "echo You can then move it to a folder in your PATH if desired.",
    "echo.",
    "set /p confirm=Continue? (y/n): ",
    'if /i not "%confirm%"=="y" goto main_menu',
    "echo.",
    "echo Downloading yt-dlp.exe...",
    "curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe -o yt-dlp.exe",
    "if errorlevel 1 (",
    "    echo ❌ Download failed. Please check your internet connection.",
    ") else (",
    "    echo ✅ yt-dlp.exe downloaded successfully!",
    "    echo The executable is now available in the current directory.",
    ")",
    "pause",
    "goto main_menu",
    "",
  ];
}

function generateDownloadSection(tracks) {
  const downloadCommands = tracks.map((track, index) => {
    const escapedName = track.name
      .replace(/&/g, "^&")
      .replace(/</g, "^<")
      .replace(/>/g, "^>")
      .replace(/\|/g, "^|")
      .replace(/"/g, '""');

    return [
      `echo [${index + 1}/${tracks.length}] Downloading: ${escapedName}`,
      `echo Author: ${track.author}`,
      `%YTDLP_CMD% "${track.url}" --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist`,
      "if errorlevel 1 (",
      `    echo ❌ Failed to download: ${escapedName}`,
      ") else (",
      `    echo ✅ Downloaded: ${escapedName}`,
      ")",
      "echo.",
    ].join("\n");
  });

  return [
    ":download_tracks",
    "cls",
    "echo Checking yt-dlp availability...",
    "yt-dlp --version >nul 2>&1",
    "if errorlevel 1 (",
    "    REM Try local executable",
    "    .\\yt-dlp.exe --version >nul 2>&1",
    "    if errorlevel 1 (",
    "        echo ❌ yt-dlp not found!",
    "        echo Please install yt-dlp first using options 2-4.",
    "        pause",
    "        goto main_menu",
    "    ) else (",
    "        set YTDLP_CMD=.\\yt-dlp.exe",
    "    )",
    ") else (",
    "    set YTDLP_CMD=yt-dlp",
    ")",
    "",
    "echo ✅ yt-dlp found! Starting download...",
    "echo.",
    `echo Total tracks to download: ${tracks.length}`,
    "echo.",
    "echo Download options:",
    "echo - Format: MP3 (highest quality)",
    "echo - Output: Current directory",
    "echo.",
    "set /p start_download=Start downloading? (y/n): ",
    'if /i not "%start_download%"=="y" goto main_menu',
    "echo.",
    "",
    ...downloadCommands,
    "",
    "echo.",
    "echo ========================================",
    "echo Download process completed!",
    "echo ========================================",
    "pause",
    "goto main_menu",
    "",
  ];
}

function generateTrackListSection(tracks) {
  return [
    ":show_tracks",
    "cls",
    "echo Selected tracks for download:",
    "echo ========================================",
    ...tracks.map(
      (track, index) => `echo ${index + 1}. ${track.name} by ${track.author}`
    ),
    "echo ========================================",
    `echo Total: ${tracks.length} tracks`,
    "echo.",
    "pause",
    "goto main_menu",
    "",
  ];
}

function generateExitSection() {
  return [
    ":exit",
    "echo.",
    "echo Thank you for using SoundCloud Batch Downloader!",
    "echo.",
    "pause",
    "exit /b 0",
  ];
}
