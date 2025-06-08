import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from "@mui/material";
import {
  CheckCircle,
  Error as ErrorIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

function DownloadProgress({
  open,
  onClose,
  progress,
  errors = [],
  downloading = false,
  onCancel,
}) {
  const hasErrors = errors.length > 0;
  const isComplete = !downloading && progress.completed > 0;

  return (
    <Dialog
      open={open}
      onClose={!downloading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {downloading
          ? "Downloading Tracks"
          : isComplete
          ? "Download Complete"
          : "Download Status"}
      </DialogTitle>

      <DialogContent>
        {downloading && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              {progress.current
                ? `Current: ${progress.current.title}`
                : "Preparing download..."}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress.percentage}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {progress.completed} of {progress.total} tracks (
              {Math.round(progress.percentage)}%)
            </Typography>
          </Box>
        )}

        {isComplete && !hasErrors && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Successfully downloaded {progress.completed} track
            {progress.completed !== 1 ? "s" : ""}!
          </Alert>
        )}

        {hasErrors && (
          <Box sx={{ mb: 2 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.length} download{errors.length !== 1 ? "s" : ""} failed
            </Alert>
            <List dense>
              {errors.map((error, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ErrorIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={error.track?.title || "Unknown track"}
                    secondary={error.error}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {progress.completed > 0 && !downloading && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Download Summary:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={`${progress.completed - errors.length} successful`}
                />
              </ListItem>
              {errors.length > 0 && (
                <ListItem>
                  <ListItemIcon>
                    <ErrorIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={`${errors.length} failed`} />
                </ListItem>
              )}
            </List>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {downloading && onCancel && (
          <Button onClick={onCancel} color="error">
            Cancel
          </Button>
        )}
        {!downloading && (
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DownloadProgress;
