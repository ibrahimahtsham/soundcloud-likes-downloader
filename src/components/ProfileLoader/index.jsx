import React from "react";
import ProfileInput from "./components/ProfileInput.jsx";
import ProfileDisplay from "./components/ProfileDisplay.jsx";
import URLValidator from "./components/URLValidator.jsx";
import { useProfileLoader } from "./hooks/useProfileLoader.js";

function ProfileLoader({ onProfileLoad }) {
  return <ProfileInput onProfileLoad={onProfileLoad} />;
}

// Export individual components and hooks for direct use
export { ProfileInput, ProfileDisplay, URLValidator, useProfileLoader };

// Default export for the main component
export default ProfileLoader;
