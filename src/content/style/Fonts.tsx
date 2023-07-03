import { createTheme } from "@mui/material/styles";
import "../assets/Fonts/style.css";
import "../assets/Fonts/SFMonoRegular.woff";

const typographyTheme = createTheme({
  typography: {
    fontFamily: 'SF Mono Regular, Arial',
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
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'SF Mono Regular';
        font-style: normal;
        font-weight: normal;
        src: local('SF Mono Regular'), url('SFMonoRegular.woff') format('woff');
        }
      `,
    },
  },
});

export default typographyTheme;
