import { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles/index.js";
import whiteTheme from "../../../content/style/whiteTheme";

interface WhiteThemeProviderProps {
  children: ReactNode;
}

const WhiteThemeProvider: FC<WhiteThemeProviderProps> = ({ children }) => (
  <ThemeProvider theme={whiteTheme}>{children}</ThemeProvider>
);

export default WhiteThemeProvider;
