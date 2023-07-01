import { useState, useContext, useEffect } from "react";
import { Paper, Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { ViewSidebar } from "@mui/icons-material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RunCritIQ from "./RunCritIQ";
import IdeaScore from "./IdeaScore";
import CritIQChat from "./CritiChat";
import ValidationRoadmap from "./ValidationRoadmap";
import UserContext from "../../../context/UserContext";

export default function Critiq() {
  const [value, setValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>("");

  useEffect(() => {
    if (ideas.length > 0) {
      setCurrentIdeaId(ideas[0]._id);
    }
  }, [ideas]);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };

  const handleIdeaClick = (ideaId: string) => {
    setCurrentIdeaId(ideaId);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderTabContent = () => {
    switch (value) {
      case "Run CritIQ":
        return <RunCritIQ />;
      case "Idea Score":
        return <IdeaScore />;
      case "CritIQ Chat":
        return <CritIQChat />;
      case "Validation Roadmap":
        return <ValidationRoadmap />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {sidebarOpen && (
        <Box
          sx={{
            width: ["100%", "100%", "25%"],
            overflowY: "auto",
            height: "100%",
            position: "relative",
          }}
        >
          <Paper
            sx={{
              height: "60vh",
              padding: "1em",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                style={{ position: "absolute", top: 10, right: 10 }}
                onClick={handleSidebarToggle}
                aria-label="Close Sidebar"
              >
                <ViewSidebar />
              </IconButton>
            </div>
            <List style={{ marginTop: 48 }}>
              {ideas.map((idea, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleIdeaClick(idea._id)}
                  selected={idea._id === currentIdeaId} // Add selected prop
                >
                  <ListItemText
                    primary={idea?.idea.split(" ").slice(0, 8).join(" ")}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
      {!sidebarOpen && (
        <IconButton
          onClick={handleSidebarToggle}
          style={{ color: "#333", margin: "10px", padding: "10px" }}
          aria-label="Open Sidebar"
        >
          <ViewSidebar />
        </IconButton>
      )}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Tabs
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="ritIQNav"
        >
          <Tab value="Run CritIQ" label="Run CritIQ" />
          <Tab value="Idea Score" label="Idea Score" />
          <Tab value="CritIQ Chat" label="CritIQ Chat" />
          <Tab value="Validation Roadmap" label="Validation Roadmap " />
        </Tabs>
        {renderTabContent()}
      </Box>
    </Box>
  );
}
