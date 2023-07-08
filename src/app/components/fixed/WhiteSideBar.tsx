import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import useResponsive from "../../hooks/useRespnsive";
import { MainserverContext } from "@failean/mainserver-provider";
import { useContext } from "react";

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
                    fontSize: {
                      xs: "0.6rem",
                      sm: "1rem",
                    },
                  }}
                >
                  Coming Soon!
                </Typography>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      )}
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
          {renderMenuItems()}
        </Drawer>
      )}
    </Box>
  );
};

export default WhiteSideBar;
