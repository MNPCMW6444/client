import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return { theme, isMobile };
};

export default useResponsive;
