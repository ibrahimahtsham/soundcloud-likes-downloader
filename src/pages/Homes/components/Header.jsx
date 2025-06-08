import { Box, Typography, Paper } from "@mui/material";
import { MusicNote } from "@mui/icons-material";

function Header() {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <MusicNote sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h3" component="h1" color="primary.main">
          SoundCloud Likes Downloader
        </Typography>
      </Box>
      <Typography variant="h6" color="text.secondary">
        Download your favorite tracks and playlists from SoundCloud
      </Typography>
    </Paper>
  );
}

export default Header;
