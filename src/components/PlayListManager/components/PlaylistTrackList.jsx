import { List } from "@mui/material";
import TrackCard from "../../TrackManager/components/TrackCard";

function PlaylistTrackList({ tracks, selectedTracks, onTrackSelection }) {
  if (!tracks || tracks.length === 0) return null;

  return (
    <List dense>
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          selected={selectedTracks.has(track.id)}
          onSelectionChange={(selected) => onTrackSelection(track.id, selected)}
        />
      ))}
    </List>
  );
}

export default PlaylistTrackList;
