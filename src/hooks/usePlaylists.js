import { useState, useCallback } from "react";

export function usePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaylists = useCallback(async () => {
    // This functionality is not available yet
    console.log("🚫 Playlist fetching not implemented");
    setPlaylists([]);
    return [];
  }, []);

  const clearPlaylists = useCallback(() => {
    setPlaylists([]);
    setError(null);
  }, []);

  return {
    playlists,
    loading,
    error,
    fetchPlaylists,
    clearPlaylists,
  };
}
