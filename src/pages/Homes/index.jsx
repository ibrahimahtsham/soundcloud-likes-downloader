import { Box } from "@mui/material";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import StatusBar from "./components/StatusBar";
import useAppState from "./hooks/useAppState";

function Home() {
  const {
    profile,
    likes,
    playlists,
    selectedTracks,
    loading,
    error,
    handleProfileLoad,
    handleTrackSelection,
    handleSelectAll,
    clearSelection,
  } = useAppState();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <MainContent
        profile={profile}
        likes={likes}
        playlists={playlists}
        selectedTracks={selectedTracks}
        loading={loading}
        error={error}
        onProfileLoad={handleProfileLoad}
        onTrackSelection={handleTrackSelection}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
      />
      <StatusBar
        selectedCount={selectedTracks.size}
        totalTracks={
          likes.length +
          playlists.reduce((acc, p) => acc + (p.tracks?.length || 0), 0)
        }
      />
    </Box>
  );
}

export default Home;
