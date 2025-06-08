import { Box, Typography, Chip, IconButton } from "@mui/material";
import { OpenInNew, MusicNote, QueueMusic } from "@mui/icons-material";

export function TrackCard({ track }) {
  const isPlaylist = track.type === "playlist";

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        mb: 1,
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        {isPlaylist ? <QueueMusic /> : <MusicNote />}
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 500 }}>
          {track.name}
        </Typography>
        <IconButton
          size="small"
          onClick={() => window.open(track.url, "_blank")}
          sx={{ ml: "auto" }}
        >
          <OpenInNew fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          by{" "}
          {track.authorUrl ? (
            <a
              href={track.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              {track.author}
            </a>
          ) : (
            track.author
          )}
        </Typography>
        <Chip
          label={track.type}
          size="small"
          variant="outlined"
          color={isPlaylist ? "secondary" : "primary"}
        />
      </Box>

      {track.publishedAt && (
        <Typography variant="caption" color="text.secondary">
          Published on {new Date(track.publishedAt).toLocaleDateString()}
        </Typography>
      )}
    </Box>
  );
}
