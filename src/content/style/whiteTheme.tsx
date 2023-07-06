import { createTheme } from "@mui/material/styles";
// Supports weights 100-800
import '@fontsource-variable/jetbrains-mono';

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b6bb2",
      50: "#e5f3fb",
      100: "#c1dff7",
      200: "#9ccdf2",
      300: "#79b8ec",
      400: "#62a9e8",
      500: "#519Be5",
      600: "#4a8dd7",
      700: "#427bc4",
      800: "#3b6bb2",
      900: "#2f4d92",
    },
    secondary: {
      main: "##b2823b",
      50: "##fffce9",
      100: "##fff6c9",
      200: "##fff0a5",
      300: "##ffea82",
      400: "##ffe468",
      500: "##ffde4f",
      600: "##ffd351",
      700: "##efbd4a",
      800: "##d8a745",
      900: "##b2823b",
    },
    error: {
      main: "#f44336",
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71b1c",
    },
    warning: {
      main: "#ff9900",
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcd80",
      300: "#ffb84d",
      400: "#ffa826",
      500: "#ff9900",
      600: "#fb8d00",
      700: "#f57d00",
      800: "#ef6d00",
      900: "#e65200",
    },
    info: {
      main: "#2194f3",
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90c9f9",
      300: "#63b4f6",
      400: "#42a4f5",
      500: "#2194f3",
      600: "#1f87e5",
      700: "#1a75d2",
      800: "#1764c0",
      900: "#1045a1",
    },
    success: {
      main: "#4caf4f",
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb69",
      500: "#4caf4f",
      600: "#43a046",
      700: "#388e3b",
      800: "#2e7d31",
      900: "#1b5e1f",
    },
  },
  typography: {
    fontFamily: [
      'Arial',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
  spacing: 8, // default spacing
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // zIndex: {
  //   appBar: 1200,
  //   drawer: 1100,
  // },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f4f6f8',
        },
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

export default theme;
