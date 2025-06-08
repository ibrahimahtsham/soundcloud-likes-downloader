import { useState, useCallback } from "react";
import { soundCloudClient } from "../api/soundcloud/client.js";

export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracks = useCallback(async (username) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`🚀 Loading likes for: ${username}`);
      const likesData = await soundCloudClient.fetchLikes(username);
      console.log(`✅ Likes loaded:`, likesData);

      setTracks(likesData);
      return likesData;
    } catch (err) {
      const errorMessage = err.message || "Failed to load likes";
      console.error(`❌ Likes loading failed:`, err);
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
