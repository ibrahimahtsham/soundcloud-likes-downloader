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
   * Fetch user playlists
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Playlists data
   */
  async fetchPlaylists(username) {
    console.log(`🔍 Fetching playlists for: ${username}`);

    try {
      const playlistsUrl = `${this.baseUrl}/${username}/sets`;
      const response = await this._fetchWithProxy(playlistsUrl);

      return this._extractPlaylistsData(response);
    } catch (error) {
      console.error(`❌ Failed to fetch playlists for ${username}:`, error);
      throw new Error(`Failed to load playlists: ${error.message}`);
    }
  }

  /**
   * Fetch user likes
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Likes data
   */
  async fetchLikes(username) {
    console.log(`🔍 Fetching likes for: ${username}`);

    try {
      const likesUrl = `${this.baseUrl}/${username}/likes`;
      const response = await this._fetchWithProxy(likesUrl);

      return this._extractLikesData(response);
    } catch (error) {
      console.error(`❌ Failed to fetch likes for ${username}:`, error);
      throw new Error(`Failed to load likes: ${error.message}`);
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

  /**
   * Extract playlists data from HTML
   * @private
   */
  _extractPlaylistsData(html) {
    const playlists = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const playlistArticles = doc.querySelectorAll(
      'article[itemtype="http://schema.org/MusicPlaylist"]'
    );

    playlistArticles.forEach((article) => {
      const nameLink = article.querySelector(
        'h2[itemprop="name"] a[itemprop="url"]'
      );
      const authorLink = article.querySelector(
        'h2 a[href^="/"][href*="/"]:not([itemprop="url"])'
      );
      const timeElement = article.querySelector("time[pubdate]");
      const durationMeta = article.querySelector('meta[itemprop="duration"]');

      if (nameLink) {
        playlists.push({
          name: nameLink.textContent.trim(),
          url: `https://soundcloud.com${nameLink.getAttribute("href")}`,
          slug: nameLink.getAttribute("href").split("/").pop(),
          author: authorLink ? authorLink.textContent.trim() : "",
          authorUrl: authorLink
            ? `https://soundcloud.com${authorLink.getAttribute("href")}`
            : "",
          publishedAt: timeElement ? timeElement.getAttribute("datetime") : "",
          duration: durationMeta
            ? this._parseDuration(durationMeta.getAttribute("content"))
            : 0,
          type: "playlist",
        });
      }
    });

    return playlists;
  }

  /**
   * Extract likes data from HTML
   * @private
   */
  _extractLikesData(html) {
    const likes = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const likeArticles = doc.querySelectorAll("article");

    likeArticles.forEach((article) => {
      const nameLink = article.querySelector(
        'h2[itemprop="name"] a[itemprop="url"]'
      );
      const authorLink = article.querySelector(
        'h2 a[href^="/"][href*="/"]:not([itemprop="url"])'
      );
      const timeElement = article.querySelector("time[pubdate]");

      if (nameLink) {
        const href = nameLink.getAttribute("href");
        const isPlaylist = href.includes("/sets/");

        likes.push({
          name: nameLink.textContent.trim(),
          url: `https://soundcloud.com${href}`,
          slug: href.split("/").pop(),
          author: authorLink ? authorLink.textContent.trim() : "",
          authorUrl: authorLink
            ? `https://soundcloud.com${authorLink.getAttribute("href")}`
            : "",
          publishedAt: timeElement ? timeElement.getAttribute("datetime") : "",
          type: isPlaylist ? "playlist" : "track",
        });
      }
    });

    return likes;
  }

  /**
   * Parse ISO 8601 duration to seconds
   * @private
   */
  _parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    return hours * 3600 + minutes * 60 + seconds;
  }
}

// Export singleton instance
export const soundCloudClient = new SoundCloudClient();
