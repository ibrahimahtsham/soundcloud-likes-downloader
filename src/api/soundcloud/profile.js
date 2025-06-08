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
    const metaData = htmlParser.extractMetaData(html);

    // Use hydration data first (most reliable)
    if (hydrationData.user) {
      const userData = hydrationData.user;

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
        likesCount: userData.likes_count || 0,
        repostsCount: userData.reposts_count || 0,
        url: userData.permalink_url || httpClient.buildUrl(`/${username}`),
        createdAt: userData.created_at,
        verified: userData.verified || false,
        badges: userData.badges || {},
        city: userData.city || "",
        country: userData.country_code || "",
        // Additional data from hydration
        uri: userData.uri,
        urn: userData.urn,
        visuals: userData.visuals,
        creatorSubscription: userData.creator_subscription,
      };
    }

    // Fallback to meta tags if hydration data is not available
    if (metaData["follower_count"] || metaData["sound_count"]) {
      return {
        username: username,
        displayName: metaData["og:title"] || username,
        description: metaData["og:description"] || "",
        avatarUrl: metaData["og:image"] || "",
        followersCount: parseInt(metaData["follower_count"]) || 0,
        trackCount: parseInt(metaData["sound_count"]) || 0,
        url: metaData["og:url"] || httpClient.buildUrl(`/${username}`),
        verified: false,
      };
    }

    throw new Error("Could not extract profile data");
  }
}

// Export singleton instance
export const profileService = new ProfileService();
