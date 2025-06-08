import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PlaylistCard from "./PlaylistCard";
import usePlaylistExpansion from "../hooks/usePlaylistExpansion";

function PlaylistList({ playlists, selectedTracks, onTrackSelection }) {
  const [expanded, setExpanded] = useState(false);
  const { expandedPlaylists, togglePlaylist } = usePlaylistExpansion();

  if (!playlists || playlists.length === 0) return null;

  return (
    <Paper elevation={2} sx={{ mt: 3 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h5">📋 Playlists ({playlists.length})</Typography>
        <IconButton>{expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>

      <Collapse in={expanded}>
        <List>
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              expanded={expandedPlaylists.has(playlist.id)}
              onToggleExpansion={() => togglePlaylist(playlist.id)}
              selectedTracks={selectedTracks}
              onTrackSelection={onTrackSelection}
            />
          ))}
        </List>
      </Collapse>
    </Paper>
  );
}

export default PlaylistList;
