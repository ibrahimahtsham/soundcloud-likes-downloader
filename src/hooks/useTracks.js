import { useState, useCallback } from "react";

export function useTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracks = useCallback(async () => {
    // This functionality is not available yet
    console.log("🚫 Track fetching not implemented");
    setTracks([]);
    return [];
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
