import { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles/index.js";
import failerTheme from "../../../content/style/failerTheme";

interface FailerThemeProviderProps {
  children: ReactNode;
}

const FailerThemeProvider: FC<FailerThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={failerTheme}>{children}</ThemeProvider>;
};

export default FailerThemeProvider;
