import { useState } from "react";

function usePlaylistExpansion() {
  const [expandedPlaylists, setExpandedPlaylists] = useState(new Set());

  const togglePlaylist = (playlistId) => {
    const newExpanded = new Set(expandedPlaylists);
    if (newExpanded.has(playlistId)) {
      newExpanded.delete(playlistId);
    } else {
      newExpanded.add(playlistId);
    }
    setExpandedPlaylists(newExpanded);
  };

  return {
    expandedPlaylists,
    togglePlaylist,
  };
}

export default usePlaylistExpansion;
