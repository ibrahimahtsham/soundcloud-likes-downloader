import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { ProfileForm } from "../components/profile/ProfileForm.jsx";
import { ProfileCard } from "../components/profile/ProfileCard.jsx";
import { useProfile } from "../hooks/useProfile.js";
import { useTracks } from "../hooks/useTracks.js";
import { usePlaylists } from "../hooks/usePlaylists.js";
import { extractUsername } from "../utils/validators.js";

export function Home() {
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfile,
  } = useProfile();
  const { tracks, loading: tracksLoading, fetchTracks } = useTracks();
  const {
    playlists,
    loading: playlistsLoading,
    fetchPlaylists,
  } = usePlaylists();

  const handleProfileSubmit = async (profileUrl) => {
    const profileData = await fetchProfile(profileUrl);

    if (profileData) {
      const username = extractUsername(profileUrl);

      // Fetch tracks and playlists in parallel
      await Promise.all([fetchTracks(username), fetchPlaylists(username)]);
    }
  };

  const loading = profileLoading || tracksLoading || playlistsLoading;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          SoundCloud Profile Loader
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Load and explore SoundCloud profiles, tracks, and playlists
        </Typography>
      </Box>

      <ProfileForm
        onSubmit={handleProfileSubmit}
        loading={loading}
        error={profileError}
      />

      {profile && (
        <ProfileCard
          profile={profile}
          tracksCount={tracks.length}
          playlistsCount={playlists.length}
        />
      )}

      {/* TODO: Add TrackList and PlaylistList components here */}
      {tracks.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Liked Tracks ({tracks.length})
          </Typography>
          {/* TrackList component will go here */}
        </Box>
      )}

      {playlists.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Playlists ({playlists.length})
          </Typography>
          {/* PlaylistList component will go here */}
        </Box>
      )}
    </Container>
  );
}
