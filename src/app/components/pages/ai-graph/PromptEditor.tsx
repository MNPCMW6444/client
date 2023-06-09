import { Grid, TextField, Button, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import MainserverContext from "../../../context/WhiteserverContext";

interface PromptEditorProps {
  promptName: string;
  ideaId: string;
}

const PromptEditor = ({ ideaId, promptName }: PromptEditorProps) => {
  const { axiosInstance } = useContext(MainserverContext);
  const [promptResultValue, setPromptResultValue] = useState<string>("");

  useEffect(() => {
    const fetchPromptResult = async () => {
      const { data } = await axiosInstance.post("data/getPromptResult", {
        ideaId,
        promptName,
      });
      setPromptResultValue(data.promptResult.data);
    };
    fetchPromptResult();
  }, [axiosInstance, ideaId, promptName]);

  const run = async () => {
    setPromptResultValue("running....");
    axiosInstance
      .post("data/runAndGetPromptResult", {
        ideaId,
        promptName,
      })
      .then(({ data }) => {
        setPromptResultValue(data.response);
      });
  };

  return (
    <><Grid item><Typography>{promptName}</Typography></Grid>
    <Grid item><Typography>{ideaId}</Typography></Grid>
      <Grid item>
        <TextField
          multiline
          rows={24}
          variant="outlined"
          fullWidth
          onChange={(e) => setPromptResultValue(e.target.value)}
          value={promptResultValue}
        />
      </Grid>
      <Grid item container direction="column" alignItems="center">
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
