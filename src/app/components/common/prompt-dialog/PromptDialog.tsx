import {Grid, TextField, Button, Typography, Box, Switch} from "@mui/material";
import {
    useContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useCallback,
    useRef,
} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {PromptName, WhiteModels} from "@failean/shared-types";
import {Dialog} from "@mui/material";
import {Feedback, Refresh, Save, Warning} from "@mui/icons-material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import useResponsive from "../../../hooks/useRespnsive";
import capitalize from "../../../util/capitalize";
import {TypeOfSetOpenDialog} from "../../pages/aideator/AIdeator";
import {toast} from "react-toastify";
import ReactMarkdown from 'react-markdown'

type WhiteIdea = WhiteModels.Data.Ideas.WhiteIdea;

interface PromptDialogProps {
    promptName: PromptName;
    idea: WhiteIdea | "NO IDEAS";
    setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>;
    setOpenDialog: TypeOfSetOpenDialog;
    setPrice: Dispatch<SetStateAction<number>>;
}

const PromptDialog = ({
                          idea,
                          promptName,
                          setOpenPrompt,
                          setOpenDialog,
                          setPrice,
                      }: PromptDialogProps) => {
    const {theme, isMobile} = useResponsive();

    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;
    const [dbpromptResultValue, setdbPromptResultValue] = useState<string>("");
    const [promptResultValue, setPromptResultValue] = useState<string>("");
    const [preview, setPreview] = useState<boolean>(false);

    const [maxHeight, setMaxHeight] = useState("60vh");
    const [label, setLabel] = useState<string>("Run Prompt");
    const [saveLabel, setSaveLabel] = useState<string>(
        "Save Current Text as Prompt Result"
    );

    const fetchPromptResult = useCallback(async () => {
        if (axiosInstance && idea !== "NO IDEAS" && promptName !== "idea") {
            const {data} = await axiosInstance.post(
                "data/prompts/getPromptResult",
                {
                    ideaID: idea?._id,
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
        setLabel("Estimating cost...");
        let price = 9999;
        if (axiosInstance) {
            try {
                price = (
                    await axiosInstance.post("data/prompts/preRunPrompt", {
                        ideaID: idea !== "NO IDEAS" && idea?._id,
                        promptNames: [promptName],
                    })
                ).data.price;
                setPrice(price);
                setOpenDialog("run");
                setLabel("Run Prompt");
            } catch (e) {
                setLabel("Run Prompt");
            }
        }
    };

    const save = async () => {
        setSaveLabel("Trying to save...");
        try {
            if (axiosInstance) {
                await axiosInstance.post("data/prompts/savePromptResult", {
                    ideaID: idea !== "NO IDEAS" && idea._id,
                    promptName,
                    data: promptResultValue,
                    reason: "save",
                });
                setSaveLabel("Save Current Text as Prompt Result");
                fetchPromptResult();
            }
        } catch (e) {
            toast.error("Error while saving!!!");
            setSaveLabel("Save Current Text as Prompt Result");
        }
    };

    const handleClose = () => setOpenPrompt("closed");

    const dialogeRef = useRef<HTMLDivElement>(null);
    const textFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleResize = () => {
            const dialogHeight = dialogeRef.current?.clientHeight;
            const headerHeight = 64;

            if (dialogHeight) {
                let availableHeight = window.innerHeight - headerHeight - 100;
                setMaxHeight(`${availableHeight}px`);
            }
        };

        // Call it once to take effect when component is mounted
        handleResize();

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [promptResultValue]); // The empty dependency array makes sure the effect runs once on mount and cleanup on unmount

    return (
        <Dialog
            open
            style={{zIndex: 10}}
            maxWidth="xl"
            PaperProps={{
                sx: {
                    height: "calc(88vh - 64px)",
                    marginTop: "calc(4vh + 64px)",
                    ...(isMobile
                        ? {width: "90vw"}
                        : {
                            width: "calc(92vw - 240px)",
                            marginLeft: "calc(2vw + 240px)",
                        }),
                },
                ref: dialogeRef,
            }}
            onClose={handleClose}
        >
            <DialogTitle>
                <Grid
                    container
                    direction={isMobile ? "column-reverse" : "row"}
                    rowSpacing={2}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={fetchPromptResult}
                        >
                            <Refresh sx={{mr: 1}}/>
                            Reload Last Saved Result
                        </Button>
                    </Grid>
                    <Grid item> <Switch checked={preview} onChange={() => setPreview(!preview)}
                                        name="Preview Markdown"/>

                    </Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            onClick={handleClose}
                            variant="outlined"
                            sx={{borderColor: "red", color: "red"}}
                        >
                            <CloseIcon sx={{color: "red", mr: 1}}/>
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
                        {!preview ?
                            <TextField
                                ref={textFieldRef}
                                multiline
                                maxRows={1000}
                                variant="filled"
                                sx={{
                                    width: isMobile ? "80vw" : "60vw",
                                    height: `calc(${maxHeight} - ${isMobile ? 490 : 260}px)`,
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
                            :
                            <ReactMarkdown>{idea === "NO IDEAS"
                                ? "Create your first Ideas to validate it with AI"
                                : (promptName === "idea"
                                    ? idea.idea
                                    : promptResultValue)}</ReactMarkdown>}
                    </Grid>
                    {promptResultValue !== dbpromptResultValue && (
                        <Grid item paddingBottom="1%">
                            <Box display="flex" alignItems="center">
                                <Warning sx={{color: "warning.main", mr: 1}}/>
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
                                color="secondary"
                                variant="outlined"
                                disabled={
                                    idea === "NO IDEAS" ||
                                    !promptName ||
                                    promptName === "idea" ||
                                    label !== "Run Prompt"
                                }
                                onClick={() => !(!promptName || promptName === "idea") && run()}
                            >
                                <Refresh sx={{mr: 1}}/>
                                {label}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                variant="outlined"
                                disabled={
                                    idea === "NO IDEAS" || !promptName || promptName === "idea"
                                }
                                onClick={() =>
                                    !(!promptName || promptName === "idea") &&
                                    setOpenDialog("feedback")
                                }
                            >
                                <Feedback sx={{mr: 1}}/> Provide feedback and run prompt
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
                                    saveLabel !== "Save Current Text as Prompt Result"
                                }
                                onClick={() =>
                                    !(!promptName || promptName === "idea") && save()
                                }
                            >
                                <Save sx={{mr: 1}}/> {saveLabel}
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
