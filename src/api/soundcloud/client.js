/**
 * SoundCloud API Client
 * Handles SoundCloud profile data fetching operations
 */

const CORS_PROXY = "https://api.allorigins.win/get?url=";

export class SoundCloudClient {
  constructor() {
    this.baseUrl = "https://soundcloud.com";
  }

  /**
   * Fetch user profile data
   * @param {string} username - SoundCloud username
   * @returns {Promise<Object>} Profile data
   */
  async fetchProfile(username) {
    console.log(`🔍 Fetching profile for: ${username}`);

    try {
      const profileUrl = `${this.baseUrl}/${username}`;
      const response = await this._fetchWithProxy(profileUrl);

      return this._extractProfileData(response, username);
    } catch (error) {
      console.error(`❌ Failed to fetch profile for ${username}:`, error);
      throw new Error(`Failed to load profile: ${error.message}`);
    }
  }

  /**
   * Fetch with CORS proxy
   * @private
   */
  async _fetchWithProxy(url) {
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.contents) {
      throw new Error("No content received from proxy");
    }

    return data.contents;
  }

  /**
   * Extract profile data from HTML
   * @private
   */
  _extractProfileData(html, username) {
    const hydrationData = this._extractHydrationData(html);

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
          url: userData.permalink_url || `${this.baseUrl}/${username}`,
          createdAt: userData.created_at,
          verified: userData.verified || false,
          city: userData.city || "",
          country: userData.country || "",
        };
      }
    }

    throw new Error("Could not extract profile data");
  }

  /**
   * Extract hydration data from HTML
   * @private
   */
  _extractHydrationData(html) {
    const match = html.match(/window\.__sc_hydration\s*=\s*(\[.*?\]);/);

    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        console.error("Failed to parse hydration data:", error);
      }
    }

    return [];
  }
}

// Export singleton instance
export const soundCloudClient = new SoundCloudClient();
