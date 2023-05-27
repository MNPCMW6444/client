import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import { Grid, TextField, Typography } from "@mui/material";
import _ from "lodash";
import { MainServerContext } from "../../../context/MainServerContext";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Home() {
  const { user, lastRawIdea, ideas } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const [saveStatus, setSaveStatus] = useState("editing");

  const axiosInstance = useContext(MainServerContext);

  const sendToServerRef = useRef(
    _.debounce((text) => {
      setSaveStatus("saving");
      axiosInstance
        .post("data/rawidea", { idea: text })
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
    return () => sendToServerRef.current.cancel();
  }, []);

  useEffect(() => {
    inputText === "" && setInputText(lastRawIdea);
  }, [lastRawIdea]);

  const handleInputChange = (event: any) => {
    const text = event.target.value;
    setInputText(text);
    setSaveStatus("editing");
    sendToServerRef.current(text);
  };

  return (
    <Grid paddingTop="20px" container direction="column" rowSpacing={2}>
      <Grid item>
        <Typography>Hi {user.name}</Typography>
      </Grid>
      <Grid item>
        {ideas.length > 0 ? (
          <Typography>Here</Typography>
        ) : (
          <TextField
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
            value={inputText}
          />
        )}
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
          <Button>
            <Add />
            New Idea
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
