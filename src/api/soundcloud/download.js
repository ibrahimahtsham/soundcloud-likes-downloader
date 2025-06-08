/**
 * SoundCloud download service
 */

export class DownloadService {
  /**
   * Create a Windows batch script for yt-dlp
   * @param {Array} tracks - Array of track data
   */
  downloadBatchScript(tracks) {
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
      // Generate download commands for each track
      ...tracks.map((track, index) => {
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
      }),
      "",
      "echo.",
      "echo ========================================",
      "echo Download process completed!",
      "echo ========================================",
      "pause",
      "goto main_menu",
      "",
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
      ":exit",
      "echo.",
      "echo Thank you for using SoundCloud Batch Downloader!",
      "echo.",
      "pause",
      "exit /b 0",
    ].join("\n");

    this._downloadTextFile(
      scriptContent,
      "soundcloud_downloader.bat",
      "text/plain"
    );
  }

  /**
   * Create a simple text file with URLs for manual downloading
   * @param {Array} tracks - Array of track data
   */
  downloadUrlList(tracks) {
    const urlList = [
      "# SoundCloud Tracks - Copy these URLs to your preferred downloader",
      "# Recommended Windows tools:",
      "# - yt-dlp (command line): pip install yt-dlp",
      "# - 4K Video Downloader (GUI): https://www.4kdownload.com/",
      "# - JDownloader (GUI): https://jdownloader.org/",
      "# - Online services: scdl.com, snapsave.app, y2meta.com",
      "",
      ...tracks.map(
        (track, index) =>
          `# ${index + 1}. ${track.name} by ${track.author}\n${track.url}\n`
      ),
    ].join("\n");

    this._downloadTextFile(urlList, "soundcloud_urls.txt", "text/plain");
  }

  /**
   * Create downloadable file with detailed track information
   * @param {Array} tracks - Array of track data
   */
  downloadTrackList(tracks) {
    const trackList = tracks.map((track, index) => ({
      id: index + 1,
      name: track.name,
      author: track.author,
      url: track.url,
      authorUrl: track.authorUrl,
      type: track.type,
      publishedAt: track.publishedAt,
      slug: track.slug,
    }));

    const jsonContent = JSON.stringify(trackList, null, 2);
    this._downloadTextFile(
      jsonContent,
      `soundcloud-tracks-${new Date().toISOString().split("T")[0]}.json`,
      "application/json"
    );
  }

  /**
   * Show download options dialog for Windows users
   * @param {Array} tracks - Array of track data
   */
  showDownloadOptions(tracks) {
    const options = [
      "1. Download batch script (.bat file for Windows)",
      "2. Download URL list (for manual copying)",
      "3. Download track data (JSON file)",
    ];

    const choice = prompt(
      `Choose download method:\n\n${options.join("\n")}\n\nEnter number (1-3):`
    );

    switch (choice) {
      case "1":
        this.downloadBatchScript(tracks);
        break;
      case "2":
        this.downloadUrlList(tracks);
        break;
      case "3":
        this.downloadTrackList(tracks);
        break;
      default:
        if (choice !== null) {
          alert("Invalid choice. Please select 1-3.");
        }
    }
  }

  /**
   * Download text file helper
   * @private
   * @param {string} content - File content
   * @param {string} filename - File name
   * @param {string} mimeType - MIME type
   */
  _downloadTextFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`✅ Downloaded: ${filename}`);
  }
}

// Export singleton instance
export const downloadService = new DownloadService();
