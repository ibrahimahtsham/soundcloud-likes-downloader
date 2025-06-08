import { useState, useCallback } from "react";
import { downloadService } from "../api/soundcloud/download.js";

export function useDownload() {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadMultiple = useCallback(async (tracks) => {
    if (tracks.length === 0) return;

    setDownloading(true);
    setDownloadError(null);

    try {
      // Show Windows-specific download options
      downloadService.showDownloadOptions(tracks);
      console.log(`✅ Download options shown for ${tracks.length} tracks`);
    } catch (error) {
      const errorMessage =
        error.message || "Failed to process download request";
      setDownloadError(errorMessage);
      console.error("❌ Download processing failed:", error);
    } finally {
      setDownloading(false);
    }
  }, []);

  const downloadTrackList = useCallback((tracks) => {
    try {
      downloadService.downloadTrackList(tracks);
      console.log(`✅ Track list downloaded for ${tracks.length} tracks`);
    } catch (error) {
      const errorMessage = error.message || "Failed to download track list";
      setDownloadError(errorMessage);
      console.error("❌ Track list download failed:", error);
    }
  }, []);

  return {
    downloading,
    downloadError,
    downloadMultiple,
    downloadTrackList,
  };
}
