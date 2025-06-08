import { extractUsernameFromUrl } from "../utils/apiUtils.js";
import {
  scrapeProfile,
  scrapeUserTracks,
  scrapeUserPlaylists,
} from "../utils/soundCloudScraper.js"; // Fixed: changed to soundCloudScrapper.js (with double 'p')
import { getMockProfileData } from "../utils/mockData.js";

class SoundCloudAPIClient {
  constructor() {
    this.baseUrl = "https://api-v2.soundcloud.com";
    this.useScraping = true; // Use web scraping by default
  }

  /**
   * Fetches user profile data from SoundCloud URL
   * @param {string} profileUrl - SoundCloud profile URL
   * @returns {Promise<Object>} Profile data with likes and playlists
   */
  async fetchProfile(profileUrl) {
    const username = extractUsernameFromUrl(profileUrl);

    if (!username) {
      const error = new Error("Invalid SoundCloud profile URL");
      console.error("APIClient Error:", error.message);
      throw error;
    }

    console.log(`🔍 Starting profile fetch for username: ${username}`);
    console.log(`📍 Profile URL: ${profileUrl}`);

    try {
      if (this.useScraping) {
        console.log("🕷️ Using web scraping approach...");

        // Use web scraping approach with individual error handling
        let profile, tracks, playlists;

        try {
          console.log("📱 Fetching profile data...");
          profile = await scrapeProfile(username);
          console.log("✅ Profile data fetched:", profile);
        } catch (profileError) {
          console.error("❌ Profile scraping failed:", profileError);
          throw new Error(`Failed to fetch profile: ${profileError.message}`);
        }

        try {
          console.log("🎵 Fetching user tracks...");
          tracks = await scrapeUserTracks(username);
          console.log("✅ Tracks fetched:", tracks?.length || 0, "tracks");
        } catch (tracksError) {
          console.warn(
            "⚠️ Tracks scraping failed, using empty array:",
            tracksError
          );
          tracks = [];
        }

        try {
          console.log("📝 Fetching user playlists...");
          playlists = await scrapeUserPlaylists(username);
          console.log(
            "✅ Playlists fetched:",
            playlists?.length || 0,
            "playlists"
          );
        } catch (playlistsError) {
          console.warn(
            "⚠️ Playlists scraping failed, using empty array:",
            playlistsError
          );
          playlists = [];
        }

        const result = {
          profile,
          likes: tracks, // Public tracks (not actual likes, as those are private)
          playlists,
        };

        console.log("🎉 Profile fetch completed successfully:", result);
        return result;
      }

      throw new Error("API method not implemented");
    } catch (error) {
      console.error("💥 APIClient Error Details:", {
        message: error.message,
        stack: error.stack,
        username,
        profileUrl,
        useScraping: this.useScraping,
      });

      // Show a user-friendly error message
      if (error.message.includes("CORS") || error.message.includes("fetch")) {
        const corsError = new Error(
          "Unable to fetch profile due to browser security restrictions. This is likely due to CORS policy. Try using a different browser or disable CORS temporarily."
        );
        console.error("🚫 CORS Error:", corsError.message);
        throw corsError;
      }

      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch")
      ) {
        const networkError = new Error(
          "Network error occurred. Please check your internet connection and try again."
        );
        console.error("🌐 Network Error:", networkError.message);
        throw networkError;
      }

      // Re-throw the original error with additional context
      const contextualError = new Error(
        `Failed to load profile for ${username}: ${error.message}`
      );
      console.error(
        "🔄 Re-throwing error with context:",
        contextualError.message
      );
      throw contextualError;
    }
  }
}

export default SoundCloudAPIClient;
