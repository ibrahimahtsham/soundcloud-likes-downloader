import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";
import {
  QueueMusic,
  Remove,
  Download as DownloadIcon,
  CheckCircle,
  Error as ErrorIcon,
} from "@mui/icons-material";

function DownloadQueue({
  queue = [],
  progress,
  onRemoveTrack,
  downloading = false,
}) {
  if (queue.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <QueueMusic sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No tracks in download queue
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select tracks to add them to the download queue
        </Typography>
      </Paper>
    );
  }

  const getTrackStatus = (track) => {
    if (!progress || !downloading) return "pending";

    if (progress.current?.id === track.id) return "downloading";

    const currentIndex = queue.findIndex((t) => t.id === progress.current?.id);
    const trackIndex = queue.findIndex((t) => t.id === track.id);

    if (trackIndex < currentIndex) return "completed";
    if (trackIndex === currentIndex) return "downloading";
    return "pending";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="success" />;
      case "downloading":
        return <DownloadIcon color="primary" />;
      case "error":
        return <ErrorIcon color="error" />;
      default:
        return <QueueMusic color="disabled" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "downloading":
        return "primary";
      case "error":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Download Queue ({queue.length} tracks)
      </Typography>

      <List>
        {queue.map((track, index) => {
          const status = getTrackStatus(track);

          return (
            <ListItem key={track.id} divider={index < queue.length - 1}>
              <ListItemIcon>{getStatusIcon(status)}</ListItemIcon>

              <ListItemText
                primary={track.title}
                secondary={`by ${track.user?.username || "Unknown Artist"}`}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={status}
                  size="small"
                  color={getStatusColor(status)}
                  variant="outlined"
                />

                {!downloading && onRemoveTrack && (
                  <IconButton
                    size="small"
                    onClick={() => onRemoveTrack(track.id)}
                    disabled={downloading}
                  >
                    <Remove />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          );
        })}
      </List>

      {downloading && progress && (
        <Box sx={{ mt: 2, p: 1, bgcolor: "action.hover", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Progress: {progress.completed} / {progress.total} completed
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default DownloadQueue;
