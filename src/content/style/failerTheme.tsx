import { createTheme, ThemeOptions } from "@mui/material/styles/index.js";

const failerTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#D32F2F", // A bold, strong red for "failure"
    },
    secondary: {
      main: "#1976D2", // A calming blue for "learning"
    },
    text: {
      primary: "#000", // Black text for legibility
      secondary: "#777", // A darker grey for secondary text
    },
    background: {
      default: "#FFF", // A clean, white background
      paper: "#F6F6F6", // A slightly off-white for contrast with the background
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // A modern, clean font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#D32F2F", // A bold, strong red for "failure"
          color: "#FFF", // White text for contrast
          "&:hover": {
            backgroundColor: "#C62828", // A darker red for hover states
            opacity: 0.9,
          },
        },
      },
    },
  },
});

export default failerTheme;
