import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { CheckCircle, Error, Info } from "@mui/icons-material";
import {
  isValidSoundCloudUrl,
  extractUsernameFromUrl,
} from "../../../services/SoundCloudAPI/utils/apiUtils.js";

function URLValidator({ url }) {
  if (!url || !url.trim()) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <Info color="disabled" fontSize="small" />
        <Typography variant="body2" color="text.secondary">
          Enter a SoundCloud profile URL to validate
        </Typography>
      </Box>
    );
  }

  const isValid = isValidSoundCloudUrl(url);
  const username = extractUsernameFromUrl(url);

  if (isValid && username) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <CheckCircle color="success" fontSize="small" />
        <Typography variant="body2" color="success.main">
          Valid SoundCloud URL
        </Typography>
        <Chip
          label={`@${username}`}
          size="small"
          color="success"
          variant="outlined"
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
      <Error color="error" fontSize="small" />
      <Typography variant="body2" color="error.main">
        Invalid SoundCloud URL format
      </Typography>
    </Box>
  );
}

export default URLValidator;
