import { useState, useEffect, FC, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
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

  const handleIdeaSelect = (event: SelectChangeEvent<string>) => {
    setSelectedIdeaId(event.target.value);
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
          <>
            <Select
              value={selectedIdeaId}
              onChange={handleIdeaSelect}
              variant="outlined"
              displayEmpty
              sx={{
                width: "calc(100% - 20px)",
                mt: "16px",
                ml: "10px",
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
            },
          }}
        >
          <>
            <Select
              value={selectedIdeaId}
              onChange={handleIdeaSelect}
              variant="outlined"
              displayEmpty
              sx={{
                width: "calc(100% - 20px)",
                mt: "10px",
                ml: "10px",
                maxWidth: "220px",
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
      )}
    </Box>
  );
};

export default WhiteSideBar;
