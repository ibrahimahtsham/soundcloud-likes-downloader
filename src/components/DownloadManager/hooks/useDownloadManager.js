import { useState, useCallback } from "react";
import {
  downloadTrack,
  downloadTracks,
  canDownloadTrack,
} from "../utils/downloadUtils.js";

export function useDownloadManager() {
  const [downloading, setDownloading] = useState(false);
  const [downloadQueue, setDownloadQueue] = useState([]);
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    percentage: 0,
    current: null,
  });
  const [errors, setErrors] = useState([]);

  const startDownload = useCallback(async (tracks) => {
    if (!tracks || tracks.length === 0) {
      console.warn("No tracks provided for download");
      return;
    }

    const validTracks = tracks.filter(canDownloadTrack);

    if (validTracks.length === 0) {
      console.warn("No valid tracks to download");
      return;
    }

    setDownloading(true);
    setDownloadQueue(validTracks);
    setErrors([]);
    setProgress({
      completed: 0,
      total: validTracks.length,
      percentage: 0,
      current: null,
    });

    try {
      const results = await downloadTracks(validTracks, (progressInfo) => {
        setProgress({
          completed: progressInfo.completed,
          total: progressInfo.total,
          percentage: progressInfo.percentage,
          current: progressInfo.current,
        });

        if (progressInfo.error) {
          setErrors((prev) => [
            ...prev,
            {
              track: progressInfo.current,
              error: progressInfo.error,
            },
          ]);
        }
      });

      console.log("Download batch completed:", results);
    } catch (error) {
      console.error("Download batch failed:", error);
      setErrors((prev) => [...prev, { error: error.message }]);
    } finally {
      setDownloading(false);
      setProgress((prev) => ({ ...prev, current: null }));
    }
  }, []);

  const downloadSingle = useCallback(async (track) => {
    if (!canDownloadTrack(track)) {
      console.warn("Invalid track for download:", track);
      return;
    }

    setDownloading(true);
    setErrors([]);

    try {
      await downloadTrack(track);
      console.log("Single download completed:", track.title);
    } catch (error) {
      console.error("Single download failed:", error);
      setErrors([{ track, error: error.message }]);
    } finally {
      setDownloading(false);
    }
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const cancelDownload = useCallback(() => {
    // Note: In a real implementation, you'd need to handle cancellation
    // of ongoing downloads. For now, we just reset the state.
    setDownloading(false);
    setDownloadQueue([]);
    setProgress({
      completed: 0,
      total: 0,
      percentage: 0,
      current: null,
    });
  }, []);

  return {
    downloading,
    downloadQueue,
    progress,
    errors,
    startDownload,
    downloadSingle,
    clearErrors,
    cancelDownload,
  };
}

// Export as default for backward compatibility
export default useDownloadManager;
