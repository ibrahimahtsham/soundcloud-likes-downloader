/**
 * Downloads a track by creating a download link
 * Note: This is a mock implementation since actual SoundCloud track downloading
 * requires special handling of their streaming URLs and may violate ToS
 * @param {Object} track - Track object with metadata
 * @returns {Promise<void>}
 */
export async function downloadTrack(track) {
  try {
    console.log(
      `Attempting to download: ${track.title} by ${track.user?.username}`
    );

    // In a real implementation, you would:
    // 1. Get the actual audio stream URL from SoundCloud
    // 2. Fetch the audio data
    // 3. Convert to desired format (MP3)
    // 4. Create download blob

    // For now, we'll simulate the download process
    await simulateDownload(track);

    // Create a mock download (this won't actually download audio)
    createMockDownload(track);
  } catch (error) {
    console.error("Download failed:", error);
    throw new Error(`Failed to download ${track.title}: ${error.message}`);
  }
}

/**
 * Downloads multiple tracks sequentially
 * @param {Array} tracks - Array of track objects
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<void>}
 */
export async function downloadTracks(tracks, onProgress) {
  const results = [];

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];

    try {
      await downloadTrack(track);
      results.push({ track, success: true });

      if (onProgress) {
        onProgress({
          completed: i + 1,
          total: tracks.length,
          current: track,
          percentage: ((i + 1) / tracks.length) * 100,
        });
      }

      // Add delay between downloads to be respectful
      if (i < tracks.length - 1) {
        await delay(1000);
      }
    } catch (error) {
      console.error(`Failed to download ${track.title}:`, error);
      results.push({ track, success: false, error: error.message });

      if (onProgress) {
        onProgress({
          completed: i + 1,
          total: tracks.length,
          current: track,
          percentage: ((i + 1) / tracks.length) * 100,
          error: error.message,
        });
      }
    }
  }

  return results;
}

/**
 * Simulates download process with delay
 * @param {Object} track - Track object
 * @returns {Promise<void>}
 */
async function simulateDownload(track) {
  // Simulate network delay based on track duration
  const baseDelay = 1000; // 1 second base
  const durationDelay = Math.min(track.duration / 1000 / 10, 3000); // Max 3 seconds
  const totalDelay = baseDelay + durationDelay;

  await delay(totalDelay);
}

/**
 * Creates a mock download file (placeholder)
 * @param {Object} track - Track object
 */
function createMockDownload(track) {
  // Create a text file with track information as a placeholder
  const trackInfo = `
SoundCloud Track Information
============================
Title: ${track.title}
Artist: ${track.user?.username || "Unknown"}
Duration: ${formatDuration(track.duration)}
Genre: ${track.genre || "Unknown"}
URL: ${track.permalink_url}
Created: ${new Date(track.created_at).toLocaleString()}

Note: This is a placeholder file. 
Actual audio downloading requires special implementation 
and may be subject to SoundCloud's Terms of Service.
`;

  const blob = new Blob([trackInfo], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFilename(track.title)}_info.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Sanitizes filename for safe downloading
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
function sanitizeFilename(filename) {
  return filename
    .replace(/[^\w\s.-]/gi, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase()
    .substring(0, 100); // Limit length
}

/**
 * Formats duration from milliseconds to readable format
 * @param {number} duration - Duration in milliseconds
 * @returns {string} - Formatted duration
 */
function formatDuration(duration) {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * Creates a delay promise
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validates if a track can be downloaded
 * @param {Object} track - Track object
 * @returns {boolean} - True if track can be downloaded
 */
export function canDownloadTrack(track) {
  return !!(track && track.id && track.title && track.user);
}

/**
 * Gets download progress information
 * @param {number} completed - Number of completed downloads
 * @param {number} total - Total number of downloads
 * @returns {Object} - Progress information
 */
export function getDownloadProgress(completed, total) {
  return {
    completed,
    total,
    percentage: total > 0 ? (completed / total) * 100 : 0,
    remaining: total - completed,
  };
}
