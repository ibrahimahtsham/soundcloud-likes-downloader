import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import { OpenInNew, Person, Download } from "@mui/icons-material";
import { formatNumber } from "../../utils/formatters.js";
import { downloadTextFile } from "../../utils/fileDownload.js";

export function ProfileCard({ profile }) {
  if (!profile) return null;

  const handleDownloadAllLikes = () => {
    const batchContent = generateLikesBatchScript(profile);
    const filename = `download-${profile.username}-likes.bat`;
    downloadTextFile(batchContent, filename, "text/plain");
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar
          src={profile.avatarUrl}
          alt={profile.displayName}
          sx={{ width: 64, height: 64 }}
        >
          <Person />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" component="h2">
              {profile.displayName}
            </Typography>
            <IconButton
              size="small"
              onClick={() => window.open(profile.url, "_blank")}
            >
              <OpenInNew fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            @{profile.username}
          </Typography>

          {profile.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {profile.description}
            </Typography>
          )}

          {profile.createdAt && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Member since{" "}
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </Typography>
          )}
        </Box>

        {/* Download All Likes Button */}
        {profile.likesCount > 0 && (
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownloadAllLikes}
              size="small"
              color="primary"
            >
              Download All Likes
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
        {profile.followersCount > 0 && (
          <Chip
            label={`${formatNumber(profile.followersCount)} Followers`}
            variant="outlined"
            color="primary"
          />
        )}
        {profile.followingCount > 0 && (
          <Chip
            label={`${formatNumber(profile.followingCount)} Following`}
            variant="outlined"
            color="secondary"
          />
        )}
        {profile.trackCount > 0 && (
          <Chip
            label={`${formatNumber(profile.trackCount)} Tracks`}
            variant="outlined"
          />
        )}
        {profile.playlistCount > 0 && (
          <Chip
            label={`${formatNumber(profile.playlistCount)} Playlists`}
            variant="outlined"
          />
        )}
        {profile.likesCount > 0 && (
          <Chip
            label={`${formatNumber(profile.likesCount)} Likes`}
            variant="outlined"
            color="info"
          />
        )}
        {profile.repostsCount > 0 && (
          <Chip
            label={`${formatNumber(profile.repostsCount)} Reposts`}
            variant="outlined"
            color="warning"
          />
        )}
        {profile.verified && (
          <Chip label="Verified" variant="outlined" color="success" />
        )}
        {profile.badges?.pro && (
          <Chip label="Pro" variant="outlined" color="warning" />
        )}
        {profile.badges?.pro_unlimited && (
          <Chip label="Pro Unlimited" variant="outlined" color="error" />
        )}
        {profile.creatorSubscription?.product?.id &&
          profile.creatorSubscription.product.id !== "free" && (
            <Chip
              label={profile.creatorSubscription.product.id.toUpperCase()}
              variant="outlined"
              color="success"
            />
          )}
      </Box>
    </Paper>
  );
}

function generateLikesBatchScript(profile) {
  const likesUrl = `https://soundcloud.com/${profile.username}/likes`;

  return [
    "@echo off",
    "setlocal enabledelayedexpansion",
    `title Download All Likes - ${profile.displayName}`,
    "",
    "REM ========================================",
    `REM Download All Likes for ${profile.displayName}`,
    `REM Profile: @${profile.username}`,
    `REM Total Likes: ${formatNumber(profile.likesCount)}`,
    "REM ========================================",
    "",
    ":main_menu",
    "cls",
    "echo.",
    "echo ========================================",
    `echo   Download All Likes - ${profile.displayName}`,
    "echo ========================================",
    `echo Profile: @${profile.username}`,
    `echo Total Likes: ${formatNumber(profile.likesCount)}`,
    `echo Likes URL: ${likesUrl}`,
    "echo.",
    "echo Choose an option:",
    "echo 1) Check yt-dlp status",
    "echo 2) Install yt-dlp (via pip)",
    "echo 3) Install yt-dlp (via winget)",
    "echo 4) Install yt-dlp (download executable)",
    "echo 5) Download all liked tracks",
    "echo 6) Open likes page in browser",
    "echo 7) Exit",
    "echo.",
    "set /p choice=Enter your choice [1-7]: ",
    "",
    'if "%choice%"=="1" goto check_ytdlp',
    'if "%choice%"=="2" goto install_pip',
    'if "%choice%"=="3" goto install_winget',
    'if "%choice%"=="4" goto install_exe',
    'if "%choice%"=="5" goto download_likes',
    'if "%choice%"=="6" goto open_browser',
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
    ":download_likes",
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
    `echo Profile: ${profile.displayName} (@${profile.username})`,
    `echo Target: All ${formatNumber(profile.likesCount)} liked tracks`,
    `echo URL: ${likesUrl}`,
    "echo.",
    "echo Download options:",
    "echo - Format: MP3 (highest quality)",
    "echo - Output: ./downloads/${profile.username}-likes/",
    "echo - Playlist handling: Yes",
    "echo.",
    "set /p start_download=Start downloading all likes? (y/n): ",
    'if /i not "%start_download%"=="y" goto main_menu',
    "echo.",
    "",
    `mkdir "downloads\\${profile.username}-likes" 2>nul`,
    `cd "downloads\\${profile.username}-likes"`,
    "echo Starting download...",
    "echo.",
    `%YTDLP_CMD% "${likesUrl}" --extract-audio --audio-format mp3 --audio-quality 0 --output "%%(title)s.%%(ext)s"`,
    "",
    "echo.",
    "echo ========================================",
    "echo Download process completed!",
    "echo ========================================",
    `echo Check the downloads\\${profile.username}-likes\\ folder for your files.`,
    "echo.",
    "pause",
    "cd ..\\..",
    "goto main_menu",
    "",
    ":open_browser",
    "cls",
    "echo Opening likes page in your default browser...",
    "echo.",
    `start "" "${likesUrl}"`,
    "echo ✅ Browser opened!",
    "echo.",
    "pause",
    "goto main_menu",
    "",
    ":exit",
    "echo.",
    `echo Thank you for using SoundCloud Likes Downloader for ${profile.displayName}!`,
    "echo.",
    "pause",
    "exit /b 0",
  ].join("\n");
}
