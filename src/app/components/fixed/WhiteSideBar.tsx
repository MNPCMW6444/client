import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";

interface WhiteSideBarProps {
  mobileDrawerOpen: boolean;
  onMobileDrawerToggle: () => void;
}

const WhiteSideBar: FC<WhiteSideBarProps> = ({
  mobileDrawerOpen,
  onMobileDrawerToggle,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  // Add a 'disabled' and 'comingSoon' property to the CritiQ object
  const menuItems = [
    { label: "Notebook", route: "/" },
    { label: "AIDeator", route: "/aideator" },
    { label: "About", route: "/about" },
    { label: "CritiQ", route: "/critiq", disabled: true, comingSoon: true },
  ];

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    if (isMobile) {
      onMobileDrawerToggle();
    }
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) => (
        <ListItem
          key={index}
          onClick={() => !item.disabled && handleMenuItemClick(item.route)}
          sx={{
            bgcolor:
              location.pathname === item.route ? "action.selected" : "inherit",
          }}
          disabled={item.disabled}
        >
          <ListItemText primary={item.label} />
          {item.comingSoon && (
            <ListItemSecondaryAction>
              <Typography variant="body2" color="text.secondary">
                Coming Soon!
              </Typography>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      ))}
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
