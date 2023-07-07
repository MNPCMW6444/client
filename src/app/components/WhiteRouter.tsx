import { useContext, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import WhiteAuthRouter from "./auth/WhiteAuthRouter";
import WhiteAppBar from "./fixed/WhiteAppBar";
import WhiteSideBar from "./fixed/WhiteSideBar";
import UserContext from "../context/UserContext";
import useResponsive from "../hooks/useRespnsive";
import { loading } from "../../content/style/styled-components/all";
import WhiteRoute from "./WhiteRoute";

const AIdeatorWrapper = lazy(() => import("./pages/aideator/AIdeatorWrapper"));
const MyAccount = lazy(() => import("./pages/my-account/MyAccount"));
const About = lazy(() => import("./pages/about/About"));
const Notebook = lazy(() => import("./pages/notebook/Notebook"));
//const Deck = lazy(() => import("./pages/deck/Deck.future"));
const Backlog = lazy(() => import("./pages/backlog/Backlog"));

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
              <WhiteRoute
                path="/my-account"
                element={
                  <Suspense fallback={loading()}>
                    <MyAccount />
                  </Suspense>
                }
              />
              <WhiteRoute
                path="/about"
                element={
                  <Suspense fallback={loading()}>
                    <About />
                  </Suspense>
                }
              />
              <WhiteRoute
                path="/*"
                element={
                  <Suspense fallback={loading()}>
                    <Notebook />
                  </Suspense>
                }
              />
              <WhiteRoute
                path="/aideator"
                element={
                  <Suspense fallback={loading()}>
                    <AIdeatorWrapper />
                  </Suspense>
                }
              />
              {/*    <WhiteRoute                path="/deck"
                element={
                  <Suspense fallback={loading()}>
                    <Deck />
                  </Suspense>
                }
              /> */}
              <WhiteRoute
                path="/backlog"
                element={
                  <Suspense fallback={loading()}>
                    <Backlog />
                  </Suspense>
                }
              />
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
