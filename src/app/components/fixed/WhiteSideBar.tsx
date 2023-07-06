import { useState, useEffect, FC, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Collapse, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { ideas } = useContext(UserContext);
  const [selectedIdeaId, setSelectedIdeaId] = useState("");
  const [hoveredItem, setHoveredItem] = useState("");

  const menuItems = [
    { label: "Idea Notebook", route: "/Notebook" },
    { label: "AIdeator", route: "/aideator" },
    { label: "Deck", route: "/deck" },
    { label: "Idea Backlog", route: "/backlog" },
    { label: "Run CritIQ", route: "/critiq/RunCritiQ" },
  ];

  const critiqSubItems = [
    { label: "Idea Score", route: "/critiq/IdeaScore" },
    { label: "CritIQ Chat", route: "/critiq/CritiChat" },
    { label: "Validation Roadmap", route: "/critiq/ValidationRoadMap" },
  ];
  const handleFabClick = () => {
    // Handle FAB click event
    console.log("FAB clicked");
  };

  useEffect(() => {
    const isCritiqRoute = [
      "/critiq/RunCritiQ",
      ...critiqSubItems.map((item) => item.route),
    ].includes(location.pathname);
    setOpenSubMenu(isCritiqRoute);
  }, [location, critiqSubItems]);

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    if (isMobile) {
      onMobileDrawerToggle();
    }
  };

  const handleIdeaSelect = (event: SelectChangeEvent<string>) => {
    setSelectedIdeaId(event.target.value);
  };

  const handleMouseEnter = (route: string) => {
    const timer = setTimeout(() => {
      setHoveredItem(route);
    }, 5);
    setTimers((prevTimers) => [...prevTimers, timer]);
  };

  const handleMouseLeave = () => {
    clearTimeouts();
    setHoveredItem("");
  };

  const clearTimeouts = () => {
    timers.forEach((timer) => clearTimeout(timer));
    setTimers([]);
  };

  const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) => (
        <div key={index}>
          <ListItem
            onClick={() => handleMenuItemClick(item.route)}
            onMouseEnter={() => handleMouseEnter(item.route)}
            onMouseLeave={handleMouseLeave}
            sx={{
              bgcolor:
                hoveredItem === item.route && !location.pathname.startsWith(item.route)
                  ? "#4a8dd7"
                  : location.pathname.startsWith(item.route)
                  ? whiteTheme.palette.primary.main
                  : "inherit",
              color:
                hoveredItem === item.route || location.pathname.startsWith(item.route)
                  ? "white"
                  : "inherit",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              transition: `${theme.transitions.create("background-color", {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              })}, ${theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut,
              })}, ${theme.transitions.create("box-shadow", {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut,
              })}`,
              transform: hoveredItem === item.route ? "scale(1.1)" : "scale(1)",
              boxShadow:
                hoveredItem === item.route
                  ? "0 0 10px rgba(31, 38, 135, 0.37)"
                  : "none",
              "&:active": {
                bgcolor: "#2f4d92", // Set your desired click color
              },
            }}
          >
            {item.route === "/notebook" && (
              <ListIcon
              sx={{
                color:
                  hoveredItem === item.route || location.pathname.startsWith(item.route)
                    ? "white"
                    : whiteTheme.palette.primary.main,
                mr: "0.5rem",
              }}
              />
            )}
            {item.route === "/aideator" && (
              <EmojiObjectsIcon
              sx={{
                color:
                  hoveredItem === item.route || location.pathname.startsWith(item.route)
                    ? "white"
                    : whiteTheme.palette.primary.main,
                mr: "0.5rem",
              }}
              />
            )}
            {item.route === "/deck" && (
              <DashboardIcon
              sx={{
                color:
                  hoveredItem === item.route || location.pathname.startsWith(item.route)
                    ? "white"
                    : whiteTheme.palette.primary.main,
                mr: "0.5rem",
              }}
              />
            )}
            {item.route === "/backlog" && (
              <PlaylistAddCheckIcon
              sx={{
                color:
                  hoveredItem === item.route || location.pathname.startsWith(item.route)
                    ? "white"
                    : whiteTheme.palette.primary.main,
                mr: "0.5rem",
              }}
              />
            )}
            {item.route === "/critiq/runcritiq" && (
              <PlayCircleOutlineIcon
              sx={{
                color:
                  hoveredItem === item.route || location.pathname.startsWith(item.route)
                    ? "white"
                    : whiteTheme.palette.primary.main,
                mr: "0.5rem",
              }}
              />
            )}
            <ListItemText primary={item.label} />
          </ListItem>

          {item.label === "Run CritIQ" && (
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
                        hoveredItem === subItem.route && !location.pathname.startsWith(subItem.route)
                          ? "#4a8dd7"
                          : location.pathname.startsWith(subItem.route)
                          ? whiteTheme.palette.primary.main
                          : "inherit",
                      color:
                        hoveredItem === subItem.route || location.pathname.startsWith(subItem.route)
                          ? "white"
                          : "inherit",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      transition: `${theme.transitions.create("background-color", {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeInOut,
                      })}, ${theme.transitions.create("transform", {
                        duration: theme.transitions.duration.shortest,
                        easing: theme.transitions.easing.easeInOut,
                      })}, ${theme.transitions.create("box-shadow", {
                        duration: theme.transitions.duration.shortest,
                        easing: theme.transitions.easing.easeInOut,
                      })}`,
                      transform: hoveredItem === subItem.route ? "scale(1.1)" : "scale(1)",
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
                          hoveredItem === subItem.route || location.pathname.startsWith(subItem.route)
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
                          hoveredItem === subItem.route || location.pathname.startsWith(subItem.route)
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
                          hoveredItem === subItem.route || location.pathname.startsWith(subItem.route)
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
        </div>
      ))}
    </List>
  );

  const theme = useTheme();

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
          open={mobileDrawerOpen}
          onClose={onMobileDrawerToggle}
        >
          <Avatar
            alt="User Avatar"
            src="/path/to/avatar-image.jpg"
            sx={{
              width: 40,
              height: 40,
              margin: "0 auto",
              marginBottom: theme.spacing(2),
              transition: theme.transitions.create("box-shadow", {
                duration: theme.transitions.duration.short,
              }),
              "&:hover": {
                boxShadow: theme.shadows[6],
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
          variant="persistent"
          open
          sx={{
            width: "drawerWidth",
            maxWidth: "260px",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: "240px",
              boxSizing: "border-box",
            },
          }}
        >
          <Avatar
            alt="User Avatar"
            src="/path/to/avatar-image.jpg"
            sx={{
              width: 40,
              height: 40,
              margin: "0 auto",
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(2),
              transition: theme.transitions.create("box-shadow", {
                duration: theme.transitions.duration.short,
              }),
              "&:hover": {
                boxShadow: theme.shadows[6],
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
      <Box sx={{ flex: 1 }} />
      <Fab
        color="primary"
        aria-label="Add"
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default WhiteSideBar;
