import { useState, useCallback } from "react";
import { soundCloudClient } from "../api/soundcloud/client.js";

export function usePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaylists = useCallback(async (username) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🚀 Loading playlists for: ${username}`);
      const playlistsData = await soundCloudClient.fetchPlaylists(username);
      console.log(`✅ Playlists loaded:`, playlistsData);

      setPlaylists(playlistsData);
      return playlistsData;
    } catch (err) {
      const errorMessage = err.message || "Failed to load playlists";
      console.error(`❌ Playlists loading failed:`, err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
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
