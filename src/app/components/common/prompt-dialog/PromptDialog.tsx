import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import {
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { MainserverContext } from "@failean/mainserver-provider";
import { PromptName, WhiteModels } from "@failean/shared-types";
import { Dialog } from "@mui/material";
import { Feedback, Refresh, Save, Warning } from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import useResponsive from "../../../hooks/useRespnsive";
import capitalize from "../../../util/capitalize";

type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

interface PromptDialogProps {
  promptName: PromptName;
  idea: WhiteIdea | "NO IDEAS";
  setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>;
}

const PromptDialog = ({
  idea,
  promptName,
  setOpenPrompt,
}: PromptDialogProps) => {
  const { theme, isMobile } = useResponsive();

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const [dbpromptResultValue, setdbPromptResultValue] = useState<string>("");
  const [promptResultValue, setPromptResultValue] = useState<string>("");

  const [maxHeight, setMaxHeight] = useState("60vh");

  const fetchPromptResult = useCallback(async () => {
    if (axiosInstance && idea !== "NO IDEAS" && promptName !== "idea") {
      const { data } = await axiosInstance.post(
        "data/prompts/getPromptResult",
        {
          ideaId: idea?._id,
          promptName,
        }
      );
      const res = data.promptResult?.data || "";

      setdbPromptResultValue(res);
      setPromptResultValue(res);
    }
  }, [axiosInstance, idea, promptName]);

  useEffect(() => {
    fetchPromptResult();
  }, [fetchPromptResult]);

  const run = async () => {
    if (axiosInstance)
      axiosInstance
        .post("data/prompts/preRunPrompt", {
          ideaId: idea !== "NO IDEAS" && idea?._id,
          promptName,
        })
        .then(({ data }) => {
          debugger;
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
        .then(({ data }) => {});
  };

  const handleClose = () => setOpenPrompt("closed");

  const dialogeRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (
        dialogeRef.current?.clientHeight &&
        textFieldRef.current?.clientHeight
      ) {
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.visibility = "hidden";
        tempDiv.style.height = "auto";
        tempDiv.style.width = textFieldRef.current.clientWidth + "px";
        tempDiv.style.padding = textFieldRef.current.style.padding;
        tempDiv.style.fontSize = textFieldRef.current.style.fontSize;
        tempDiv.style.lineHeight = textFieldRef.current.style.lineHeight;
        tempDiv.style.fontFamily = textFieldRef.current.style.fontFamily;
        tempDiv.style.fontWeight = textFieldRef.current.style.fontWeight;
        tempDiv.style.fontStyle = textFieldRef.current.style.fontStyle;
        tempDiv.style.whiteSpace = textFieldRef.current.style.whiteSpace;
        tempDiv.innerText = textFieldRef.current.value;
        document.body.appendChild(tempDiv);

        const visibleHeight = tempDiv.clientHeight;

        let spaceTakenByOtherElements =
          dialogeRef.current.clientHeight - visibleHeight;
        document.body.removeChild(tempDiv);

        let availableHeight = window.innerHeight - spaceTakenByOtherElements;
        setMaxHeight(`${availableHeight}px`);
      } else setMaxHeight("10vh");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [promptResultValue]);

  return (
    <Dialog
      open
      maxWidth="xl"
      PaperProps={{
        sx: { width: isMobile ? "90vw" : "70vw" },
        ref: dialogeRef,
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
            <Button variant="outlined" onClick={fetchPromptResult}>
              <Refresh sx={{ mr: 1 }} />
              Reload Last Saved Result
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderColor: "red", color: "red" }}
            >
              <CloseIcon sx={{ color: "red", mr: 1 }} />
              Close
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
          <Grid item paddingBottom="1%">
            <TextField
              ref={textFieldRef}
              multiline
              maxRows={1000}
              variant="filled"
              sx={{
                width: isMobile ? "80vw" : "60vw",
                height: { maxHeight },
                overflow: "auto",
              }}
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
          {promptResultValue !== dbpromptResultValue && (
            <Grid item paddingBottom="1%">
              <Box display="flex" alignItems="center">
                <Warning sx={{ color: "warning.main", mr: 1 }} />
                <Typography color="warning.main">unsaved changes</Typography>
              </Box>
            </Grid>
          )}
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
                <Refresh sx={{ mr: 1 }} />
                Run Prompt
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
                <Feedback sx={{ mr: 1 }} /> Provide feedback and run prompt
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
                <Save sx={{ mr: 1 }} /> Save Current Text as Prompt Result
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
