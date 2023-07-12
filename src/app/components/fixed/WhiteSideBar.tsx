import { useState, useEffect, FC, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Collapse, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import useResponsive from "../../hooks/useRespnsive";
import { Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import UserContext from "../../context/UserContext";
import Divider from "@mui/material/Divider";
import ListIcon from "@mui/icons-material/List";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Avatar from "@mui/material/Avatar";
import whiteTheme from "../../../content/style/whiteTheme";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";

interface WhiteSideBarProps {
  mobileDrawerOpen: boolean;
  onMobileDrawerToggle: () => void;
}

const WhiteSideBar: FC<WhiteSideBarProps> = ({
  mobileDrawerOpen,
  onMobileDrawerToggle,
}) => {
  const navigate = useNavigate();

  const { isMobile } = useResponsive();

  const location = useLocation();

  const mainserver = useContext(MainserverContext);
  const axiosInstance = mainserver?.axiosInstance;
  const { ideas } = useContext(UserContext);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState("");
  const [hoveredItem, setHoveredItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const menuItems = [
    { label: "Idea Notebook", route: "/" },
    { label: "AIdeator", route: "/aideator" },
    { label: "Deck", route: "/deck", disabled: true, comingSoon: true },
    {
      label: "Idea Backlog",
      route: "/backlog",
      disabled: true,
      comingSoon: true,
    },
    { label: "CritiQ", route: "/critiq", disabled: true, comingSoon: true },
  ];

  const critiqSubItems = [
    { label: "Idea Score", route: "/critiq/ideascore" },
    { label: "CritIQ Chat", route: "/critiq/critichat" },
    { label: "Validation Roadmap", route: "/critiq/validationroadmap" },
  ];

  useEffect(() => {
    const isCritiqRoute = [
      "/critiq/runcritiq",
      ...critiqSubItems.map((item) => item.route),
    ].includes(location.pathname);
    setOpenSubMenu(isCritiqRoute);
  }, [location, critiqSubItems]);

  const handleMenuItemClick = (route: string) => {
    axiosInstance && axiosInstance.post("analytics/sidebar", { route });
    navigate(route);
    if (isMobile) {
      onMobileDrawerToggle();
    }
  };

  const handleMouseEnter = (route: string) => {
    const timer = setTimeout(() => {
      setHoveredItem(route);
    }, 5);
    setTimers((prevTimers) => [...prevTimers, timer]);
  };

  const clearTimeouts = () => {
    timers.forEach((timer) => clearTimeout(timer));
    setTimers([]);
  };

  const handleMouseLeave = () => {
    clearTimeouts();
    setHoveredItem("");
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) =>
        isMobile ? (
          <ListItem
            key={index}
            onClick={() => !item.disabled && handleMenuItemClick(item.route)}
            sx={{
              bgcolor:
                location.pathname === item.route
                  ? "action.selected"
                  : "inherit",
            }}
            disabled={item.disabled}
          >
            <ListItemText
              primary={item.label + (item.comingSoon ? " - Comming Soon!" : "")}
            />
          </ListItem>
        ) : (
          <ListItem
            key={index}
            onClick={() => !item.disabled && handleMenuItemClick(item.route)}
            sx={{
              bgcolor:
                location.pathname === item.route
                  ? "action.selected"
                  : "inherit",
            }}
            disabled={item.disabled}
          >
            <ListItemText
              primary={item.label}
              sx={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
            />
            {item.comingSoon && (
              <ListItemSecondaryAction>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    fontSize: "60%",
                  }}
                >
                  Coming Soon!
                </Typography>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      )}

      {menuItems.find((item) => item.label === "Run CritIQ") && (
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {critiqSubItems.map((subItem, subIndex) => (
              <ListItem
                key={subIndex}
                onClick={() => handleMenuItemClick(subItem.route)}
                onMouseEnter={() => handleMouseEnter(subItem.route)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  bgcolor:
                    hoveredItem === subItem.route &&
                    !location.pathname.startsWith(subItem.route)
                      ? "#4a8dd7"
                      : location.pathname.startsWith(subItem.route)
                      ? whiteTheme.palette.primary.main
                      : "inherit",
                  color:
                    hoveredItem === subItem.route ||
                    location.pathname.startsWith(subItem.route)
                      ? "white"
                      : "inherit",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  transition: `${whiteTheme.transitions.create(
                    "background-color",
                    {
                      duration: whiteTheme.transitions.duration.shorter,
                      easing: whiteTheme.transitions.easing.easeInOut,
                    }
                  )}, ${whiteTheme.transitions.create("transform", {
                    duration: whiteTheme.transitions.duration.shortest,
                    easing: whiteTheme.transitions.easing.easeInOut,
                  })}, ${whiteTheme.transitions.create("box-shadow", {
                    duration: whiteTheme.transitions.duration.shortest,
                    easing: whiteTheme.transitions.easing.easeInOut,
                  })}`,
                  transform:
                    hoveredItem === subItem.route ? "scale(1.1)" : "scale(1)",
                  boxShadow:
                    hoveredItem === subItem.route
                      ? "0 0 10px rgba(31, 38, 135, 0.37)"
                      : "none",
                  "&:active": {
                    bgcolor: "#2f4d92", // Set your desired click color
                  },
                }}
              >
                {subItem.route === "/critiq/ideascore" && (
                  <ListIcon
                    sx={{
                      color:
                        hoveredItem === subItem.route ||
                        location.pathname.startsWith(subItem.route)
                          ? "white"
                          : whiteTheme.palette.primary.main,
                      mr: "0.5rem",
                    }}
                  />
                )}
                {subItem.route === "/critiq/critichat" && (
                  <EmojiObjectsIcon
                    sx={{
                      color:
                        hoveredItem === subItem.route ||
                        location.pathname.startsWith(subItem.route)
                          ? "white"
                          : whiteTheme.palette.primary.main,
                      mr: "0.5rem",
                    }}
                  />
                )}
                {subItem.route === "/critiq/validationroadmap" && (
                  <DashboardIcon
                    sx={{
                      color:
                        hoveredItem === subItem.route ||
                        location.pathname.startsWith(subItem.route)
                          ? "white"
                          : whiteTheme.palette.primary.main,
                      mr: "0.5rem",
                    }}
                  />
                )}

                <ListItemText primary={subItem.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </List>
  );

  const handleIdeaSelect = (event: SelectChangeEvent) => {
    setSelectedIdeaId(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        mt: isMobile ? 0 : (theme) => theme.spacing(8),
      }}
    >
      {isMobile ? (
        <Drawer
          anchor="left"
          sx={{ boxShadow: `0 0 10px ${"rgba(31, 38, 135, 0.37)"}` }}
        >
          <Avatar
            alt="User Avatar"
            src="/path/to/avatar-image.jpg"
            sx={{
              width: 40,
              height: 40,
              margin: "0 auto",
              border: "2px",
              borderColor: whiteTheme.palette.primary.main,
              marginBottom: whiteTheme.spacing(2),
              transition: whiteTheme.transitions.create("box-shadow", {
                duration: whiteTheme.transitions.duration.short,
              }),
              "&:hover": {
                boxShadow: whiteTheme.shadows[6],
              },
            }}
          />

          <>
            <Select
              value={selectedIdeaId}
              onChange={handleIdeaSelect}
              variant="outlined"
              displayEmpty
              sx={{
                width: "calc(100% - 20px)",
                alignSelf: "center",
                maxWidth: "220",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              <MenuItem value="" disabled>
                Select Idea
              </MenuItem>
              {ideas.map((idea, index) => (
                <MenuItem key={index} value={idea._id}>
                  {idea.idea}
                </MenuItem>
              ))}
            </Select>
            <Divider sx={{ mt: "10px", ml: "10px", mr: "10px" }} />
            <Box sx={{ padding: "10px" }}>{renderMenuItems()}</Box>
          </>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: "240px",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: "240px",
              boxSizing: "border-box",
              boxShadow: `0 0 10px ${"rgba(31, 38, 135, 0.37)"}`,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              alignSelf: "center",
              width: "calc(100% - 20px)",
              height: "auto",
            }}
          >
            <Avatar
              alt="User Avatar"
              src="/path/to/avatar-image.jpg"
              sx={{
                border: 1.5,
                borderColor: whiteTheme.palette.primary.main,
                width: 50,
                height: 50,
                margin: "0 auto",
                marginTop: whiteTheme.spacing(2),
                marginBottom: whiteTheme.spacing(2),
                transition: whiteTheme.transitions.create("box-shadow", {
                  duration: whiteTheme.transitions.duration.short,
                }),
                "&:hover": {
                  boxShadow: whiteTheme.shadows[6],
                },
              }}
            />
            <IconButton
              onClick={toggleSidebar}
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                marginTop: whiteTheme.spacing(2),
                marginBottom: whiteTheme.spacing(2),
                width: 30,
                height: 29,
                borderRadius: 1.1,
                padding: 0,
                boxShadow: 0,
                bgcolor: whiteTheme.palette.primary.main,
                transition: "transform 0.3s, scale 0.3s, rotate 0.2s",
                "&:hover": {
                  transform: "translateY(-50%) scale(1.1) rotate(180deg)",
                  bgcolor: whiteTheme.palette.primary.main,
                },
              }}
            >
              <MenuIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Box>

          <>
            <Select
              value={selectedIdeaId}
              onChange={handleIdeaSelect}
              variant="outlined"
              displayEmpty
              sx={{
                alignSelf: "center",
                width: "calc(100% - 20px)",
                height: "auto",
                minHeight: "56px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              <MenuItem value="" disabled>
                Select Idea
              </MenuItem>
              {ideas.map((idea, index) => (
                <MenuItem key={index} value={idea._id}>
                  {idea.idea}
                </MenuItem>
              ))}
            </Select>
            <Divider sx={{ mt: "10px", ml: "10px", mr: "10px" }} />
            <Box
              sx={{
                alignSelf: "center",
                width: "87%",
                padding: "15px",
                overflowY: "scroll",
                scrollbarWidth: "none",
                scrollbarColor: "transparent",
                "&::-webkit-scrollbar": {
                  width: "0px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {renderMenuItems()}
            </Box>
          </>
        </Drawer>
      )}
    </Box>
  );
};

export default WhiteSideBar;
