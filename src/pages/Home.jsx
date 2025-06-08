import { Box, Container, Typography, AppBar, Toolbar } from "@mui/material";
import { ProfileForm } from "../components/profile/ProfileForm.jsx";
import { ProfileCard } from "../components/profile/ProfileCard.jsx";
import { ThemeToggle } from "../components/ThemeToggle.jsx";
import { useProfile } from "../hooks/useProfile.js";

export function Home() {
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfile,
  } = useProfile();

  const handleProfileSubmit = async (profileUrl) => {
    await fetchProfile(profileUrl);
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SoundCloud Profile Loader
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            SoundCloud Profile Loader
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Load and explore SoundCloud profiles
          </Typography>
        </Box>

        <ProfileForm
          onSubmit={handleProfileSubmit}
          loading={profileLoading}
          error={profileError}
        />

        {profile && <ProfileCard profile={profile} />}
      </Container>
    </>
  );
}
