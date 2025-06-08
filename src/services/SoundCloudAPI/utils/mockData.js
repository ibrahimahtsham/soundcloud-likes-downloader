/**
 * Mock SoundCloud profile data for development
 */
export const mockProfile = {
  id: 12345,
  username: "test_user",
  display_name: "Test User",
  description: "This is a mock profile for development purposes",
  avatar_url: "https://via.placeholder.com/150x150/ff5722/white?text=SC",
  followers_count: 1234,
  following_count: 567,
  track_count: 45,
  playlist_count: 8,
  permalink_url: "https://soundcloud.com/test_user",
  created_at: "2023-01-01T00:00:00Z",
};

/**
 * Mock liked tracks data
 */
export const mockLikedTracks = [
  {
    id: 1001,
    title: "Amazing Electronic Track",
    user: {
      id: 2001,
      username: "electronic_artist",
      display_name: "Electronic Artist",
    },
    duration: 240000, // 4 minutes in milliseconds
    created_at: "2024-01-15T10:30:00Z",
    genre: "Electronic",
    permalink_url:
      "https://soundcloud.com/electronic_artist/amazing-electronic-track",
    artwork_url: "https://via.placeholder.com/300x300/ff9800/white?text=ET",
    playback_count: 15420,
    likes_count: 892,
    comment_count: 45,
  },
  {
    id: 1002,
    title: "Chill Hip Hop Beats",
    user: {
      id: 2002,
      username: "hiphop_producer",
      display_name: "Hip Hop Producer",
    },
    duration: 180000, // 3 minutes
    created_at: "2024-01-10T14:20:00Z",
    genre: "Hip Hop",
    permalink_url: "https://soundcloud.com/hiphop_producer/chill-hip-hop-beats",
    artwork_url: "https://via.placeholder.com/300x300/4caf50/white?text=HH",
    playback_count: 8750,
    likes_count: 234,
    comment_count: 18,
  },
  {
    id: 1003,
    title: "Indie Rock Anthem",
    user: {
      id: 2003,
      username: "indie_band",
      display_name: "Indie Band",
    },
    duration: 300000, // 5 minutes
    created_at: "2024-01-05T09:15:00Z",
    genre: "Rock",
    permalink_url: "https://soundcloud.com/indie_band/indie-rock-anthem",
    artwork_url: "https://via.placeholder.com/300x300/e91e63/white?text=IR",
    playback_count: 12340,
    likes_count: 456,
    comment_count: 67,
  },
];

/**
 * Mock playlists data
 */
export const mockPlaylists = [
  {
    id: 3001,
    title: "My Favorite Electronic",
    description: "A collection of my favorite electronic music tracks",
    user: {
      id: 12345,
      username: "test_user",
      display_name: "Test User",
    },
    track_count: 15,
    duration: 3600000, // 1 hour
    created_at: "2024-01-01T12:00:00Z",
    permalink_url:
      "https://soundcloud.com/test_user/sets/my-favorite-electronic",
    artwork_url: "https://via.placeholder.com/300x300/2196f3/white?text=PL1",
    tracks: [
      {
        id: 4001,
        title: "Playlist Track 1",
        user: {
          id: 2004,
          username: "artist_1",
          display_name: "Artist 1",
        },
        duration: 220000,
        created_at: "2024-01-01T08:00:00Z",
        genre: "Electronic",
        permalink_url: "https://soundcloud.com/artist_1/playlist-track-1",
        artwork_url: "https://via.placeholder.com/300x300/9c27b0/white?text=T1",
      },
      {
        id: 4002,
        title: "Playlist Track 2",
        user: {
          id: 2005,
          username: "artist_2",
          display_name: "Artist 2",
        },
        duration: 195000,
        created_at: "2024-01-02T10:30:00Z",
        genre: "Ambient",
        permalink_url: "https://soundcloud.com/artist_2/playlist-track-2",
        artwork_url: "https://via.placeholder.com/300x300/607d8b/white?text=T2",
      },
    ],
  },
  {
    id: 3002,
    title: "Workout Mix",
    description: "High energy tracks for workout sessions",
    user: {
      id: 12345,
      username: "test_user",
      display_name: "Test User",
    },
    track_count: 20,
    duration: 4800000, // 1.33 hours
    created_at: "2023-12-15T18:30:00Z",
    permalink_url: "https://soundcloud.com/test_user/sets/workout-mix",
    artwork_url: "https://via.placeholder.com/300x300/ff5722/white?text=WM",
    tracks: [
      {
        id: 4003,
        title: "High Energy Track",
        user: {
          id: 2006,
          username: "fitness_beats",
          display_name: "Fitness Beats",
        },
        duration: 240000,
        created_at: "2023-12-10T15:20:00Z",
        genre: "EDM",
        permalink_url: "https://soundcloud.com/fitness_beats/high-energy-track",
        artwork_url: "https://via.placeholder.com/300x300/f44336/white?text=HE",
      },
    ],
  },
];

/**
 * Returns mock profile data with likes and playlists
 */
export function getMockProfileData(username) {
  return {
    profile: {
      ...mockProfile,
      username: username || mockProfile.username,
    },
    likes: mockLikedTracks,
    playlists: mockPlaylists,
  };
}
