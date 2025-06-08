import { useState, useCallback } from "react";
import { soundCloudClient } from "../api/soundcloud/client.js";
import { extractUsername } from "../utils/validators.js";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async (profileUrl) => {
    const username = extractUsername(profileUrl);

    if (!username) {
      setError("Invalid SoundCloud profile URL");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🚀 Loading profile for: ${username}`);

      const profileData = await soundCloudClient.fetchProfile(username);

      console.log(`✅ Profile loaded:`, profileData);
      setProfile(profileData);

      return profileData;
    } catch (err) {
      const errorMessage = err.message || "Failed to load profile";
      console.error(`❌ Profile loading failed:`, err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    setError(null);
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    clearProfile,
  };
}
