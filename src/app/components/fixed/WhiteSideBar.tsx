import { useContext, useState, MouseEvent } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Avatar,
  MenuItem,
  Menu,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  MenuOpen,
  EditNote,
  TipsAndUpdates,
  Close,
  Settings,
  History,
} from "@mui/icons-material";
import useResponsive from "../../hooks/useRespnsive";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { MainserverContext } from "@failean/mainserver-provider";

const DRAWER_WIDTH_OPEN = "200px"; // Adjust as needed
const DRAWER_WIDTH_CLOSED = "56px"; // Adjust as needed

const WhiteSideBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { isMobile } = useResponsive();
  const { user, refreshUserData } = useContext(UserContext);
  const context = useContext(MainserverContext);
  const axiosInstance = context?.axiosInstance;

  const handleMouseEnter = () => {
    if (!isMobile) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpen(false);
  };

  const navigateX = useNavigate();
  const navigate = (x: string) => {
    navigateX(x);
    isMobile && setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {isMobile && !open && (
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ position: "fixed", zIndex: 1201 }}
        >
          {open ? <MenuOpen /> : <MenuIcon />}
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED,
            transition: ".3s width", // Optional: This will add a smooth transition effect when toggling
          },
        }}
      >
        <List>
          {" "}
          {isMobile && (
            <ListItem onClick={() => setOpen(!open)}>
              <ListItemIcon>{open ? <Close /> : <MenuIcon />}</ListItemIcon>
            </ListItem>
          )}
          <ListItem onClick={handleMenu}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24 }}>
                {user?.name[0].toUpperCase()}
              </Avatar>
            </ListItemIcon>
            {open && <ListItemText primary="Account" />}
          </ListItem>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate("/my-account")}>
              My Account
            </MenuItem>
            <MenuItem onClick={() => navigate("/about")}>
              About Failean
            </MenuItem>
            <MenuItem
              onClick={() =>
                axiosInstance &&
                axiosInstance
                  .get("auth/signout")
                  .then(() => refreshUserData())
                  .catch(() => refreshUserData())
              }
            >
              Logout
            </MenuItem>
          </Menu>
          <Divider />
          <ListItem onClick={() => navigate("/notebook")}>
            <ListItemIcon>
              <EditNote />
            </ListItemIcon>
            {open && <ListItemText primary="Notebook" />}
          </ListItem>
          <Divider />
          <ListItem onClick={() => navigate("/aideator")}>
            <ListItemIcon>
              <TipsAndUpdates />
            </ListItemIcon>
            {open && <ListItemText primary="AIdeator" />}
          </ListItem>
          <ListItem onClick={() => navigate("/manage")}>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            {open && <ListItemText primary="History" />}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default WhiteSideBar;
