import { createTheme, ThemeOptions } from "@mui/material/styles/index.js";

const failerTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f5f5f5",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "Helvetica, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#3f51b5",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#3f51b5",
            opacity: 0.9,
          },
        },
      },
    },
  },
});

export default failerTheme;
