import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { OpenInNew, Person } from "@mui/icons-material";
import { formatNumber } from "../../utils/formatters.js";

export function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar
          src={profile.avatarUrl}
          alt={profile.displayName}
          sx={{ width: 64, height: 64 }}
        >
          <Person />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" component="h2">
              {profile.displayName}
            </Typography>
            <IconButton
              size="small"
              onClick={() => window.open(profile.url, "_blank")}
            >
              <OpenInNew fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            @{profile.username}
          </Typography>

          {profile.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {profile.description}
            </Typography>
          )}

          {profile.createdAt && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Member since{" "}
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
        {profile.followersCount > 0 && (
          <Chip
            label={`${formatNumber(profile.followersCount)} Followers`}
            variant="outlined"
            color="primary"
          />
        )}
        {profile.followingCount > 0 && (
          <Chip
            label={`${formatNumber(profile.followingCount)} Following`}
            variant="outlined"
            color="secondary"
          />
        )}
        {profile.trackCount > 0 && (
          <Chip
            label={`${formatNumber(profile.trackCount)} Tracks`}
            variant="outlined"
          />
        )}
        {profile.playlistCount > 0 && (
          <Chip
            label={`${formatNumber(profile.playlistCount)} Playlists`}
            variant="outlined"
          />
        )}
        {profile.likesCount > 0 && (
          <Chip
            label={`${formatNumber(profile.likesCount)} Likes`}
            variant="outlined"
            color="info"
          />
        )}
        {profile.repostsCount > 0 && (
          <Chip
            label={`${formatNumber(profile.repostsCount)} Reposts`}
            variant="outlined"
            color="warning"
          />
        )}
        {profile.verified && (
          <Chip label="Verified" variant="outlined" color="success" />
        )}
        {profile.badges?.pro && (
          <Chip label="Pro" variant="outlined" color="warning" />
        )}
        {profile.badges?.pro_unlimited && (
          <Chip label="Pro Unlimited" variant="outlined" color="error" />
        )}
        {profile.creatorSubscription?.product?.id &&
          profile.creatorSubscription.product.id !== "free" && (
            <Chip
              label={profile.creatorSubscription.product.id.toUpperCase()}
              variant="outlined"
              color="success"
            />
          )}
      </Box>
    </Paper>
  );
}
