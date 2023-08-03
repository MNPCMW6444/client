import { useContext, useState, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import WhiteAuthRouter from "./auth/WhiteAuthRouter";
import WhiteSideBar from "./fixed/WhiteSideBar";
import UserContext from "../context/UserContext";
import useResponsive from "../hooks/useRespnsive";
import { loading } from "../../content/style/styled-components/all";
import WhitePage from "./WhitePage";

const Router = () => {
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
          <WhiteSideBar onMobileDrawerToggle={handleMobileDrawerToggle} />
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
                path="/my-account"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="my-account" />
                  </Suspense>
                }
              />
              <Route
                path="/about"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="about" />
                  </Suspense>
                }
              />

              <Route
                path="/*"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="*" />
                  </Suspense>
                }
              />
              <Route
                path="/critiq"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="critiq" />
                  </Suspense>
                }
              />
              <Route
                path="/aideator"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="aideator" />
                  </Suspense>
                }
              />
              <Route
                path="/backlog"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="backlog" />
                  </Suspense>
                }
              />
              <Route
                path="/critiq"
                element={
                  <Suspense fallback={loading()}>
                    <WhitePage path="critiq" />
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

export default Router;
