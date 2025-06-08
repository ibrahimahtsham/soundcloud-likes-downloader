import { useState, useCallback } from "react";
import { soundCloudClient } from "../api/soundcloud/client.js";

export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracks = useCallback(async (username) => {
    if (!username) return [];

    setLoading(true);
    setError(null);

    try {
      console.log(`🎵 Loading tracks for: ${username}`);

      const tracksData = await soundCloudClient.fetchLikes(username);

      console.log(`✅ Tracks loaded: ${tracksData.length} tracks`);
      setTracks(tracksData);

      return tracksData;
    } catch (err) {
      const errorMessage = err.message || "Failed to load tracks";
      console.error(`❌ Tracks loading failed:`, err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearTracks = useCallback(() => {
    setTracks([]);
    setError(null);
  }, []);

  return {
    tracks,
    loading,
    error,
    fetchTracks,
    clearTracks,
  };
}
