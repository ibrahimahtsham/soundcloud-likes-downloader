import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Box,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { PlayArrow, OpenInNew } from "@mui/icons-material";
import { formatDuration, formatDate } from "../../../utils/formatters";

function TrackCard({ track, selected, onSelectionChange }) {
  return (
    <ListItem divider sx={{ py: 2 }}>
      <Checkbox
        checked={selected}
        onChange={(e) => onSelectionChange(e.target.checked)}
        sx={{ mr: 2 }}
      />

      <Avatar
        src={track.artwork_url}
        variant="rounded"
        sx={{ width: 60, height: 60, mr: 2 }}
      />

      <ListItemText
        primary={track.title}
        secondary={
          <Box component="div">
            <Box
              component="span"
              sx={{ display: "block", color: "text.secondary" }}
            >
              by {track.user?.username} • {formatDuration(track.duration)} •{" "}
              {formatDate(track.created_at)}
            </Box>
            <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap" }}>
              {track.genre && (
                <Chip label={track.genre} size="small" variant="outlined" />
              )}
              {track.tag_list &&
                track.tag_list
                  .split(" ")
                  .slice(0, 3)
                  .map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
            </Box>
          </Box>
        }
      />

      <ListItemSecondaryAction>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => window.open(track.permalink_url, "_blank")}
            title="Open in SoundCloud"
          >
            <OpenInNew />
          </IconButton>
          <IconButton size="small" title="Preview">
            <PlayArrow />
          </IconButton>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TrackCard;
