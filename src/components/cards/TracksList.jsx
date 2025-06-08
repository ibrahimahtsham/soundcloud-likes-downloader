import { Box, Typography, CircularProgress } from "@mui/material";
import { TrackCard } from "./TrackCard.jsx";

export function TracksList({ tracks, loading, error }) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading likes...</Typography>
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

  if (tracks.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
        No likes found
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {tracks.map((track, index) => (
        <TrackCard key={`${track.slug}-${index}`} track={track} />
      ))}
    </Box>
  );
}
