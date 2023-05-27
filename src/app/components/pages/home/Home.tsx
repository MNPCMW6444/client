import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import _ from "lodash";
import { MainServerContext } from "../../../context/MainServerContext";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const Home = () => {
  const { getUser, user, lastRawIdea, ideas } = useContext(UserContext);
  const [inputText, setInputText] = useState<string>(lastRawIdea);
  const [saveStatus, setSaveStatus] = useState<string>("editing");
  const [activeIdeaIndex, setActiveIdeaIndex] = useState<number>(
    ideas.length - 1
  );

  const axiosInstance = useContext(MainServerContext);

  const sendToServerRef = useRef(
    _.debounce((text) => {
      setSaveStatus("saving");
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
    setInputText(lastRawIdea);
  }, [lastRawIdea]);

  const handleInputChange = (event: any) => {
    const text = event.target.value;
    setInputText(text);
    setSaveStatus("editing");
    sendToServerRef.current(text);
  };

  return (
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
              onChange={(e: any) => {
                debugger;
                setActiveIdeaIndex(e);
              }}
              aria-label="basic tabs example"
            >
              {ideas.map((idea) => (
                <Tab label={idea.idea.substring(0, 15)} />
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
                  ? "Waiting one second after last edit to save..."
                  : saveStatus === "saving"
                  ? "Saving..."
                  : "Saved to server"}
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
                      getUser();
                    })
                    .catch(() => {
                      getUser();
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
