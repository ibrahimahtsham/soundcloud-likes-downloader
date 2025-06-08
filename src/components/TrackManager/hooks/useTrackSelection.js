function useTrackSelection(tracks, selectedTracks, onSelectAll) {
  const getSelectedCount = () => {
    return tracks.filter((track) => selectedTracks.has(track.id)).length;
  };

  const handleSelectAll = () => {
    const allSelected = getSelectedCount() === tracks.length;
    onSelectAll(tracks, !allSelected);
  };

  return {
    getSelectedCount,
    handleSelectAll,
  };
}

export default useTrackSelection;
