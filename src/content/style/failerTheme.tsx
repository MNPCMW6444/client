import { createTheme, ThemeOptions } from "@mui/material/styles/index.js";

const failerTheme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#D32F2F",
    },
    secondary: {
      main: "#020230",
    },
    text: {
      primary: "#000",
      secondary: "#777",
    },
    background: {
      default: "#FFF",
      paper: "#F6F6F6",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#D32F2F",
          color: "#FFF",
          "&:hover": {
            backgroundColor: "#C62828",
            opacity: 0.9,
          },
        },
      },
    },
  },
});

export default failerTheme;
