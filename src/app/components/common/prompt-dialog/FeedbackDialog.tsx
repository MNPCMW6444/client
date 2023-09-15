import {Grid, Button, Typography, TextField} from "@mui/material";
import {useState, useContext} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {PromptName, WhiteModels} from "@failean/shared-types";
import {Dialog} from "@mui/material";
import {PlayArrow} from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import useResponsive from "../../../hooks/useRespnsive";
import capitalize from "../../../util/capitalize";
import {TypeOfSetOpenDialog} from "../../pages/aideator/AIdeator";
import AIdeatorContext from "../../../context/AIdeatorContext";

type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

interface FeedbackDialogProps {
    idea: WhiteIdea | "NO IDEAS";
    promptName: PromptName | PromptName[];
    setOpenDialog: TypeOfSetOpenDialog;
}

const FeedbackDialog = ({
                            idea,
                            promptName,
                            setOpenDialog,
                        }: FeedbackDialogProps) => {
    const {theme, isMobile} = useResponsive();

    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;

    const [feedback, setFeedback] = useState<string>("");
    const [label, setLabel] = useState<string>("Prepare Feedback");
    const [fbPrice, setFbPrice] = useState<number>(999999);
    const [fin, setFin] = useState<boolean>(false);

    const {setPolled} = useContext(AIdeatorContext);

    const prepare = async () => {
        setLabel("Estimating cost...");
        let price = 99999;
        if (axiosInstance) {
            try {
                price = (
                    await axiosInstance.post("data/prompts/preRunPrompt", {
                        ideaID: idea !== "NO IDEAS" && idea?._id,
                        promptNames: [promptName],
                    })
                ).data.price;
                setFbPrice(price);
                setLabel("Prepare Feedback");
                setFin(true);
            } catch (e) {
                setFbPrice(price);
                setLabel("Prepare Feedback");
                setFin(true);
            }
        }
    };

    const run = async () => {
        axiosInstance &&
        axiosInstance.post("data/prompts/runAndGetPromptResult", {
            ideaID: idea !== "NO IDEAS" && idea?._id,
            feedback,
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
            style={{zIndex: 20}}
            maxWidth="xl"
            PaperProps={{
                sx: {width: isMobile ? "80vw" : "60vw"},
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
                            color="secondary"
                            onClick={handleClose}
                            variant="outlined"
                            sx={{borderColor: "red", color: "red"}}
                        >
                            <CloseIcon sx={{color: "red", mr: 1}}/>
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
                    <Grid
                        item
                        container
                        justifyContent="center"
                        alignItems="center"
                        columnSpacing={2}
                    >
                        <Grid item>
                            <Typography variant="h6">Feedback:</Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                multiline
                                value={feedback}
                                onChange={(e) => {
                                    setFin(false);
                                    setFeedback(e.target.value);
                                }}
                            ></TextField>
                        </Grid>
                    </Grid>
                    {fbPrice !== 999999 && (
                        <Grid item>
                            <Typography variant="h6" textAlign="center">
                                Estimated cost: {Math.floor(fbPrice)} tokens
                            </Typography>
                        </Grid>
                    )}
                    <Grid
                        item
                        container
                        direction={"column"}
                        justifyContent="center"
                        alignItems="center"
                        columnSpacing={2}
                        rowSpacing={2}
                    >
                        <Grid item>
                            <Button
                                color="secondary"
                                variant="outlined"
                                disabled={
                                    idea === "NO IDEAS" ||
                                    !promptName ||
                                    promptName === "idea" ||
                                    !feedback
                                }
                                onClick={() =>
                                    !(!promptName || promptName === "idea") && prepare()
                                }
                            >
                                <PlayArrow sx={{mr: 1}}/>
                                {label}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                variant="outlined"
                                disabled={
                                    idea === "NO IDEAS" ||
                                    !promptName ||
                                    promptName === "idea" ||
                                    !fin
                                }
                                onClick={() => !(!promptName || promptName === "idea") && run()}
                            >
                                <PlayArrow sx={{mr: 1}}/>
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

export default FeedbackDialog;
