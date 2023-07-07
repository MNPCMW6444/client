// import React, { useState, useContext, useEffect } from "react";
// import {
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import { AutoFixHigh, Send, ViewSidebar } from "@mui/icons-material";
// import UserContext from "../../../context/UserContext";
// import { MainserverContext } from "@failean/mainserver-provider";

// const CritiChat = () => {
//   const mainserverContext = useContext(MainserverContext);
//   const axiosInstance = mainserverContext?.axiosInstance;

//   const { ideas } = useContext(UserContext);

//   const [inputText, setInputText] = useState("");
//   const [role, setRole] = useState({
//     Angel: false,
//     VC: false,
//     Customer: false,
//   });

//   const [currentIdeaID, setCurrentIdeaID] = useState<string>("");
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

//   // set initial idea after ideas have loaded
//   useEffect(() => {
//     if (ideas.length > 0) {
//       setCurrentIdeaID(ideas[0]._id);
//     }
//   }, [ideas]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(event.target.value);
//   };

//   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRole({ ...role, [event.target.name]: event.target.checked });
//   };

//   const handleQuestionGeneration = async () => {
//     // Logic to generate a question from the CritiQ chat bot
//   };

//   const handleChatSubmission = async () => {
//     if (inputText.trim() !== "") {
//       // Logic to send the inputText to the chat bot and get the response
//       // Update the chat history with the user's question and the bot's response
//     }
//     setInputText("");
//   };

//   const handleIdeaClick = (ideaID: string) => {
//     setCurrentIdeaID(ideaID);
//   };

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Grid
//       container
//       style={{
//         height: "100%",
//         width: "100%",
//         overflow: "hidden",
//         display: "flex",
//       }}
//     >
//       {sidebarOpen && (
//         <Grid
//           item
//           style={{
//             width: "25%",
//             overflowY: "auto",
//           }}
//         >
//           <Paper
//             style={{ height: "100%", padding: "1em", position: "relative" }}
//           >
//             <div style={{ display: "flex", justifyContent: "flex-end" }}>
//               <IconButton
//                 style={{ position: "absolute", top: 10, right: 10 }}
//                 onClick={handleSidebarToggle}
//                 aria-label="Close Sidebar"
//               >
//                 <ViewSidebar />
//               </IconButton>
//             </div>
//             <List style={{ marginTop: 48 }}>
//               {ideas.map((idea, index) => (
//                 <ListItem
//                   button
//                   key={index}
//                   onClick={() => handleIdeaClick(idea._id)}
//                   selected={idea._id === currentIdeaID} // Add selected prop
//                 >
//                   <ListItemText
//                     primary={idea?.idea.split(" ").slice(0, 8).join(" ")}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//       )}
//       {!sidebarOpen && (
//         <IconButton
//           onClick={handleSidebarToggle}
//           style={{ color: "#333", margin: "10px", padding: "10px" }}
//           aria-label="Open Sidebar"
//         >
//           <ViewSidebar />
//         </IconButton>
//       )}
//       <Grid
//         item
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "1em",
//           overflow: "hidden",
//           flex: 1,
//         }}
//       >
//         <Paper style={{ width: "100%", height: "100%" }}>
//           <Grid
//             container
//             direction="column"
//             justifyContent="space-between"
//             style={{ height: "100%", padding: "1em" }}
//           >
//             <Grid item>
//               <Typography>Chat history here</Typography>
//               {/* Map over the chat history and display each chat message */}
//             </Grid>
//             <Grid item style={{ display: "flex", marginBottom: "10px" }}>
//               {inputText.trim() === "" && (
//                 <IconButton
//                   onClick={handleQuestionGeneration}
//                   aria-label="Generate a question"
//                 >
//                   <AutoFixHigh />
//                 </IconButton>
//               )}
//               <TextField
//                 value={inputText}
//                 onChange={handleInputChange}
//                 placeholder="Ask a question..."
//                 style={{
//                   flexGrow: 1,
//                   marginRight: "10px",
//                   whiteSpace: "pre-wrap",
//                   overflowWrap: "break-word",
//                   wordWrap: "break-word",
//                 }}
//                 multiline
//               />
//               <IconButton onClick={handleChatSubmission} aria-label="Send">
//                 <Send />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default CritiChat;
import React from "react";

export default function critiChatGrid() {
  return <div>critiChatGrid</div>;
}
