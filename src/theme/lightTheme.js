import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff5722",
      light: "#ff8a50",
      dark: "#c41c00",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
});
