/**
 * SoundCloud API Client - Main facade
 * Orchestrates all SoundCloud API operations
 */

import { profileService } from "./profile.js";
import { playlistsService } from "./playlists.js";
import { likesService } from "./likes.js";

export class SoundCloudClient {
  /**
   * Fetch user profile data
   * @param {string} username - SoundCloud username
   * @returns {Promise<Object>} Profile data
   */
  async fetchProfile(username) {
    return profileService.fetchProfile(username);
  }

  /**
   * Fetch user playlists
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Playlists data
   */
  async fetchPlaylists(username) {
    return playlistsService.fetchPlaylists(username);
  }

  /**
   * Fetch user likes
   * @param {string} username - SoundCloud username
   * @returns {Promise<Array>} Likes data
   */
  async fetchLikes(username) {
    return likesService.fetchLikes(username);
  }
}

// Export singleton instance
export const soundCloudClient = new SoundCloudClient();
