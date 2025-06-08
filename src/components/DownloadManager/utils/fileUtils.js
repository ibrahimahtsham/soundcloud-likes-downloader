/**
 * File utilities for download management
 */

/**
 * Sanitizes filename for safe file system usage
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
export function sanitizeFilename(filename) {
  if (!filename) return "untitled";

  return filename
    .replace(/[<>:"/\\|?*]/g, "_") // Replace invalid characters
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/_+/g, "_") // Remove duplicate underscores
    .replace(/^_|_$/g, "") // Remove leading/trailing underscores
    .toLowerCase()
    .substring(0, 200); // Limit filename length
}

/**
 * Generates a filename for a track
 * @param {Object} track - Track object
 * @param {string} format - File format (default: 'mp3')
 * @returns {string} - Generated filename
 */
export function generateTrackFilename(track, format = "mp3") {
  const artist = track.user?.username || "unknown_artist";
  const title = track.title || "untitled";

  const filename = `${artist} - ${title}`;
  return `${sanitizeFilename(filename)}.${format}`;
}

/**
 * Creates a download blob from data
 * @param {*} data - Data to create blob from
 * @param {string} mimeType - MIME type of the data
 * @returns {Blob} - Created blob
 */
export function createDownloadBlob(
  data,
  mimeType = "application/octet-stream"
) {
  return new Blob([data], { type: mimeType });
}

/**
 * Triggers a download of a blob
 * @param {Blob} blob - Blob to download
 * @param {string} filename - Filename for download
 */
export function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Estimates file size based on track duration and quality
 * @param {number} duration - Duration in milliseconds
 * @param {number} bitrate - Bitrate in kbps (default: 128)
 * @returns {number} - Estimated size in bytes
 */
export function estimateFileSize(duration, bitrate = 128) {
  const durationInSeconds = duration / 1000;
  const sizeInBits = durationInSeconds * bitrate * 1000;
  return Math.round(sizeInBits / 8); // Convert to bytes
}

/**
 * Formats file size in human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size string
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Validates file extension
 * @param {string} filename - Filename to validate
 * @param {Array} allowedExtensions - Array of allowed extensions
 * @returns {boolean} - True if extension is allowed
 */
export function validateFileExtension(
  filename,
  allowedExtensions = ["mp3", "wav", "flac"]
) {
  const extension = filename.split(".").pop()?.toLowerCase();
  return allowedExtensions.includes(extension);
}
