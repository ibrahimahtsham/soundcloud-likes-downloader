import { Box, Typography, Chip, IconButton, Checkbox } from "@mui/material";
import { OpenInNew, QueueMusic, AccessTime } from "@mui/icons-material";
import { formatDuration } from "../../utils/formatters.js";

export function PlaylistCard({ playlist, selected, onSelectionChange }) {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: selected ? "primary.main" : "divider",
        borderRadius: 1,
        mb: 1,
        backgroundColor: selected ? "action.selected" : "background.paper",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Checkbox
          checked={selected}
          onChange={(e) => onSelectionChange(playlist, e.target.checked)}
          size="small"
        />
        <QueueMusic />
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 500 }}>
          {playlist.name}
        </Typography>
        <IconButton
          size="small"
          onClick={() => window.open(playlist.url, "_blank")}
          sx={{ ml: 1 }}
        >
          <OpenInNew fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          by{" "}
          {playlist.authorUrl ? (
            <a
              href={playlist.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              {playlist.author}
            </a>
          ) : (
            playlist.author
          )}
        </Typography>
        <Chip
          label="Playlist"
          size="small"
          variant="outlined"
          color="secondary"
        />
        {playlist.duration > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTime fontSize="small" />
            <Typography variant="caption" color="text.secondary">
              {formatDuration(playlist.duration * 1000)}
            </Typography>
          </Box>
        )}
      </Box>

      {playlist.publishedAt && (
        <Typography variant="caption" color="text.secondary">
          Published on {new Date(playlist.publishedAt).toLocaleDateString()}
        </Typography>
      )}
    </Box>
  );
}
