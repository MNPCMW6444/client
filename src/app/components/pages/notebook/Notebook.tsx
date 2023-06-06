import { useContext, useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import MainserverContext from "../../../context/WhiteserverContext";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
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

  return activeIdeaIndex === -1 || ideas.length === 0 ? (
    <Typography>Loading...</Typography>
  ) : (
    <>
      {ideas.length > 0 && (
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
              aria-label="basic tabs example"
            >
              {ideas.map((idea, index) => (
                <Tab
                  key={index}
                  label={`${index + 1}: ${idea?.idea?.substring(0, 5)}...`}
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
              <Typography>Add new to save currnet</Typography>
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

export default Notebook;
