import { createTheme } from "@mui/material/styles";

// Define color palettes
const lightPalette = {
  mode: "light",
  primary: {
    main: "#ff5722",
  },
  secondary: {
    main: "#2196f3",
  },
  background: {
    default: "#ffffff",
    paper: "#f5f5f5",
  },
  text: {
    primary: "#000000",
    secondary: "#666666",
  },
};

const darkPalette = {
  mode: "dark",
  primary: {
    main: "#ff5722",
  },
  secondary: {
    main: "#2196f3",
  },
  background: {
    default: "#0a0a0a",
    paper: "#121212",
  },
  text: {
    primary: "#ffffff",
    secondary: "#b3b3b3",
  },
};

export const createAppTheme = (mode) => {
  return createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
};
