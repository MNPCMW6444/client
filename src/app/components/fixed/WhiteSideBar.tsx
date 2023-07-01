import { useState, useEffect, FC } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useResponsive from "../../hooks/useRespnsive";

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

  const menuItems = [
    { label: "Idea Notebook", route: "/Notebook" },
    { label: "AIdeator", route: "/aideator" },
    { label: "Deck", route: "/deck" },
    { label: "Idea Backlog", route: "/backlog" },
    { label: "Run CritIQ", route: "/critiq/RunCritiQ" }
  ];

  const critiqSubItems = [
    { label: "Idea Score", route: "/critiq/IdeaScore" },
    { label: "CritIQ Chat", route: "/critiq/CritiChat" },
    { label: "Validation Roadmap", route: "/critiq/ValidationRoadMap" },
  ];

  useEffect(() => {
    const isCritiqRoute = ["/critiq/RunCritiQ", ...critiqSubItems.map(item => item.route)].includes(location.pathname);
    setOpenSubMenu(isCritiqRoute);
  }, [location, critiqSubItems]);

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    if (isMobile) {
      onMobileDrawerToggle();
    }
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) => (
        <div key={index}>
          <ListItem
            onClick={() => handleMenuItemClick(item.route)}
            sx={{
              bgcolor: location.pathname.startsWith(item.route) ? "action.selected" : "inherit",
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
          {item.label === 'Run CritIQ' && (
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {critiqSubItems.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    onClick={() => handleMenuItemClick(subItem.route)}
                    sx={{
                      bgcolor: location.pathname === subItem.route ? "action.selected" : "inherit",
                      pl: 4,
                    }}
                  >
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
