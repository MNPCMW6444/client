import { useNavigate, useLocation } from "react-router-dom";
import { Collapse, Typography, Box,
 List,
 ListItem,
 ListItemText,
 ListItemSecondaryAction, Drawer, Avatar} from "@mui/material";
import useResponsive from "../../hooks/useRespnsive";
import {ListIcon,
EmojiObjectsIcon,
DashboardIcon,} from "@mui/icons-material";
import whiteTheme from "../../../content/style/whiteTheme";
import { MainserverContext } from "@failean/mainserver-provider";
import { useContext,} from "react";

interface WhiteSideBarProps {
  mobileDrawerOpen: boolean;
  onMobileDrawerToggle: () => void;
}

const WhiteSideBar = ({
  mobileDrawerOpen,
  onMobileDrawerToggle,
}:WhiteSideBarProps) => {
  const navigate = useNavigate();

  const { isMobile } = useResponsive();

  const location = useLocation();

  const mainserver = useContext(MainserverContext);
  const axiosInstance = mainserver?.axiosInstance;

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
    { label: "CritiQ", route: "/critiq" },
  ];

  const handleMenuItemClick = (route: string) => {
    axiosInstance && axiosInstance.post("analytics/sidebar", { route });
    navigate(route);
    if (isMobile) {
      onMobileDrawerToggle();
    }
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) =>
        isMobile ? (
          <>
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
                primary={
                  item.label + (item.comingSoon ? " - Comming Soon!" : "")
                }
              />
            </ListItem>
          </>
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
        ))}
        {/*   {item.label === "Run CritIQ" && (
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {critiqSubItems.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    onClick={() => handleMenuItemClick(subItem.route)}
                    onMouseEnter={() => handleMouseEnter(subItem.route)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              borderRadius: "1rem",
              transition: "transform 0.3s ease-in-out",
              transform: hoveredItem === subItem.route ? "scale(1.1)" : "scale(1)",
              "&::before": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                bgcolor: whiteTheme.palette.primary.main,
                transform:
                  hoveredItem === subItem.route ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.2s ease-in-out",
              },
              "&:hover::before": {
                transform: "scaleX(1)",
              },
             
            }}
          
                  >
                    {subItem.route === "/critiq/ideascore" && (
                      <ListIcon
                        sx={{
                          color: whiteTheme.palette.primary.main,
                          mr: "0.5rem",
                        }}
                      />
                    )}
                    {subItem.route === "/critiq/critichat" && (
                      <EmojiObjectsIcon
                        sx={{
                          color: whiteTheme.palette.primary.main,
                          mr: "0.5rem",
                        }}
                      />
                    )}
                    {subItem.route === "/critiq/validationroadmap" && (
                      <DashboardIcon
                        sx={{
                          color: whiteTheme.palette.primary.main,
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
        </Box>
                      */}
    </List>
  );

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
          sx={{ height: "100%", boxShadow: `0 0 10px ${"rgba(31, 38, 135, 0.37)"}` }}
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
          <Box sx={{ bottom: 0, left: 0, p: 2}}>
          <Typography>Powered by <img style={{ marginLeft: 2, width: "40%"}} src={Logo} alt="Failean Logo" /> </Typography>
          </Box>
          open={mobileDrawerOpen}
          onClose={onMobileDrawerToggle}
        >
          {renderMenuItems()}
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
              <MenuIcon sx={{
                  color: "white" }} />
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
          <Box sx={{ bgcolor: "white", position: "absolute", bottom: 0, left: 0, p: 2, display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography>Powered by <img style={{ marginLeft: 2, width: "40%"}} src={Logo} alt="Failean Logo" /> </Typography>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default WhiteSideBar;
