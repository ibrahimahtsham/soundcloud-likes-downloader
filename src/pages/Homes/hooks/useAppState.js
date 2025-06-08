import { useState } from "react";

function useAppState() {
  const [profile, setProfile] = useState(null);
  const [likes, setLikes] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfileLoad = (profileData) => {
    setProfile(profileData);
    setLikes(profileData.likes || []);
    setPlaylists(profileData.playlists || []);
    setSelectedTracks(new Set());
    setError("");
  };

  const handleTrackSelection = (trackId, selected) => {
    const newSelected = new Set(selectedTracks);
    if (selected) {
      newSelected.add(trackId);
    } else {
      newSelected.delete(trackId);
    }
    setSelectedTracks(newSelected);
  };

  const handleSelectAll = (tracks, selectAll) => {
    const newSelected = new Set(selectedTracks);
    tracks.forEach((track) => {
      if (selectAll) {
        newSelected.add(track.id);
      } else {
        newSelected.delete(track.id);
      }
    });
    setSelectedTracks(newSelected);
  };

  const clearSelection = () => {
    setSelectedTracks(new Set());
  };

  return {
    profile,
    likes,
    playlists,
    selectedTracks,
    loading,
    error,
    setLoading,
    setError,
    handleProfileLoad,
    handleTrackSelection,
    handleSelectAll,
    clearSelection,
  };
}

export default useAppState;
