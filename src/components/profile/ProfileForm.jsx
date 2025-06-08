import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Search as SearchIcon, BugReport } from "@mui/icons-material";
import { isValidSoundCloudUrl } from "../../utils/validators.js";
import { httpClient } from "../../api/soundcloud/http.js";

export function ProfileForm({ onSubmit, loading, error }) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");
  const [debugMode, setDebugMode] = useState(false);

  // Toggle debug mode
  const handleDebugToggle = (event) => {
    const enabled = event.target.checked;
    setDebugMode(enabled);
    httpClient.setDebug(enabled);

    if (enabled) {
      console.log(
        "🐛 Debug mode enabled - Raw responses will be logged to console"
      );
    } else {
      console.log("🔇 Debug mode disabled");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setValidationError("Please enter a SoundCloud profile URL");
      return;
    }

    if (!isValidSoundCloudUrl(url)) {
      setValidationError("Please enter a valid SoundCloud profile URL");
      return;
    }

    setValidationError("");
    onSubmit(url);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setValidationError("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6">Load SoundCloud Profile</Typography>

        <FormControlLabel
          control={
            <Switch
              checked={debugMode}
              onChange={handleDebugToggle}
              color="secondary"
              size="small"
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <BugReport fontSize="small" />
              <Typography variant="caption">Debug</Typography>
            </Box>
          }
        />
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="https://soundcloud.com/username"
            value={url}
            onChange={handleUrlChange}
            disabled={loading}
            error={!!validationError}
            helperText={
              validationError ||
              "Example: https://soundcloud.com/ch1ck3n_nu993t"
            }
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !url.trim()}
            startIcon={
              loading ? <CircularProgress size={20} /> : <SearchIcon />
            }
            sx={{ minWidth: 120 }}
          >
            {loading ? "Loading..." : "Load"}
          </Button>
        </Box>
      </Box>

      {debugMode && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Debug mode is enabled. Raw HTML responses will be logged to the
          browser console.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
}
