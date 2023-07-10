import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// Supports weights 100-800
import '@fontsource-variable/montserrat';
// import '@fontsource-variable/jetbrains-mono';
// import '@fontsource/roboto'

const whiteTheme = createTheme({
  palette: {
    primary: {
      main: '#8A307F',
    },
    secondary: {
      main: '#6883BC',
    },
    error: {
      main: '#EF3E36',
    },
    warning: {
      main: '#F2DC5D',
    },
    info: {
      main: '#9AD2CB',
    },
    success: {
      main: '#99C24D',
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
    body1: {
      fontSize: '0.8rem',
    },
  },
  spacing: 8,
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

export default whiteTheme