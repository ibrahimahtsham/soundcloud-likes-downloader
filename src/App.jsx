import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Home } from "./pages/Home.jsx";
import { ThemeProvider } from "./components/ThemeProvider.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { createAppTheme } from "./utils/theme.js";

function AppContent() {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
