/**
 * Extracts profile data from SoundCloud URL
 * This is a convenience function that wraps the APIClient
 * @param {string} profileUrl - SoundCloud profile URL
 * @returns {Promise<Object>} Profile data
 */
export async function extractProfile(profileUrl) {
  // Import APIClient here to avoid circular dependency issues
  const { default: APIClient } = await import("../components/APIClient.js");
  const client = new APIClient();
  return await client.fetchProfile(profileUrl);
}

/**
 * Extracts and validates profile URL
 * @param {string} url - Raw URL input
 * @returns {Promise<Object>} Validated profile data
 */
export async function extractAndValidateProfile(url) {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided");
  }

  // Normalize the URL
  const normalizedUrl = url.trim();

  try {
    return await extractProfile(normalizedUrl);
  } catch (error) {
    throw new Error(`Failed to extract profile: ${error.message}`);
  }
}
