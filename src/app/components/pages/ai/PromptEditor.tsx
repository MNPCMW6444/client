import { Grid, TextField, Button } from "@mui/material";
import { useContext, Dispatch, SetStateAction } from "react";
import MainserverContext from "../../../context/WhiteserverContext";

interface PromptEditorProps {
  curentPromptResultValue?: string;
  setCurrentPromptResultValue: Dispatch<SetStateAction<string | undefined>>;
  ideaId: string;
  promptName: string;
}

const PromptEditor = ({
  curentPromptResultValue,
  setCurrentPromptResultValue,
  ideaId,
  promptName,
}: PromptEditorProps) => {
  const { axiosInstance } = useContext(MainserverContext);

  const run = async () => {
    setCurrentPromptResultValue("running....");
    axiosInstance
      .post("data/runAndGetPromptResult", {
        ideaId,
        promptName,
      })
      .then(({ data }) => {
        setCurrentPromptResultValue(data.response);
      });
  };

  return (
    <>
      <Grid item width="40%">
        <TextField
          multiline
          rows={24}
          variant="outlined"
          fullWidth
          onChange={(e) => setCurrentPromptResultValue(e.target.value)}
          value={curentPromptResultValue}
        />
      </Grid>
      <Grid item width="20%" container direction="column" alignItems="center">
        <Grid item>
          <Button onClick={run}>run$</Button>
        </Grid>
        <Grid item>
          <Button>override manual</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PromptEditor;
