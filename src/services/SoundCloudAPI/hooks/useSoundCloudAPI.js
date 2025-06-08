import { useState, useCallback } from "react";
import { APIClient } from "../index.js";

export function useSoundCloudAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const apiClient = new APIClient();

  const fetchProfile = useCallback(async (profileUrl) => {
    setLoading(true);
    setError(null);

    try {
      const profileData = await apiClient.fetchProfile(profileUrl);
      setData(profileData);
      return profileData;
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    fetchProfile,
    clearError,
    clearData,
  };
}
