import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import WhiteAuthRouter from "./auth/WhiteAuthRouter";
import Notebook from "./pages/notebook/Notebook";
import MyAccount from "./pages/my-account/MyAccount";
import About from "./pages/about/About";
import CritIQ from "./pages/critiq/CritIQ";
import WhiteAppBar from "./fixed/WhiteAppBar";
import WhiteSideBar from "./fixed/WhiteSideBar";
import UserContext from "../context/UserContext";
import AIDeator from "./pages/aideator/AIdeator";
//import CritiQ from "./pages/criticq/CritiQ";

const WhiteRouter = () => {
  const { user } = useContext(UserContext);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <BrowserRouter>
      {user ? (
        <Box paddingTop="20px">
          <WhiteAppBar onMobileDrawerToggle={handleMobileDrawerToggle} />
          <WhiteSideBar
            mobileDrawerOpen={mobileDrawerOpen}
            onMobileDrawerToggle={handleMobileDrawerToggle}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              pt: isMobile
                ? (theme) => theme.spacing(9)
                : (theme) => theme.spacing(1), // Add top padding to account for the fixed AppBar
              pl: isMobile
                ? (theme) => theme.spacing(1)
                : (theme) => theme.spacing(32), // Add left padding to account for the sidebar width when not on mobile
            }}
          >
            <Routes>
              <Route path="/*" element={<Notebook />} />
              <Route path="/aideator" element={<AIDeator />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/about" element={<About />} />
              <Route path="/critiq" element={<CritIQ />} />

              {/* <Route path="/critiq" element={<CritiQ />} /> */}
            </Routes>
          </Box>
        </Box>
      ) : (
        <WhiteAuthRouter />
      )}
    </BrowserRouter>
  );
};

export default WhiteRouter;
