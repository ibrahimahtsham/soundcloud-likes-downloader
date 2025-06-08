import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import { Person, Favorite, QueueMusic, OpenInNew } from "@mui/icons-material";

function ProfileDisplay({ profile }) {
  if (!profile) {
    return null;
  }

  const { profile: profileData, likes = [], playlists = [] } = profile;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar
          src={profileData.avatar_url}
          alt={profileData.display_name}
          sx={{ width: 64, height: 64 }}
        >
          <Person />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" component="h2">
              {profileData.display_name || profileData.username}
            </Typography>
            <IconButton
              size="small"
              onClick={() => window.open(profileData.permalink_url, "_blank")}
            >
              <OpenInNew fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            @{profileData.username}
          </Typography>

          {profileData.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {profileData.description}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
        <Chip
          icon={<Favorite />}
          label={`${likes.length} Likes`}
          variant="outlined"
          color="primary"
        />
        <Chip
          icon={<QueueMusic />}
          label={`${playlists.length} Playlists`}
          variant="outlined"
          color="secondary"
        />
        {profileData.followers_count > 0 && (
          <Chip
            label={`${profileData.followers_count} Followers`}
            variant="outlined"
          />
        )}
      </Box>
    </Paper>
  );
}

export default ProfileDisplay;
