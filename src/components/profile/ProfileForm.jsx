import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { isValidSoundCloudUrl } from "../../utils/validators.js";

export function ProfileForm({ onSubmit, loading, error }) {
  const [url, setUrl] = useState("");
  const [validationError, setValidationError] = useState("");

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
      <Typography variant="h6" gutterBottom>
        Load SoundCloud Profile
      </Typography>

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

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
}
