import { Grid, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import { PromptName, WhiteModels } from "@failean/shared-types";
import { Dialog } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import useResponsive from "../../../hooks/useRespnsive";
import capitalize from "../../../util/capitalize";
import { TypeOfSetOpenDialog } from "../../pages/aideator/AIdeator";
import AIdeatorContext from "../../../context/AIdeatorContext";

type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

interface RunDialogProps {
  idea: WhiteIdea | "NO IDEAS";
  promptName: PromptName | PromptName[];
  setOpenDialog: TypeOfSetOpenDialog;
  price: number;
}

const RunDialog = ({
  idea,
  promptName,
  setOpenDialog,
  price,
}: RunDialogProps) => {
  const { theme, isMobile } = useResponsive();

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

  const { setPolled } = useContext(AIdeatorContext);

  const run = async () => {
    axiosInstance &&
      axiosInstance.post("data/prompts/runAndGetPromptResult", {
        ideaId: idea !== "NO IDEAS" && idea?._id,
        promptNames:
          promptName[0].length && promptName[0].length > 2
            ? promptName
            : [promptName],
      });
    setPolled &&
      setPolled((pp) => {
        const arr =
          promptName[0].length && promptName[0].length > 2
            ? promptName
            : [promptName];
        (arr as PromptName[]).forEach((p) => p !== "idea" && pp.push(p));
        return pp;
      });
    setOpenDialog("closed");
  };

  const handleClose = () => setOpenDialog("closed");

  return (
    <Dialog
      open
      style={{ zIndex: 20 }}
      maxWidth="xl"
      PaperProps={{
        sx: { width: isMobile ? "80vw" : "60vw" },
      }}
      onClose={handleClose}
    >
      <DialogTitle>
        <Grid
          container
          width="§0%"
          direction={isMobile ? "column-reverse" : "row"}
          rowSpacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderColor: "red", color: "red" }}
            >
              <CloseIcon sx={{ color: "red", mr: 1 }} />
              Cancel
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
            <Typography variant="h4" color={theme.palette.primary.main}>
              {capitalize(
                promptName[0].length && promptName[0].length > 2
                  ? "MultiPrompt Run"
                  : (promptName as PromptName)
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" textAlign="center">
              Estimated cost: {price} tokens
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction={isMobile ? "column" : "row"}
            justifyContent="center"
            alignItems="center"
            columnSpacing={2}
            rowSpacing={2}
          >
            <Grid item>
              <Button
                variant="outlined"
                disabled={
                  idea === "NO IDEAS" || !promptName || promptName === "idea"
                }
                onClick={() => !(!promptName || promptName === "idea") && run()}
              >
                <PlayArrow sx={{ mr: 1 }} />
                Run
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default RunDialog;
