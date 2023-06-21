import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import { PromptName, WhiteModels } from "@failean/shared-types";
import { Dialog } from "@mui/material";
import { Feedback, Refresh, Save } from "@mui/icons-material";
type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

interface PromptDialogProps {
  promptName: PromptName;
  idea: WhiteIdea | "NO IDEAS";
}

export const capitalize = (s: string) =>
  s
    .replace(/([A-Z])/g, " $1")
    .charAt(0)
    .toUpperCase() + s.replace(/([A-Z])/g, " $1").slice(1);

const PromptDialog = ({ idea, promptName }: PromptDialogProps) => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const [promptResultValue, setPromptResultValue] = useState<string>("");

  useEffect(() => {
    const fetchPromptResult = async () => {
      if (axiosInstance) {
        const { data } = await axiosInstance.post(
          "data/prompts/getPromptResult",
          {
            ideaId: idea !== "NO IDEAS" && idea?._id,
            promptName,
          }
        );

        setPromptResultValue(data.promptResult?.data || "");
      }
    };
    idea !== "NO IDEAS" && promptName !== "idea" && fetchPromptResult();
  }, [axiosInstance, idea, promptName]);

  const run = async () => {
    setPromptResultValue("running....");
    if (axiosInstance)
      axiosInstance
        .post("data/prompts/runAndGetPromptResult", {
          ideaId: idea !== "NO IDEAS" && idea?._id,
          promptName,
        })
        .then(({ data }) => {
          setPromptResultValue(data);
        });
  };

  const save = async () => {
    if (axiosInstance)
      axiosInstance
        .post("data/prompts/savePromptsResult", {
          ideaId: idea !== "NO IDEAS" && idea._id,
          promptName,
        })
        .then(({ data }) => {
          setPromptResultValue(data.response);
        });
  };

  return (
    <Dialog open maxWidth="xl" PaperProps={{ sx: { width: "70vw" } }}>
      <Grid
        container
        direction="column"
        rowSpacing={2}
        alignItems="center"
        wrap="nowrap"
        paddingTop="5%"
        paddingBottom="5%"
      >
        <Grid item>
          <Typography variant="h6">{capitalize(promptName)}</Typography>
        </Grid>
        <Grid item>
          <TextField
            multiline
            rows={20}
            variant="filled"
            sx={{ width: "50vw" }}
            onChange={(e) => setPromptResultValue(e.target.value)}
            value={
              idea === "NO IDEAS"
                ? "Create your first Ideas to validate it with AI"
                : promptName === "idea"
                ? idea.idea
                : promptResultValue
            }
            disabled={idea === "NO IDEAS" || promptName === "idea"}
          />
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item>
            <Button
              disabled={
                idea === "NO IDEAS" || !promptName || promptName === "idea"
              }
              onClick={() => !(!promptName || promptName === "idea") && run()}
            >
              <Refresh /> Run Prompt
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={
                idea === "NO IDEAS" || !promptName || promptName === "idea"
              }
              onClick={() => !(!promptName || promptName === "idea") && run()}
            >
              <Feedback /> Provide feedback
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={
                true ||
                idea === "NO IDEAS" ||
                !promptName ||
                promptName === "idea"
              }
              onClick={() => !(!promptName || promptName === "idea") && save()}
            >
              <Save /> Save Current Text as Prompt Result
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PromptDialog;
