import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { lightTheme } from "./theme/lightTheme";
import { darkTheme } from "./theme/darkTheme";
import Home from "./pages/Homes"; // Fixed path - it's "Homes" not "Home"
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ minHeight: "100vh", py: 2 }}>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        <Home />
      </Container>
    </ThemeProvider>
  );
}

export default App;
