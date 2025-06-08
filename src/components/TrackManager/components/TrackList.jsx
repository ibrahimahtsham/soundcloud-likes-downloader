import { useState } from "react";
import { Box, Typography, Paper, List, Collapse, Chip } from "@mui/material";
import TrackCard from "./TrackCard";
import TrackSelectionControls from "./TrackSelectionControls";
import useTrackSelection from "../hooks/useTrackSelection";

function TrackList({
  tracks,
  selectedTracks,
  onTrackSelection,
  onSelectAll,
  title,
}) {
  const [expanded, setExpanded] = useState(true);
  const { getSelectedCount, handleSelectAll } = useTrackSelection(
    tracks,
    selectedTracks,
    onSelectAll
  );

  if (!tracks || tracks.length === 0) return null;

  const selectedCount = getSelectedCount();

  return (
    <Paper elevation={2} sx={{ mt: 3 }}>
      <TrackSelectionControls
        title={title}
        totalCount={tracks.length}
        selectedCount={selectedCount}
        expanded={expanded}
        onToggleExpanded={() => setExpanded(!expanded)}
        onSelectAll={handleSelectAll}
      />

      <Collapse in={expanded}>
        <List>
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              selected={selectedTracks.has(track.id)}
              onSelectionChange={(selected) =>
                onTrackSelection(track.id, selected)
              }
            />
          ))}
        </List>
      </Collapse>
    </Paper>
  );
}

export default TrackList;
