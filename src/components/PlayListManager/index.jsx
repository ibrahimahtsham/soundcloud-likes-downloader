import PlaylistList from "./components/PlaylistList";

function PlaylistManager({ playlists, selectedTracks, onTrackSelection }) {
  return (
    <PlaylistList
      playlists={playlists}
      selectedTracks={selectedTracks}
      onTrackSelection={onTrackSelection}
    />
  );
}

export default PlaylistManager;
