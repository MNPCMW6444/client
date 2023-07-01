import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { AutoFixHigh, Send, ViewSidebar } from "@mui/icons-material";
import UserContext from "../../../context/UserContext";
import { MainserverContext } from "@failean/mainserver-provider";

const CritiChat = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

  const { ideas } = useContext(UserContext);

  const [inputText, setInputText] = useState("");
  const [role, setRole] = useState({
    Angel: false,
    VC: false,
    Customer: false,
  });

  const [currentIdeaId, setCurrentIdeaId] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // set init§ial idea after ideas have loaded
  useEffect(() => {
    if (ideas.length > 0) {
      setCurrentIdeaId(ideas[0]._id);
    }
  }, [ideas]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole({ ...role, [event.target.name]: event.target.checked });
  };

  const handleQuestionGeneration = async () => {
    // Logic to generate a question from the CritiQ chat bot
  };

  const handleChatSubmission = async () => {
    if (inputText.trim() !== "") {
      // Logic to send the inputText to the chat bot and get the response
      // Update the chat history with the user's question and the bot's response
    }
    setInputText("");
  };

  const handleIdeaClick = (ideaId: string) => {
    setCurrentIdeaId(ideaId);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1em",
          overflow: "hidden",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Paper sx={{ width: "100%", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              padding: "1em",
            }}
          >
            <Box>
              <Typography>Chat history here</Typography>
              {/* Map over the chat history and display each chat message */}
            </Box>
            <Box
              sx={{
                display: "flex",
                mb: "10px",
                position: "fixed",
                bottom: "0",
                right: ["0", "0", "20%"],
                justifyContent: "center",
                aligncontent: "stretch",
                width: "50vw",
              }}
            >
              {inputText.trim() === "" && (
                <IconButton
                  onClick={handleQuestionGeneration}
                  aria-label="Generate a question"
                >
                  <AutoFixHigh />
                </IconButton>
              )}
              <TextField
                value={inputText}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                sx={{
                  flexGrow: 1,
                  mr: "10px",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }}
                multiline
              />
              <IconButton onClick={handleChatSubmission} aria-label="Send">
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CritiChat;
