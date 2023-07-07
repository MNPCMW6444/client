import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
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

  useEffect(() => {
    if (ideas.length > 0) {
      setCurrentIdeaId(ideas[0]._id);
    }
  }, [ideas]);

  const handleIdeaClick = (ideaId: string) => {
    setCurrentIdeaId(ideaId);
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
                    onChange={(event) =>
                      setCheckedState({
                        ...checkedState,
                        [event.target.name]: event.target.checked,
                      })
                    }
                    name="angel"
                  />
                }
                label="Angel"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState.vc}
                    onChange={(event) =>
                      setCheckedState({
                        ...checkedState,
                        [event.target.name]: event.target.checked,
                      })
                    }
                    name="vc"
                  />
                }
                label="VC"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState.customer}
                    onChange={(event) =>
                      setCheckedState({
                        ...checkedState,
                        [event.target.name]: event.target.checked,
                      })
                    }
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
