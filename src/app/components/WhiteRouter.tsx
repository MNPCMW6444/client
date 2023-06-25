import { useContext, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import WhiteAuthRouter from "./auth/WhiteAuthRouter";
import WhiteAppBar from "./fixed/WhiteAppBar";
import WhiteSideBar from "./fixed/WhiteSideBar";
import UserContext from "../context/UserContext";
import useResponsive from "../hooks/useRespnsive";

const AIdeator = lazy(() => import("./pages/aideator/AIdeator"));
const MyAccount = lazy(() => import("./pages/my-account/MyAccount"));
const About = lazy(() => import("./pages/about/About"));
const Notebook = lazy(() => import("./pages/notebook/Notebook"));
//const CritiQ = lazy(() => import("./pages/critiq/CritiQ"));

const WhiteRouter = () => {
  const { user } = useContext(UserContext);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isMobile } = useResponsive();

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <BrowserRouter>
      {user ? (
        <Box paddingTop="20px" overflow="hidden">
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
              <Route
                path="/*"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Notebook />
                  </Suspense>
                }
              />
              <Route
                path="/aideator"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <AIdeator />
                  </Suspense>
                }
              />
              <Route
                path="/my-account"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <MyAccount />
                  </Suspense>
                }
              />
              <Route
                path="/about"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <About />
                  </Suspense>
                }
              />
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
