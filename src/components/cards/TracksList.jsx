import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Download,
  SelectAll,
  Clear,
  ArrowDropDown,
  Terminal,
  List,
  DataObject,
} from "@mui/icons-material";
import { TrackCard } from "./TrackCard.jsx";
import { useState } from "react";
import { downloadService } from "../../api/soundcloud/download.js";

export function TracksList({
  tracks,
  loading,
  error,
  selectedTracks = [],
  onSelectionChange,
  onSelectAll,
  onDeselectAll,
  onDownloadSingle,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDownloadMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadOption = (option) => {
    switch (option) {
      case "batch-script":
        downloadService.downloadBatchScript(selectedTracks);
        break;
      case "urls":
        downloadService.downloadUrlList(selectedTracks);
        break;
      case "json":
        downloadService.downloadTrackList(selectedTracks);
        break;
    }

    handleDownloadMenuClose();
  };

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

  const selectedCount = selectedTracks.length;
  const allSelected = selectedCount === tracks.length;
  const someSelected = selectedCount > 0 && selectedCount < tracks.length;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Selection Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(e) =>
                e.target.checked ? onSelectAll() : onDeselectAll()
              }
            />
          }
          label={`Select All (${selectedCount}/${tracks.length})`}
        />

        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<SelectAll />}
            onClick={onSelectAll}
            size="small"
          >
            Select All
          </Button>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={onDeselectAll}
            size="small"
            disabled={selectedCount === 0}
          >
            Clear All
          </Button>

          {/* Download Menu Button */}
          <Button
            variant="contained"
            startIcon={<Download />}
            endIcon={<ArrowDropDown />}
            onClick={handleDownloadMenuClick}
            disabled={selectedCount === 0}
            size="small"
          >
            Download Options ({selectedCount})
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleDownloadMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => handleDownloadOption("batch-script")}>
              <ListItemIcon>
                <Terminal fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Batch Script (.bat)"
                secondary="Download Windows batch file for yt-dlp"
              />
            </MenuItem>
            <MenuItem onClick={() => handleDownloadOption("urls")}>
              <ListItemIcon>
                <List fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="URL List"
                secondary="Download text file with all URLs"
              />
            </MenuItem>
            <MenuItem onClick={() => handleDownloadOption("json")}>
              <ListItemIcon>
                <DataObject fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Track Data (JSON)"
                secondary="Download detailed track information"
              />
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Tracks List */}
      {tracks.map((track, index) => (
        <TrackCard
          key={`${track.slug}-${index}`}
          track={track}
          selected={selectedTracks.some((t) => t.slug === track.slug)}
          onSelectionChange={onSelectionChange}
          onDownload={onDownloadSingle}
        />
      ))}
    </Box>
  );
}
