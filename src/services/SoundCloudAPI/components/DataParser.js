/**
 * Data parser for SoundCloud API responses
 */
export class DataParser {
  /**
   * Parses raw profile data from SoundCloud API
   * @param {Object} rawData - Raw API response
   * @returns {Object} Parsed profile data
   */
  static parseProfile(rawData) {
    if (!rawData) {
      throw new Error("No profile data to parse");
    }

    return {
      id: rawData.id,
      username: rawData.username || rawData.permalink,
      display_name: rawData.full_name || rawData.username,
      description: rawData.description || "",
      avatar_url: rawData.avatar_url || "",
      followers_count: rawData.followers_count || 0,
      following_count: rawData.followings_count || 0,
      track_count: rawData.track_count || 0,
      playlist_count: rawData.playlist_count || 0,
      permalink_url: rawData.permalink_url || "",
      created_at: rawData.created_at || new Date().toISOString(),
      verified: rawData.verified || false,
      city: rawData.city || "",
      country: rawData.country || "",
    };
  }

  /**
   * Parses raw track data from SoundCloud API
   * @param {Object} rawTrack - Raw track data
   * @returns {Object} Parsed track data
   */
  static parseTrack(rawTrack) {
    if (!rawTrack) {
      throw new Error("No track data to parse");
    }

    return {
      id: rawTrack.id,
      title: rawTrack.title || "Untitled",
      user: rawTrack.user ? this.parseUser(rawTrack.user) : null,
      duration: rawTrack.duration || 0,
      created_at: rawTrack.created_at || new Date().toISOString(),
      genre: rawTrack.genre || "",
      permalink_url: rawTrack.permalink_url || "",
      artwork_url: this.parseArtworkUrl(rawTrack.artwork_url),
      playback_count: rawTrack.playback_count || 0,
      likes_count: rawTrack.likes_count || rawTrack.favoritings_count || 0,
      comment_count: rawTrack.comment_count || 0,
      download_count: rawTrack.download_count || 0,
      description: rawTrack.description || "",
      tag_list: rawTrack.tag_list || "",
      downloadable: rawTrack.downloadable || false,
      streamable: rawTrack.streamable !== false,
      waveform_url: rawTrack.waveform_url || "",
    };
  }

  /**
   * Parses raw playlist data from SoundCloud API
   * @param {Object} rawPlaylist - Raw playlist data
   * @returns {Object} Parsed playlist data
   */
  static parsePlaylist(rawPlaylist) {
    if (!rawPlaylist) {
      throw new Error("No playlist data to parse");
    }

    return {
      id: rawPlaylist.id,
      title: rawPlaylist.title || "Untitled Playlist",
      description: rawPlaylist.description || "",
      user: rawPlaylist.user ? this.parseUser(rawPlaylist.user) : null,
      track_count: rawPlaylist.track_count || 0,
      duration: rawPlaylist.duration || 0,
      created_at: rawPlaylist.created_at || new Date().toISOString(),
      permalink_url: rawPlaylist.permalink_url || "",
      artwork_url: this.parseArtworkUrl(rawPlaylist.artwork_url),
      tracks: rawPlaylist.tracks
        ? rawPlaylist.tracks.map((track) => this.parseTrack(track))
        : [],
      likes_count:
        rawPlaylist.likes_count || rawPlaylist.favoritings_count || 0,
      reposts_count: rawPlaylist.reposts_count || 0,
      public: rawPlaylist.public !== false,
      sharing: rawPlaylist.sharing || "public",
      tag_list: rawPlaylist.tag_list || "",
    };
  }

  /**
   * Parses user data
   * @param {Object} rawUser - Raw user data
   * @returns {Object} Parsed user data
   */
  static parseUser(rawUser) {
    if (!rawUser) {
      return null;
    }

    return {
      id: rawUser.id,
      username: rawUser.username || rawUser.permalink,
      display_name: rawUser.full_name || rawUser.username,
      avatar_url: this.parseArtworkUrl(rawUser.avatar_url),
      permalink_url: rawUser.permalink_url || "",
      verified: rawUser.verified || false,
    };
  }

  /**
   * Parses and normalizes artwork URLs
   * @param {string} artworkUrl - Raw artwork URL
   * @returns {string} Normalized artwork URL
   */
  static parseArtworkUrl(artworkUrl) {
    if (!artworkUrl) {
      return "https://via.placeholder.com/300x300/333/white?text=SC";
    }

    // Convert to higher resolution if available
    return artworkUrl.replace("-large.jpg", "-t500x500.jpg");
  }

  /**
   * Parses array of tracks
   * @param {Array} rawTracks - Array of raw track data
   * @returns {Array} Array of parsed tracks
   */
  static parseTracks(rawTracks) {
    if (!Array.isArray(rawTracks)) {
      return [];
    }

    return rawTracks.map((track) => this.parseTrack(track));
  }

  /**
   * Parses array of playlists
   * @param {Array} rawPlaylists - Array of raw playlist data
   * @returns {Array} Array of parsed playlists
   */
  static parsePlaylists(rawPlaylists) {
    if (!Array.isArray(rawPlaylists)) {
      return [];
    }

    return rawPlaylists.map((playlist) => this.parsePlaylist(playlist));
  }

  /**
   * Normalizes duration format (converts seconds to milliseconds if needed)
   * @param {number} duration - Duration value
   * @returns {number} Duration in milliseconds
   */
  static normalizeDuration(duration) {
    if (!duration) return 0;

    // If duration is less than 100000, assume it's in seconds and convert to milliseconds
    return duration < 100000 ? duration * 1000 : duration;
  }

  /**
   * Extracts and cleans tag list
   * @param {string} tagList - Raw tag list string
   * @returns {Array} Array of clean tags
   */
  static parseTags(tagList) {
    if (!tagList || typeof tagList !== "string") {
      return [];
    }

    return tagList
      .split(/\s+/)
      .map((tag) => tag.replace(/"/g, "").trim())
      .filter((tag) => tag.length > 0);
  }
}

// Default export for backward compatibility
export default DataParser;
