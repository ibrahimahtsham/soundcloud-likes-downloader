/**
 * SoundCloud download service
 */

import { generateBatchScript } from "./templates/batchScript.js";
import { generateUrlList } from "./templates/urlList.js";
import { generateTrackData } from "./templates/trackData.js";
import {
  downloadTextFile,
  showDownloadOptionsDialog,
} from "../../utils/fileDownload.js";

export class DownloadService {
  /**
   * Create a Windows batch script for yt-dlp
   * @param {Array} tracks - Array of track data
   */
  downloadBatchScript(tracks) {
    const scriptContent = generateBatchScript(tracks);
    downloadTextFile(scriptContent, "soundcloud_downloader.bat", "text/plain");
  }

  /**
   * Create a simple text file with URLs for manual downloading
   * @param {Array} tracks - Array of track data
   */
  downloadUrlList(tracks) {
    const urlList = generateUrlList(tracks);
    downloadTextFile(urlList, "soundcloud_urls.txt", "text/plain");
  }

  /**
   * Create downloadable file with detailed track information
   * @param {Array} tracks - Array of track data
   */
  downloadTrackList(tracks) {
    const jsonContent = generateTrackData(tracks);
    const filename = `soundcloud-tracks-${
      new Date().toISOString().split("T")[0]
    }.json`;
    downloadTextFile(jsonContent, filename, "application/json");
  }

  /**
   * Show download options dialog for Windows users
   * @param {Array} tracks - Array of track data
   */
  showDownloadOptions(tracks) {
    showDownloadOptionsDialog(tracks, this);
  }
}

// Export singleton instance
export const downloadService = new DownloadService();
