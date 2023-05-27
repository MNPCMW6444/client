import { MouseEvent, useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { MainServerContext } from "../../context/MainServerContext";

interface FailerAppBarProps {
  onMobileDrawerToggle: () => void;
}

const FailerAppBar: React.FC<FailerAppBarProps> = ({
  onMobileDrawerToggle,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const axiosInstance = useContext(MainServerContext);
  const { getUser } = useContext(UserContext);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMobileDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pl: isMobile
              ? (theme) => theme.spacing(1)
              : (theme) => theme.spacing(32), // Add left padding to account for the sidebar width when not on mobile
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Failer
          </Typography>
        </Box>
        {user && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => navigate("/my-account")}>
                My Account
              </MenuItem>
              <MenuItem
                onClick={() =>
                  axiosInstance
                    .get("auth/signout")
                    .then(() => getUser())
                    .catch(() => getUser())
                }
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default FailerAppBar;
