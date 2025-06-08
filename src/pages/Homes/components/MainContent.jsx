import { Box } from "@mui/material";
import ProfileLoader from "../../../components/ProfileLoader";
import TrackManager from "../../../components/TrackManager";
import PlaylistManager from "../../../components/PlaylistManager";
import DownloadManager from "../../../components/DownloadManager";

function MainContent({
  profile,
  likes,
  playlists,
  selectedTracks,
  loading,
  error,
  onProfileLoad,
  onTrackSelection,
  onSelectAll,
  onClearSelection,
}) {
  return (
    <Box sx={{ flex: 1 }}>
      <ProfileLoader
        onProfileLoad={onProfileLoad}
        loading={loading}
        error={error}
        profile={profile}
      />

      {profile && (
        <>
          <TrackManager
            tracks={likes}
            selectedTracks={selectedTracks}
            onTrackSelection={onTrackSelection}
            onSelectAll={onSelectAll}
            title="❤️ Liked Tracks"
          />

          <PlaylistManager
            playlists={playlists}
            selectedTracks={selectedTracks}
            onTrackSelection={onTrackSelection}
          />

          <DownloadManager
            selectedTracks={selectedTracks}
            allTracks={[...likes, ...playlists.flatMap((p) => p.tracks || [])]}
          />
        </>
      )}
    </Box>
  );
}

export default MainContent;
