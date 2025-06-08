import { Paper, Box, Typography, Chip } from "@mui/material";
import { CheckCircle, MusicNote } from "@mui/icons-material";

function StatusBar({ selectedCount, totalTracks }) {
  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Chip
        icon={<MusicNote />}
        label={`${totalTracks} Total Tracks`}
        variant="outlined"
      />
      <Chip
        icon={<CheckCircle />}
        label={`${selectedCount} Selected`}
        color={selectedCount > 0 ? "primary" : "default"}
        variant={selectedCount > 0 ? "filled" : "outlined"}
      />
    </Paper>
  );
}

export default StatusBar;
