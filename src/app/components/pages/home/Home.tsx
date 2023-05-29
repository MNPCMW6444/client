import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import _ from "lodash";
import MainserverContext from "../../../context/MainserverContext";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const Home = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { user, ideas, refreshUserData } = useContext(UserContext);
  const [activeIdeaIndex, setActiveIdeaIndex] = useState<number>(
    ideas?.length === 0 ? ideas?.length : ideas?.length - 1
  );
  const [inputText, setInputText] = useState<string>(ideas[0]?.idea);
  const [saveStatus, setSaveStatus] = useState<string>("editing");

  const sendToServerRef = useRef(
    _.debounce((text) => {
      setSaveStatus("saving");
      activeIdeaIndex !== -1 &&
        ideas.length > 0 &&
        axiosInstance
          .post("data/saveRawIdea", {
            parent: ideas[activeIdeaIndex]._id,
            rawIdea: text,
          })
          .then(() => {
            setSaveStatus("saved");
          })
          .catch(() => {
            setSaveStatus("editing");
            toast("Error saving data to server");
          });
    }, 1000)
  );

  useEffect(() => {
    const sendToServer = sendToServerRef.current;
    return () => {
      if (ideas.length > 0) {
        sendToServer.cancel();
      }
    };
  }, [ideas.length]);

  useEffect(() => {
    const sendToServer = sendToServerRef.current;
    return () => {
      if (ideas.length > 0) {
        sendToServer.cancel();
      }
    };
  }, [ideas.length]);

  useEffect(() => {
    setInputText(ideas[activeIdeaIndex]?.idea);
  }, [ideas, activeIdeaIndex]);

  const handleInputChange = (event: any) => {
    const text = event.target.value;
    setInputText(text);
    setSaveStatus("editing");
    sendToServerRef.current(text);
  };

  return activeIdeaIndex === -1 || ideas.length === 0 ? (
    <Typography>Loading...</Typography>
  ) : (
    <>
      {ideas.length > 0 && (
        <Grid paddingTop="20px" container direction="column" rowSpacing={2}>
          <Grid item>
            <Typography>Hi {user.name}</Typography>
          </Grid>
          <Grid item>
            <Tabs
              variant="fullWidth"
              value={activeIdeaIndex}
              onChange={(e: any, x) => {
                setActiveIdeaIndex(x);
              }}
              aria-label="basic tabs example"
            >
              {ideas.reverse().map((idea, index) => (
                <Tab
                  key={index}
                  label={`${index + 1}: ${idea.idea?.substring(0, 15)}`}
                />
              ))}
            </Tabs>
          </Grid>
          <Grid item>
            <TextField
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
              <Typography>
                {saveStatus === "editing"
                  ? "In Edit..."
                  : saveStatus === "saving"
                  ? "Autosaving..."
                  : "Autosaved"}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  axiosInstance
                    .post("data/saveIdea", {
                      idea: inputText,
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
                <Add />
                New Idea
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Home;
