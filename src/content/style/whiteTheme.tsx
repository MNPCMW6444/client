import { createTheme } from "@mui/material/styles";
// Supports weights 100-800
import '@fontsource-variable/montserrat';
// import '@fontsource-variable/jetbrains-mono';
// import '@fontsource/roboto'

const whiteTheme = createTheme({
  palette: {
    primary: {
      main: "#8F00FF",
      50: "#F2E5FF",
      100: "#E6CBFF",
      200: "#DAB1FF",
      300: "#CE97FF",
      400: "#C27DFF",
      500: "#B663FF",
      600: "#AA49FF",
      700: "#9E2FFF",
      800: "#9215FF",
      900: "#8600FF",
    },
    secondary: {
      main: "#00FFB0",
      50: "#E5FFFB",
      100: "#CBFFF6",
      200: "#B1FFF1",
      300: "#97FFEC",
      400: "#7DFFE7",
      500: "#63FFE2",
      600: "#49FFDD",
      700: "#2FFFD8",
      800: "#15FFD3",
      900: "#00FFCE",
    },
    error: {
      main: "#FF1A1A",
      50: "#FFE5E5",
      100: "#FFCBCB",
      200: "#FFB1B1",
      300: "#FF9797",
      400: "#FF7D7D",
      500: "#FF6363",
      600: "#FF4949",
      700: "#FF2F2F",
      800: "#FF1515",
      900: "#FF0000",
    },
    warning: {
      main: "#FFB347",
      50: "#FFF5E5",
      100: "#FFEBD1",
      200: "#FFE1BD",
      300: "#FFD7A9",
      400: "#FFCD95",
      500: "#FFC381",
      600: "#FFB96D",
      700: "#FFAF59",
      800: "#FFA545",
      900: "#FF9B31",
    },
    info: {
      main: "#1A1AFF",
      50: "#E5E5FF",
      100: "#CBCBFF",
      200: "#B1B1FF",
      300: "#9797FF",
      400: "#7D7DFF",
      500: "#6363FF",
      600: "#4949FF",
      700: "#2F2FFF",
      800: "#1515FF",
      900: "#0000FF",
    },
    success: {
      main: "#009900",
      50: "#E5F2E5",
      100: "#CBE6CB",
      200: "#B1DAB1",
      300: "#97CE97",
      400: "#7DC27D",
      500: "#63B663",
      600: "#49AA49",
      700: "#2F9E2F",
      800: "#159215",
      900: "#008600",
    },
  },
  typography: {
    fontFamily: [
      'Montserrat Variable',
      'Roboto',
      'JetBrains Mono Variable',
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

export default whiteTheme;
