/**
 * SoundCloud API Client
 * Handles all SoundCloud data fetching operations
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
   * Fetch user's liked tracks
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Array of tracks
   */
  async fetchLikes(username) {
    console.log(`❤️ Fetching likes for: ${username}`);

    try {
      const likesUrl = `${this.baseUrl}/${username}/likes`;
      const response = await this._fetchWithProxy(likesUrl);

      return this._extractTracksData(response, "likes");
    } catch (error) {
      console.error(`❌ Failed to fetch likes for ${username}:`, error);
      return [];
    }
  }

  /**
   * Fetch user's playlists
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Array of playlists
   */
  async fetchPlaylists(username) {
    console.log(`📝 Fetching playlists for: ${username}`);

    try {
      const playlistsUrl = `${this.baseUrl}/${username}/sets`;
      const response = await this._fetchWithProxy(playlistsUrl);

      return this._extractPlaylistsData(response, "playlists");
    } catch (error) {
      console.error(`❌ Failed to fetch playlists for ${username}:`, error);
      return [];
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
   * Extract tracks data from HTML
   * @private
   */
  _extractTracksData(html, source) {
    const tracks = [];
    const hydrationData = this._extractHydrationData(html);

    console.log(
      `🔍 Available data types in ${source}:`,
      hydrationData.map((item) => item.hydratable)
    );

    for (const item of hydrationData) {
      if (item.hydratable === "sounds" && Array.isArray(item.data)) {
        console.log(`🎵 Found ${item.data.length} sounds in ${source}`);
        item.data.forEach((track) => tracks.push(this._parseTrack(track)));
      } else if (item.hydratable === "stream" && Array.isArray(item.data)) {
        console.log(`🎵 Found ${item.data.length} stream items in ${source}`);
        item.data.forEach((streamItem) => {
          if (streamItem.track) {
            tracks.push(this._parseTrack(streamItem.track));
          }
        });
      }
    }

    console.log(`📊 Extracted ${tracks.length} tracks from ${source}`);
    return tracks;
  }

  /**
   * Extract playlists data from HTML
   * @private
   */
  _extractPlaylistsData(html, source) {
    const playlists = [];
    const hydrationData = this._extractHydrationData(html);

    console.log(
      `🔍 Available data types in ${source}:`,
      hydrationData.map((item) => item.hydratable)
    );

    for (const item of hydrationData) {
      if (item.hydratable === "playlists" && Array.isArray(item.data)) {
        console.log(`📝 Found ${item.data.length} playlists in ${source}`);
        item.data.forEach((playlist) =>
          playlists.push(this._parsePlaylist(playlist))
        );
      } else if (item.hydratable === "sets" && Array.isArray(item.data)) {
        console.log(`📝 Found ${item.data.length} sets in ${source}`);
        item.data.forEach((playlist) =>
          playlists.push(this._parsePlaylist(playlist))
        );
      }
    }

    console.log(`📊 Extracted ${playlists.length} playlists from ${source}`);
    return playlists;
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
   * Parse track data
   * @private
   */
  _parseTrack(track) {
    return {
      id: track.id,
      title: track.title || "Untitled",
      artist: track.user
        ? {
            id: track.user.id,
            username: track.user.permalink,
            displayName: track.user.full_name || track.user.username,
          }
        : null,
      duration: track.duration || 0,
      createdAt: track.created_at,
      genre: track.genre || "",
      url: track.permalink_url || "",
      artworkUrl: track.artwork_url || "",
      playCount: track.playback_count || 0,
      likesCount: track.likes_count || 0,
      commentCount: track.comment_count || 0,
      description: track.description || "",
      downloadable: track.downloadable || false,
      streamable: track.streamable !== false,
    };
  }

  /**
   * Parse playlist data
   * @private
   */
  _parsePlaylist(playlist) {
    return {
      id: playlist.id,
      title: playlist.title || "Untitled Playlist",
      description: playlist.description || "",
      user: playlist.user
        ? {
            id: playlist.user.id,
            username: playlist.user.permalink,
            displayName: playlist.user.full_name || playlist.user.username,
          }
        : null,
      trackCount: playlist.track_count || 0,
      duration: playlist.duration || 0,
      createdAt: playlist.created_at,
      url: playlist.permalink_url || "",
      artworkUrl: playlist.artwork_url || "",
      tracks: playlist.tracks
        ? playlist.tracks.map((track) => this._parseTrack(track))
        : [],
      public: playlist.public !== false,
      likesCount: playlist.likes_count || 0,
    };
  }
}

// Export singleton instance
export const soundCloudClient = new SoundCloudClient();
