import React, {useState, useContext, Dispatch, SetStateAction, useMemo, memo} from "react";
import {Grid, Typography, Button, Box} from "@mui/material";
import PromptDialog from "../../common/prompt-dialog/PromptDialog";
import {PromptName} from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";
import {History} from "@mui/icons-material";
import AIdeatorContext from "../../../context/AIdeatorContext";
import UserContext from "../../../context/UserContext";
import {MainserverContext} from "@failean/mainserver-provider";
import RunDialog from "../../common/prompt-dialog/RunDialog";
import FeedbackDialog from "../../common/prompt-dialog/FeedbackDialog";
import {useNavigate} from "react-router-dom";
import Graph from "./Graph";
import {usePolling} from "../../../hooks/usePolling";

export type TypeOfOpenDialog = "closed" | "run" | "feedback";
export type TypeOfSetOpenDialog = Dispatch<SetStateAction<TypeOfOpenDialog>>;

const AIdeator = () => {
    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;
    const {ideas, tokens} = useContext(UserContext);
    const {currentIdeaID, setCurrentIdeaID, graph, loaded} = useContext(AIdeatorContext);

    const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");
    const [openDialog, setOpenDialog] = useState<TypeOfOpenDialog>("closed");
    const [price, setPrice] = useState<number>(999999);

    const missing = useMemo(() => {
        return graph
            .map(({name, result}: any) => {
                if (result === "empty" || result === "One of the dependencies or feedback is invalid, please try to change it")
                    return name;
                return !(result?.length > 2) ? name : null;
            })
            .filter((name: any) => name) as PromptName[];
    }, [graph]);


    const newPolled = usePolling(axiosInstance);


    const navigate = useNavigate();

    return ideas.length > 0 ? (
        <>
            {openPrompt !== "closed" && !(Array.isArray(openPrompt) && openPrompt[0].length > 2) && (
                <PromptDialog
                    idea={ideas.find(({_id}) => _id === currentIdeaID) || "NO IDEAS"}
                    promptName={openPrompt}
                    setOpenPrompt={setOpenPrompt}
                    setOpenDialog={setOpenDialog}
                    setPrice={setPrice}
                />
            )}
            {openDialog !== "closed" && (
                openDialog === "run" ? (
                    <RunDialog
                        idea={ideas.find(({_id}) => _id === currentIdeaID) || "NO IDEAS"}
                        promptName={openPrompt}
                        setOpenDialog={setOpenDialog}
                        price={price}
                    />
                ) : (
                    <FeedbackDialog
                        idea={ideas.find(({_id}) => _id === currentIdeaID) || "NO IDEAS"}
                        promptName={openPrompt}
                        setOpenDialog={setOpenDialog}
                    />
                )
            )}
            <Grid container direction="column" rowSpacing={4} alignItems="center">
                {setCurrentIdeaID && (
                    <Grid item>
                        <IdeaSelector selectedIdeaID={currentIdeaID} setSelectedIdeaID={setCurrentIdeaID}/>
                    </Grid>
                )}
                <Grid item>
                    <Typography variant="h4">Token Balance: {tokens}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={() => navigate("/manage")}>See History <History/></Button>
                </Grid>
                <Grid item>
                    <Box sx={{overflow: "scroll"}}>
                        {graph.length > 0 ? (
                            <Graph tempGraph={graph} missing={missing} newPolled={newPolled}
                                   currentIdeaID={currentIdeaID}
                                   setOpenPrompt={setOpenPrompt} setPrice={setPrice} setOpenDialog={setOpenDialog}
                            />
                        ) : (
                            <Typography>Loading {loaded}...</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    ) : (
        <Typography variant="h4">
            Please save at least one idea before using AIdeator
        </Typography>
    );
};

export default memo(AIdeator);
