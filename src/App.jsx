import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Home } from "./pages/Home.jsx";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#2196f3",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
