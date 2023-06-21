import { Grid, TextField, Button, Typography, useTheme } from "@mui/material";
import {
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import { PromptName, WhiteModels } from "@failean/shared-types";
import { Dialog } from "@mui/material";
import { Feedback, Refresh, Save } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

interface PromptDialogProps {
  promptName: PromptName;
  idea: WhiteIdea | "NO IDEAS";
  setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>;
}

export const capitalize = (s: string) =>
  s
    .replace(/([A-Z])/g, " $1")
    .charAt(0)
    .toUpperCase() + s.replace(/([A-Z])/g, " $1").slice(1);

const PromptDialog = ({
  idea,
  promptName,
  setOpenPrompt,
}: PromptDialogProps) => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const [promptResultValue, setPromptResultValue] = useState<string>("");

  const fetchPromptResult = useCallback(async () => {
    if (axiosInstance && idea !== "NO IDEAS" && promptName !== "idea") {
      const { data } = await axiosInstance.post(
        "data/prompts/getPromptResult",
        {
          ideaId: idea?._id,
          promptName,
        }
      );

      setPromptResultValue(data.promptResult?.data || "");
    }
  }, [axiosInstance, idea, promptName]);

  useEffect(() => {
    fetchPromptResult();
  }, [fetchPromptResult]);

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
        .post("data/prompts/savePromptResult", {
          ideaId: idea !== "NO IDEAS" && idea._id,
          promptName,
          data: promptResultValue,
        })
        .then(({ data }) => {
          setPromptResultValue(data.response);
        });
  };

  const handleClose = () => setOpenPrompt("closed");

  const theme = useTheme();

  return (
    <Dialog
      open
      maxWidth="xl"
      PaperProps={{ sx: { width: "70vw" } }}
      onClose={handleClose}
    >
      <DialogTitle>
        <Grid container width="100%" justifyContent="space-between">
          <Grid item>
            <Button variant="outlined" onClick={fetchPromptResult}>
              <Refresh />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderColor: "red" }}
            >
              <CloseIcon sx={{ color: "red" }} />
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction="column"
          rowSpacing={2}
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Typography variant="h5" color={theme.palette.primary.main}>
              {capitalize(promptName)}
            </Typography>
          </Grid>
          <Grid item paddingBottom="2%">
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
          <Grid item container justifyContent="center" columnSpacing={2}>
            <Grid item>
              <Button
                variant="outlined"
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
                variant="outlined"
                disabled={
                  idea === "NO IDEAS" || !promptName || promptName === "idea"
                }
                onClick={() => !(!promptName || promptName === "idea") && run()}
              >
                <Feedback /> Provide feedback and run prompt
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                disabled={
                  idea === "NO IDEAS" || !promptName || promptName === "idea"
                }
                onClick={() =>
                  !(!promptName || promptName === "idea") && save()
                }
              >
                <Save /> Save Current Text as Prompt Result
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default PromptDialog;
