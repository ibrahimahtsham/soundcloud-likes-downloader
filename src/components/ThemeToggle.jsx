import { IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}>
      <IconButton onClick={onToggle} color="inherit">
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}

export default ThemeToggle;
