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
      "REM SoundCloud Batch Download Script for Windows",
      "REM Install yt-dlp first: pip install yt-dlp",
      "REM Run this file by double-clicking or from command prompt",
      "",
      "setlocal enabledelayedexpansion",
      "",
      "echo Starting SoundCloud batch download...",
      `echo Total tracks: ${tracks.length}`,
      "echo.",
      "",
      ...tracks.map((track, index) => {
        // Escape special characters for batch files
        const escapedName = track.name
          .replace(/&/g, "^&")
          .replace(/</g, "^<")
          .replace(/>/g, "^>")
          .replace(/\|/g, "^|")
          .replace(/"/g, '""');

        return [
          `echo Downloading ${index + 1}/${tracks.length}: ${escapedName}`,
          `yt-dlp "${track.url}" --extract-audio --audio-format mp3 --audio-quality 0`,
          "echo.",
        ].join("\n");
      }),
      "",
      "echo Download complete!",
      "echo Press any key to exit...",
      "pause >nul",
    ].join("\n");

    this._downloadTextFile(scriptContent, "download_tracks.bat", "text/plain");
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
