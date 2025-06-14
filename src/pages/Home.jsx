import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import { ProfileForm } from "../components/profile/ProfileForm.jsx";
import { ProfileCard } from "../components/profile/ProfileCard.jsx";
import { TracksList } from "../components/cards/TracksList.jsx";
import { PlaylistsList } from "../components/cards/PlaylistsList.jsx";
import { ThemeToggle } from "../components/ThemeToggle.jsx";
import { useProfile } from "../hooks/useProfile.js";
import { usePlaylists } from "../hooks/usePlaylists.js";
import { useTracks } from "../hooks/useTracks.js";
import { useDownload } from "../hooks/useDownload.js";
import { useState } from "react";
import { extractUsername } from "../utils/validators.js";

export function Home() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfile,
  } = useProfile();

  const {
    playlists,
    loading: playlistsLoading,
    error: playlistsError,
    fetchPlaylists,
  } = usePlaylists();

  const {
    tracks,
    loading: tracksLoading,
    error: tracksError,
    fetchTracks,
  } = useTracks();

  const { downloading, downloadError, downloadMultiple } = useDownload();

  const handleProfileSubmit = async (profileUrl) => {
    const username = extractUsername(profileUrl);
    if (!username) return;

    // Clear previous selections
    setSelectedTracks([]);
    setSelectedPlaylists([]);

    await fetchProfile(profileUrl);

    // Fetch playlists and likes after profile is loaded
    await Promise.all([fetchPlaylists(username), fetchTracks(username)]);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Clear selections when switching tabs
    setSelectedTracks([]);
    setSelectedPlaylists([]);
  };

  // Track selection handlers
  const handleTrackSelection = (track, isSelected) => {
    if (isSelected) {
      setSelectedTracks((prev) => [...prev, track]);
    } else {
      setSelectedTracks((prev) => prev.filter((t) => t.slug !== track.slug));
    }
  };

  const handleSelectAllTracks = () => {
    setSelectedTracks([...tracks]);
  };

  const handleDeselectAllTracks = () => {
    setSelectedTracks([]);
  };

  // Playlist selection handlers
  const handlePlaylistSelection = (playlist, isSelected) => {
    if (isSelected) {
      setSelectedPlaylists((prev) => [...prev, playlist]);
    } else {
      setSelectedPlaylists((prev) =>
        prev.filter((p) => p.slug !== playlist.slug)
      );
    }
  };

  const handleSelectAllPlaylists = () => {
    setSelectedPlaylists([...playlists]);
  };

  const handleDeselectAllPlaylists = () => {
    setSelectedPlaylists([]);
  };

  // Download handlers
  const handleDownloadSelectedTracks = () => {
    if (selectedTracks.length > 0) {
      downloadMultiple(selectedTracks);
    }
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SoundCloud Profile Loader
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            SoundCloud Profile Loader
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Load and explore SoundCloud profiles, playlists, and likes
          </Typography>
        </Box>

        <ProfileForm
          onSubmit={handleProfileSubmit}
          loading={profileLoading}
          error={profileError}
        />

        {profile && <ProfileCard profile={profile} />}

        {/* Download Status */}
        {downloading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Download in progress... Please wait.
          </Alert>
        )}

        {downloadError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {downloadError}
          </Alert>
        )}

        {profile && (
          <Box sx={{ mt: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label={`Likes (${tracks.length})`} />
              <Tab label={`Playlists (${playlists.length})`} />
            </Tabs>

            {tabValue === 0 && (
              <TracksList
                tracks={tracks}
                loading={tracksLoading}
                error={tracksError}
                selectedTracks={selectedTracks}
                onSelectionChange={handleTrackSelection}
                onSelectAll={handleSelectAllTracks}
                onDeselectAll={handleDeselectAllTracks}
                onDownloadSelected={handleDownloadSelectedTracks}
              />
            )}

            {tabValue === 1 && (
              <PlaylistsList
                playlists={playlists}
                loading={playlistsLoading}
                error={playlistsError}
                selectedPlaylists={selectedPlaylists}
                onSelectionChange={handlePlaylistSelection}
                onSelectAll={handleSelectAllPlaylists}
                onDeselectAll={handleDeselectAllPlaylists}
              />
            )}
          </Box>
        )}
      </Container>
    </>
  );
}
