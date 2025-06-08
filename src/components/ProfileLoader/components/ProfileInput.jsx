import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useProfileLoader } from "../hooks/useProfileLoader.js";
import URLValidator from "./URLValidator.jsx";

function ProfileInput({ onProfileLoad }) {
  const [url, setUrl] = useState("");
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const { loading, error, loadProfile } = useProfileLoader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    console.log("🎯 ProfileInput: Form submitted with URL:", url);

    try {
      const profileData = await loadProfile(url);
      console.log("📤 ProfileInput: Profile data received:", profileData);

      if (profileData && onProfileLoad) {
        console.log("📨 ProfileInput: Calling onProfileLoad callback");
        onProfileLoad(profileData);
      }
    } catch (err) {
      console.error("💥 ProfileInput: Error in handleSubmit:", err);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    console.log("📝 URL changed to:", e.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Enter SoundCloud Profile URL
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="https://soundcloud.com/username"
            value={url}
            onChange={handleUrlChange}
            disabled={loading}
            error={!!error}
            helperText="Example: https://soundcloud.com/ch1ck3n_nu993t"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={
              loading ? <CircularProgress size={20} /> : <SearchIcon />
            }
            disabled={loading || !url.trim()}
            sx={{ minWidth: 120 }}
          >
            {loading ? "Loading..." : "Load Profile"}
          </Button>
        </Box>

        <URLValidator url={url} />
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              endIcon={showErrorDetails ? <ExpandLess /> : <ExpandMore />}
            >
              Details
            </Button>
          }
        >
          <Typography variant="body2" component="div">
            {error}
          </Typography>

          <Collapse in={showErrorDetails}>
            <Box sx={{ mt: 1, p: 1, bgcolor: "action.hover", borderRadius: 1 }}>
              <Typography variant="caption" component="div">
                <strong>Troubleshooting tips:</strong>
              </Typography>
              <Typography
                variant="caption"
                component="ul"
                sx={{ mt: 1, pl: 2 }}
              >
                <li>
                  Make sure the SoundCloud profile URL is correct and public
                </li>
                <li>Check your internet connection</li>
                <li>Try refreshing the page</li>
                <li>
                  If the issue persists, it might be due to browser security
                  restrictions (CORS)
                </li>
              </Typography>
              <Typography variant="caption" component="div" sx={{ mt: 1 }}>
                <strong>URL entered:</strong> {url}
              </Typography>
            </Box>
          </Collapse>
        </Alert>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            p: 2,
            bgcolor: "action.hover",
            borderRadius: 1,
          }}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">
            Fetching profile data... This may take a few seconds.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default ProfileInput;
