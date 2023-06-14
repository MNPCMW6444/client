import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import MainserverContext from "../../../context/WhiteserverContext";
import { PromptName } from "@failean/shared-types";

interface PromptEditorProps {
  promptName: PromptName;
  idea: any;
}

const PromptEditor = ({ idea, promptName }: PromptEditorProps) => {
  const { axiosInstance } = useContext(MainserverContext);
  const [promptResultValue, setPromptResultValue] = useState<string>("");

  useEffect(() => {
    const fetchPromptResult = async () => {
      const { data } = await axiosInstance.post("data/getPromptResult", {
        ideaId: idea?._id,
        promptName,
      });
      setPromptResultValue(data.promptResult?.data || "");
    };
    promptName !== "idea" && fetchPromptResult();
  }, [axiosInstance, idea, promptName]);

  const run = async () => {
    setPromptResultValue("running....");
    axiosInstance
      .post("data/runAndGetPromptResult", {
        ideaId: idea._id,
        promptName,
      })
      .then(({ data }) => {
        setPromptResultValue(data.response);
      });
  };

  const save = async () => {
    axiosInstance
      .post("data/xxx", {
        ideaId: idea._id,
        promptName,
      })
      .then(({ data }) => {
        setPromptResultValue(data.response);
      });
  };

  return (
    <Paper sx={{ bgcolor: "#0000FF10" }}>
      <Grid container direction="column" rowSpacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h6">
            {promptName
              .replace(/([A-Z])/g, " $1")
              .charAt(0)
              .toUpperCase() + promptName.replace(/([A-Z])/g, " $1").slice(1)}
          </Typography>
        </Grid>
        <Grid item>
          {idea === "NO IDEAS" ? (
            <Typography>
              Create your first Ideas to validate it with AI
            </Typography>
          ) : (
            <TextField
              multiline
              rows={24}
              variant="outlined"
              onChange={(e) => setPromptResultValue(e.target.value)}
              value={promptName === "idea" ? idea.idea : promptResultValue}
              disabled={promptName === "idea"}
            />
          )}
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Button
              disabled={!promptName || promptName === "idea"}
              onClick={() => !(!promptName || promptName === "idea") && run()}
            >
              run$
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={true || !promptName || promptName === "idea"}
              onClick={() => !(!promptName || promptName === "idea") && save()}
            >
              override manual
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PromptEditor;
