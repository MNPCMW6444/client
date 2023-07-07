import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import {
  Tab,
  Tabs,
  TabScrollButton,
  TextField,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import { toast } from "react-toastify";
import { Add, Delete, Save } from "@mui/icons-material";
import { Button } from "@mui/material";

const Notebook = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const { ideas, refreshUserData } = useContext(UserContext);
  const [activeIdeaIndex, setActiveIdeaIndex] = useState<number>(0);
  const [inputText, setInputText] = useState<string>(ideas[0]?.idea);

  useEffect(() => {
    setInputText(ideas[activeIdeaIndex]?.idea);
  }, [ideas, activeIdeaIndex]);

  const handleInputChange = (event: any) => {
    const text = event.target.value;
    setInputText(text);
  };

  return !ideas ? (
    <Typography>Loading...</Typography>
  ) : (
    <>
      {ideas && (
        <Grid container direction="column" rowSpacing={2}>
          <Grid item container alignItems="center">
            <Tabs
              value={activeIdeaIndex}
              onChange={(e: any, x) => {
                setActiveIdeaIndex(x);
              }}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              style={{ flex: 1 }}
            >
              {ideas.map((idea, index) => (
                <Tooltip title={idea.idea} key={index}>
                  <Tab
                    label={`${index + 1}: ${idea.idea.substring(0, 30)}...`}
                  />
                </Tooltip>
              ))}
              <TabScrollButton direction="right" orientation="horizontal" />
            </Tabs>
            <Button
              onClick={() => {
                if (axiosInstance)
                  axiosInstance
                    .post("data/ideas/saveIdea", {
                      idea: " ",
                    })
                    .then(() => {
                      refreshUserData();
                    })
                    .catch(() => {
                      refreshUserData();
                      toast("Error saving data to server");
                    });
              }}
              style={{ marginLeft: "16px" }}
            >
              New <Add />
            </Button>
          </Grid>
          <Grid item>
            <TextField
              disabled={ideas.length === 0}
              multiline
              rows={10}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              value={inputText}
            />
          </Grid>
          <Grid item container columnSpacing={4}>
            <Grid item>
              <Button
                disabled={ideas.length === 0}
                onClick={() => {
                  if (axiosInstance)
                    axiosInstance
                      .post("data/ideas/saveIdea", {
                        idea: inputText,
                        ideaID: ideas[activeIdeaIndex]._id,
                      })
                      .then(() => {
                        refreshUserData();
                      })
                      .catch(() => {
                        refreshUserData();
                        toast("Error saving data to server");
                      });
                }}
              >
                <Save />
                Save this Idea
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={ideas.length === 0}
                onClick={() => {
                  if (axiosInstance)
                    axiosInstance
                      .post("data/ideas/archiveIdea", {
                        ideaID: ideas[activeIdeaIndex]._id,
                      })
                      .then(() => {
                        refreshUserData();
                      })
                      .catch(() => {
                        refreshUserData();
                        toast("Error saving data to server");
                      });
                }}
              >
                <Delete />
                Delete this Idea
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Notebook;
