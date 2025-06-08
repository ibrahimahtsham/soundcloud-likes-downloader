/**
 * Extract username from SoundCloud URL
 * @param {string} url - SoundCloud URL
 * @returns {string|null} Username or null if invalid
 */
export function extractUsername(url) {
  if (!url || typeof url !== "string") return null;

  try {
    const urlObj = new URL(url.trim());

    if (
      urlObj.hostname !== "soundcloud.com" &&
      urlObj.hostname !== "www.soundcloud.com"
    ) {
      return null;
    }

    const pathParts = urlObj.pathname.split("/").filter(Boolean);

    if (pathParts.length === 0) return null;

    const username = pathParts[0];

    // Basic username validation
    if (username.length < 1 || username.length > 25) return null;
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) return null;

    return username;
  } catch {
    return null;
  }
}

/**
 * Validate SoundCloud profile URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export function isValidSoundCloudUrl(url) {
  return extractUsername(url) !== null;
}
