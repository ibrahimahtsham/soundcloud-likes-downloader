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
import { PlaylistCard } from "./PlaylistCard.jsx";
import { useState } from "react";
import { downloadService } from "../../api/soundcloud/download.js";

export function PlaylistsList({
  playlists,
  loading,
  error,
  selectedPlaylists = [],
  onSelectionChange,
  onSelectAll,
  onDeselectAll,
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
        downloadService.downloadBatchScript(selectedPlaylists);
        break;
      case "urls":
        downloadService.downloadUrlList(selectedPlaylists);
        break;
      case "json":
        downloadService.downloadTrackList(selectedPlaylists);
        break;
    }

    handleDownloadMenuClose();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading playlists...</Typography>
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

  if (playlists.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2, textAlign: "center" }}>
        No playlists found
      </Typography>
    );
  }

  const selectedCount = selectedPlaylists.length;
  const allSelected = selectedCount === playlists.length;
  const someSelected = selectedCount > 0 && selectedCount < playlists.length;

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
          label={`Select All (${selectedCount}/${playlists.length})`}
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

      {/* Playlists List */}
      {playlists.map((playlist, index) => (
        <PlaylistCard
          key={`${playlist.slug}-${index}`}
          playlist={playlist}
          selected={selectedPlaylists.some((p) => p.slug === playlist.slug)}
          onSelectionChange={onSelectionChange}
        />
      ))}
    </Box>
  );
}
