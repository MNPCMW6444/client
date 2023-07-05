import { useContext, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import WhiteAuthRouter from "./auth/WhiteAuthRouter";
import WhiteAppBar from "./fixed/WhiteAppBar";
import WhiteSideBar from "./fixed/WhiteSideBar";
import AnimatedSideBar from "./fixed/AnimatedSideBar";
import UserContext from "../context/UserContext";
import useResponsive from "../hooks/useRespnsive";
import { loading } from "../../content/style/styled-components/all";
import RunCritiq from "./pages/critiq/RunCritIQ";

const AIdeatorWrapper = lazy(() => import("./pages/aideator/AIdeatorWrapper"));
const MyAccount = lazy(() => import("./pages/my-account/MyAccount"));
const About = lazy(() => import("./pages/about/About"));
const Notebook = lazy(() => import("./pages/notebook/Notebook"));
const Deck = lazy(() => import("./pages/deck/Deck"));
const Backlog = lazy(() => import("./pages/backlog/Backlog"));
const CritiQ = lazy(() => import("./pages/critiq/CritIQ"));
const CritiChat = lazy(() => import("./pages/critiq/CritiChat"));
const IdeaScore = lazy(() => import("./pages/critiq/IdeaScore"));
const ValidationRoadmap = lazy(() => import("./pages/critiq/ValidationRoadmap"));

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
        <Box paddingTop="75px" overflow="hidden">
          <WhiteAppBar onMobileDrawerToggle={handleMobileDrawerToggle} />
          <AnimatedSideBar />
          <Box
            component="main"
            sx={{
              marginTop: 5, 
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
                path="/my-account"
                element={
                  <Suspense fallback={loading()}>
                    <MyAccount />
                  </Suspense>
                }
              />
              <Route
                path="/about"
                element={
                  <Suspense fallback={loading()}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="/*"
                element={
                  <Suspense fallback={loading()}>
                    <Notebook />
                  </Suspense>
                }
              />
              <Route
                path="/aideator"
                element={
                  <Suspense fallback={loading()}>
                    <AIdeatorWrapper />
                  </Suspense>
                }
              />
              <Route
                path="/deck"
                element={
                  <Suspense fallback={loading()}>
                    <Deck />
                  </Suspense>
                }
              />
              <Route
                path="/backlog"
                element={
                  <Suspense fallback={loading()}>
                    <Backlog />
                  </Suspense>
                }
              />
              <Route
                path="/critiq/RunCritiQ"
                element={
                  <Suspense fallback={loading()}>
                    <RunCritiq />
                  </Suspense>
                }
              />
              <Route
                path="/critiq/IdeaScore"
                element={
                  <Suspense fallback={loading()}>
                    <IdeaScore />
                  </Suspense>
                }
              />
              <Route path="/critiq/CritiChat" element={<Suspense fallback={loading()}><CritiChat /></Suspense>} />
  <Route path="/critiq/ValidationRoadmap" element={<Suspense fallback={loading()}><ValidationRoadmap /></Suspense>} />
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
