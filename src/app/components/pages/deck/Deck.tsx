import {useState, useEffect, useContext, useCallback} from "react";
import {Grid, Typography, Button} from "@mui/material";
import {MainserverContext} from "@failean/mainserver-provider";
import UserContext from "../../../context/UserContext";
import IdeaSelector from "../../common/IdeaSelector";
import capitalize from "../../../util/capitalize";
import DeckPage from "./DeckPage";

const Deck = () => {
    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;
    const {ideas} = useContext(UserContext);
    const [graph, setGraph] = useState([]);
    const [currentIdeaID, setCurrentIdeaID] = useState<string>(ideas[0]?._id || "");
    const [currentPage, setCurrentPage] = useState(0);

    const fetchGraph = useCallback(async () => {
        if (axiosInstance) {
            const {data} = await axiosInstance.get("data/prompts/getDeckPromptGraph");
            setGraph(data.graph);
        }
    }, [axiosInstance]);

    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    return (
        <Grid container direction="column" rowSpacing={3} alignItems="center" style={{marginTop: '20px'}}>
            {setCurrentIdeaID && (
                <Grid item>
                    <IdeaSelector
                        selectedIdeaID={currentIdeaID}
                        setSelectedIdeaID={setCurrentIdeaID}
                    />
                </Grid>
            )}
            <Grid item container direction="column" rowSpacing={6}>
                <Grid item>
                    <Typography variant="h2" textAlign="center" gutterBottom>
                        {capitalize(Object.keys(graph)[currentPage] || "")}
                    </Typography>
                </Grid>
                <Grid item>
                    <DeckPage category={graph[Object.keys(graph)[currentPage] as any] as any}
                              currentIdeaID={currentIdeaID}/>
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={currentPage <= 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{marginLeft: '20px'}}
                    disabled={currentPage >= Object.keys(graph).length - 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </Button>
            </Grid>
        </Grid>
    );
};

export default Deck;
