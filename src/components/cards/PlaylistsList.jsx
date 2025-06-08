import { Box, Typography, CircularProgress } from "@mui/material";
import { PlaylistCard } from "./PlaylistCard.jsx";

export function PlaylistsList({ playlists, loading, error }) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading playlists...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  if (playlists.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
        No playlists found
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {playlists.map((playlist, index) => (
        <PlaylistCard key={`${playlist.slug}-${index}`} playlist={playlist} />
      ))}
    </Box>
  );
}
