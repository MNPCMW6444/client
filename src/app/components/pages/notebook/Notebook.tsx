import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import MainserverContext from "../../../context/MainserverContext";
import { toast } from "react-toastify";
import { Add, Delete, Save } from "@mui/icons-material";
import { Button } from "@mui/material";

const Notebook = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { user, ideas, refreshUserData } = useContext(UserContext);
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
            >
              {ideas.map((idea, index) => (
                <Tab
                  key={index}
                  label={`${index + 1}: ${idea?.idea?.substring(0, 5)}...`}
                />
              ))}
              <Button
                onClick={() => {
                  axiosInstance
                    .post("data/saveIdea", {
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
              >
                new
                <Add />
              </Button>
            </Tabs>
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
                  axiosInstance
                    .post("data/saveIdea", {
                      idea: inputText,
                      ideaId: ideas[activeIdeaIndex]._id,
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
                  axiosInstance
                    .post("data/archiveIdea", {
                      ideaId: ideas[activeIdeaIndex]._id,
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
                Delele this Idea
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Notebook;
