import { APIClient } from "../index.js";

/**
 * Extracts username from a SoundCloud profile URL
 * @param {string} url - The SoundCloud profile URL
 * @returns {string|null} - The extracted username or null if invalid
 */
export function extractUsernameFromUrl(url) {
  if (!url || typeof url !== "string") {
    return null;
  }

  // Remove trailing slash and normalize URL
  const normalizedUrl = url.trim().replace(/\/$/, "");

  // Match SoundCloud profile URL patterns
  const patterns = [
    /^https?:\/\/(?:www\.)?soundcloud\.com\/([^\/\?\#]+)$/,
    /^https?:\/\/(?:www\.)?soundcloud\.com\/([^\/\?\#]+)\/?\?.*$/,
    /^https?:\/\/(?:www\.)?soundcloud\.com\/([^\/\?\#]+)\/?$/,
  ];

  for (const pattern of patterns) {
    const match = normalizedUrl.match(pattern);
    if (match && match[1]) {
      // Exclude common SoundCloud pages that aren't user profiles
      const excludedPaths = [
        "discover",
        "stream",
        "you",
        "upload",
        "premium",
        "pro",
        "stations",
      ];
      if (!excludedPaths.includes(match[1].toLowerCase())) {
        return match[1];
      }
    }
  }

  return null;
}

/**
 * Validates if a URL is a valid SoundCloud profile URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid SoundCloud profile URL
 */
export function isValidSoundCloudUrl(url) {
  return extractUsernameFromUrl(url) !== null;
}

/**
 * Constructs API endpoint URLs
 * @param {string} endpoint - The API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} - The complete API URL
 */
export function buildApiUrl(endpoint, params = {}) {
  const baseUrl = "https://api-v2.soundcloud.com";
  const url = new URL(`${baseUrl}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}

/**
 * Handles API response and error checking
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} - Parsed JSON response
 */
export async function handleApiResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
 * Sanitizes filename for download
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
export function sanitizeFilename(filename) {
  return filename
    .replace(/[^\w\s.-]/gi, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();
}

/**
 * Extracts profile data from SoundCloud URL
 * This is a convenience function that wraps the APIClient
 * @param {string} profileUrl - SoundCloud profile URL
 * @returns {Promise<Object>} Profile data
 */
export async function extractProfile(profileUrl) {
  const client = new APIClient();
  return await client.fetchProfile(profileUrl);
}
