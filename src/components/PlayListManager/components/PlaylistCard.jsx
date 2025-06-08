import {
  Box,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Typography,
  Avatar,
} from "@mui/material";
import { ExpandLess, PlaylistPlay, OpenInNew } from "@mui/icons-material";
import PlaylistTrackList from "./PlaylistTrackList";

function PlaylistCard({
  playlist,
  expanded,
  onToggleExpansion,
  selectedTracks,
  onTrackSelection,
}) {
  return (
    <Box>
      <ListItem divider>
        <Avatar
          src={playlist.artwork_url}
          variant="rounded"
          sx={{ width: 60, height: 60, mr: 2 }}
        />
        <ListItemText
          primary={playlist.title}
          secondary={
            <Box component="div">
              <Box
                component="span"
                sx={{ display: "block", color: "text.secondary" }}
              >
                {playlist.track_count} tracks • by {playlist.user?.username}
              </Box>
              {playlist.description && (
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  {playlist.description.substring(0, 100)}
                  {playlist.description.length > 100 && "..."}
                </Box>
              )}
            </Box>
          }
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => window.open(playlist.permalink_url, "_blank")}
          >
            <OpenInNew />
          </IconButton>
          <IconButton onClick={onToggleExpansion}>
            {expanded ? <ExpandLess /> : <PlaylistPlay />}
          </IconButton>
        </Box>
      </ListItem>

      <Collapse in={expanded}>
        <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
          <PlaylistTrackList
            tracks={playlist.tracks}
            selectedTracks={selectedTracks}
            onTrackSelection={onTrackSelection}
          />
        </Box>
      </Collapse>
    </Box>
  );
}

export default PlaylistCard;
