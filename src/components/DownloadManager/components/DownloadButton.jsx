import React from "react";
import { Button, CircularProgress, Box, Typography, Chip } from "@mui/material";
import {
  Download as DownloadIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useDownloadManager } from "../hooks/useDownloadManager.js";

function DownloadButton({ selectedTracks = new Set(), allTracks = [] }) {
  const {
    downloading,
    progress,
    errors,
    startDownload,
    cancelDownload,
    clearErrors,
  } = useDownloadManager();

  // Get tracks to download based on selection - fix for Set vs Array
  const tracksToDownload = allTracks.filter((track) => {
    // Handle both Set and Array cases
    if (selectedTracks instanceof Set) {
      return selectedTracks.has(track.id);
    }
    // Fallback for array
    return selectedTracks.includes && selectedTracks.includes(track.id);
  });

  const handleDownload = () => {
    if (tracksToDownload.length === 0) {
      console.warn("No tracks selected for download");
      return;
    }

    clearErrors();
    startDownload(tracksToDownload);
  };

  const handleCancel = () => {
    cancelDownload();
  };

  // Don't render if no tracks are available
  if (!allTracks || allTracks.length === 0) {
    return null;
  }

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        {/* Error indicators */}
        {errors.length > 0 && (
          <Chip
            label={`${errors.length} error(s)`}
            color="error"
            size="small"
            onDelete={clearErrors}
          />
        )}

        {/* Progress indicator */}
        {downloading && progress.total > 0 && (
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 1,
              borderRadius: 1,
              boxShadow: 2,
              minWidth: 200,
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              {progress.current
                ? `Downloading: ${progress.current.title}`
                : "Preparing download..."}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {progress.completed} / {progress.total} (
              {Math.round(progress.percentage)}%)
            </Typography>
          </Box>
        )}

        {/* Main download button */}
        <Button
          variant="contained"
          size="large"
          startIcon={
            downloading ? <CircularProgress size={20} /> : <DownloadIcon />
          }
          onClick={downloading ? handleCancel : handleDownload}
          disabled={!downloading && tracksToDownload.length === 0}
          color={downloading ? "error" : "primary"}
          sx={{
            minWidth: 200,
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          {downloading
            ? "Cancel Download"
            : `Download ${tracksToDownload.length} track${
                tracksToDownload.length !== 1 ? "s" : ""
              }`}
        </Button>
      </Box>
    </Box>
  );
}

export default DownloadButton;
