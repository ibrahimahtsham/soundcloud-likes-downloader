/**
 * SoundCloud profile data service
 */

import { httpClient } from "./http.js";
import { htmlParser } from "./parser.js";

export class ProfileService {
  /**
   * Fetch user profile data
   * @param {string} username - SoundCloud username
   * @returns {Promise<Object>} Profile data
   */
  async fetchProfile(username) {
    console.log(`🔍 Fetching profile for: ${username}`);

    try {
      const profileUrl = httpClient.buildUrl(`/${username}`);
      const html = await httpClient.fetchWithProxy(profileUrl);

      return this._extractProfileData(html, username);
    } catch (error) {
      console.error(`❌ Failed to fetch profile for ${username}:`, error);
      throw new Error(`Failed to load profile: ${error.message}`);
    }
  }

  /**
   * Extract profile data from HTML
   * @private
   * @param {string} html - HTML content
   * @param {string} username - Username fallback
   * @returns {Object} Profile data
   */
  _extractProfileData(html, username) {
    const hydrationData = htmlParser.extractHydrationData(html);

    for (const item of hydrationData) {
      if (item.hydratable === "user" && item.data) {
        const userData = item.data;

        return {
          id: userData.id,
          username: userData.permalink || username,
          displayName: userData.full_name || userData.username || username,
          description: userData.description || "",
          avatarUrl: userData.avatar_url || "",
          followersCount: userData.followers_count || 0,
          followingCount: userData.followings_count || 0,
          trackCount: userData.track_count || 0,
          playlistCount: userData.playlist_count || 0,
          url: userData.permalink_url || httpClient.buildUrl(`/${username}`),
          createdAt: userData.created_at,
          verified: userData.verified || false,
          city: userData.city || "",
          country: userData.country || "",
        };
      }
    }

    throw new Error("Could not extract profile data");
  }
}

// Export singleton instance
export const profileService = new ProfileService();
