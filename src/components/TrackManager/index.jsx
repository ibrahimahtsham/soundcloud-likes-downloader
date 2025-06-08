import TrackList from "./components/TrackList";

function TrackManager({
  tracks,
  selectedTracks,
  onTrackSelection,
  onSelectAll,
  title,
}) {
  return (
    <TrackList
      tracks={tracks}
      selectedTracks={selectedTracks}
      onTrackSelection={onTrackSelection}
      onSelectAll={onSelectAll}
      title={title}
    />
  );
}

export default TrackManager;
