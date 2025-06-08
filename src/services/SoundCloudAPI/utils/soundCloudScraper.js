/**
 * SoundCloud web scraper utility
 * Basic implementation for testing
 */

/**
 * Fetches and parses SoundCloud profile data
 * @param {string} username - SoundCloud username
 * @returns {Promise<Object>} Profile data
 */
export async function scrapeProfile(username) {
  console.log(`🕷️ scrapeProfile called for: ${username}`);

  try {
    // For now, return mock data to test the flow
    console.log(`⚠️ Using mock data for profile: ${username}`);

    const mockProfile = {
      id: Date.now(),
      username: username,
      display_name: username.charAt(0).toUpperCase() + username.slice(1),
      description: "This is a test profile from scraper",
      avatar_url: "",
      followers_count: 100,
      following_count: 50,
      track_count: 25,
      playlist_count: 5,
      permalink_url: `https://soundcloud.com/${username}`,
      created_at: new Date().toISOString(),
      verified: false,
      city: "Test City",
      country: "Test Country",
    };

    console.log(`✅ Mock profile created:`, mockProfile);
    return mockProfile;
  } catch (error) {
    console.error(`❌ scrapeProfile error:`, error);
    throw error;
  }
}

/**
 * Scrapes user's public tracks
 * @param {string} username - SoundCloud username
 * @returns {Promise<Array>} Array of tracks
 */
export async function scrapeUserTracks(username) {
  console.log(`🎵 scrapeUserTracks called for: ${username}`);

  try {
    // Mock tracks for testing
    const mockTracks = [
      {
        id: 1001,
        title: "Test Track 1",
        user: { id: 1, username: username, display_name: username },
        duration: 180000,
        created_at: new Date().toISOString(),
        genre: "Electronic",
        permalink_url: `https://soundcloud.com/${username}/test-track-1`,
        artwork_url: "",
        playback_count: 1000,
        likes_count: 50,
        comment_count: 10,
      },
      {
        id: 1002,
        title: "Test Track 2",
        user: { id: 1, username: username, display_name: username },
        duration: 240000,
        created_at: new Date().toISOString(),
        genre: "Hip Hop",
        permalink_url: `https://soundcloud.com/${username}/test-track-2`,
        artwork_url: "",
        playback_count: 2000,
        likes_count: 100,
        comment_count: 25,
      },
    ];

    console.log(`✅ Mock tracks created: ${mockTracks.length} tracks`);
    return mockTracks;
  } catch (error) {
    console.error(`❌ scrapeUserTracks error:`, error);
    throw error;
  }
}

/**
 * Scrapes user's public playlists
 * @param {string} username - SoundCloud username
 * @returns {Promise<Array>} Array of playlists
 */
export async function scrapeUserPlaylists(username) {
  console.log(`📝 scrapeUserPlaylists called for: ${username}`);

  try {
    // Mock playlists for testing
    const mockPlaylists = [
      {
        id: 3001,
        title: "My Favorites",
        description: "A collection of my favorite tracks",
        user: { id: 1, username: username, display_name: username },
        track_count: 10,
        duration: 2400000,
        created_at: new Date().toISOString(),
        permalink_url: `https://soundcloud.com/${username}/sets/favorites`,
        artwork_url: "",
        tracks: [],
        public: true,
      },
    ];

    console.log(`✅ Mock playlists created: ${mockPlaylists.length} playlists`);
    return mockPlaylists;
  } catch (error) {
    console.error(`❌ scrapeUserPlaylists error:`, error);
    throw error;
  }
}
