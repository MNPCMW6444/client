import React, { useState, useEffect, useContext } from "react";
import { Paper, Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { ViewSidebar } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Questionire from "./CritIQuest";
import UserContext from "../../../context/UserContext";

export default function RunCritiq() {
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    if (ideas.length > 0) {
      setCurrentIdeaId(ideas[0]._id);
    }
  }, [ideas]);

  const handleIdeaClick = (ideaId: string) => {
    setCurrentIdeaId(ideaId);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [value, setValue] = useState("");
  const [Category, setCategory] = useState("");
  const [ideaId, setIdeaId] = useState<string>("");
  const [checkedState, setCheckedState] = useState({
    angel: false,
    vc: false,
    customer: false,
  });

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
                  selected={idea._id === currentIdeaId}
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
        <Grid
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Typography
              align="center"
              variant="h2"
              sx={{ fontFamily: "sans-serif", margin: "15px" }}
            >
              CritIQ
            </Typography>
            <Typography align="center" variant="h6">
              Let CritIQ test your idea
            </Typography>
          </Grid>
          <Grid
            container
            item
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={6} display="flex" justifyContent="center">
              <Questionire />
            </Grid>
          </Grid>

          <Grid item>
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState.angel}
                    onChange={(event) => setCheckedState({
                      ...checkedState,
                      [event.target.name]: event.target.checked,
                    })}
                    name="angel"
                  />
                }
                label="Angel"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState.vc}
                    onChange={(event) => setCheckedState({
                      ...checkedState,
                      [event.target.name]: event.target.checked,
                    })}
                    name="vc"
                  />
                }
                label="VC"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState.customer}
                    onChange={(event) => setCheckedState({
                      ...checkedState,
                      [event.target.name]: event.target.checked,
                    })}
                    name="TechWhiz"
                  />
                }
                label="Tech Whiz"
              />
            </FormGroup>
          </Grid>

          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            direction="row"
            rowSpacing={0}
          ></Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained">Run CritIQ</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}