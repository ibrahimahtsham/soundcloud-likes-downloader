import { useState, useCallback } from "react";
import { useSoundCloudAPI } from "../../../services/SoundCloudAPI/hooks/useSoundCloudAPI.js";
import { isValidSoundCloudUrl } from "../../../services/SoundCloudAPI/utils/apiUtils.js";

export function useProfileLoader() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { fetchProfile } = useSoundCloudAPI();

  const loadProfile = useCallback(
    async (profileUrl) => {
      console.log(
        "🚀 useProfileLoader: Starting profile load for:",
        profileUrl
      );

      if (!profileUrl || !isValidSoundCloudUrl(profileUrl)) {
        const validationError = "Please enter a valid SoundCloud profile URL";
        console.error("❌ Validation Error:", validationError);
        setError(validationError);
        return null;
      }

      setLoading(true);
      setError(null);
      console.log("⏳ Setting loading state to true");

      try {
        console.log("📞 Calling fetchProfile...");
        const profileData = await fetchProfile(profileUrl);
        console.log("✅ Profile data received:", profileData);

        setProfile(profileData);
        console.log("💾 Profile data saved to state");
        return profileData;
      } catch (err) {
        const errorMessage = err.message || "Failed to load profile";
        console.error("💥 useProfileLoader Error:", {
          originalError: err,
          message: errorMessage,
          stack: err.stack,
          profileUrl,
        });

        setError(errorMessage);
        return null;
      } finally {
        console.log("🏁 Setting loading state to false");
        setLoading(false);
      }
    },
    [fetchProfile]
  );

  const clearProfile = useCallback(() => {
    console.log("🧹 Clearing profile data");
    setProfile(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    console.log("🧹 Clearing error");
    setError(null);
  }, []);

  return {
    profile,
    loading,
    error,
    loadProfile,
    clearProfile,
    clearError,
  };
}

// Export as default for backward compatibility
export default useProfileLoader;
