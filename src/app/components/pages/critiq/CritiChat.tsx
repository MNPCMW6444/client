import React, { useState, useContext, useEffect, useRef } from "react";
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
  Divider,
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
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // set initial idea after ideas have loaded
  useEffect(() => {
    if (ideas.length > 0) {
      setCurrentIdeaId(ideas[0]._id);
    }
  }, [ideas]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChatSubmission();
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole({ ...role, [event.target.name]: event.target.checked });
  };

  const handleQuestionGeneration = async () => {
    // Logic to generate a question from the CritiQ chat bot
  };

  const handleChatSubmission = async () => {
    if (inputText.trim() !== "") {
      const newMessage = `User: ${inputText.trim()}`;
      setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
    }
    setInputText("");
  };

  const handleIdeaClick = (ideaId: string) => {
    setCurrentIdeaId(ideaId);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
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
            <Box
              sx={{
                flexGrow: 1,
                overflow: "auto",
                mb: "1em",
                p: "1em",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              ref={chatHistoryRef}
            >
              {chatHistory.map((message, index) => (
                <React.Fragment key={index}>
                  <Typography>{message}</Typography>
                  <Divider />
                </React.Fragment>
              ))}
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
                onKeyPress={handleKeyPress}
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