import {useState, useEffect, useContext, useCallback} from "react";
import {Grid, Typography} from "@mui/material";
import {MainserverContext} from "@failean/mainserver-provider";
import UserContext from "../../../context/UserContext";
import IdeaSelector from "../../common/IdeaSelector";

const Deck = () => {
    const mainserverContext = useContext(MainserverContext);
    const axiosInstance = mainserverContext?.axiosInstance;
    const {ideas} = useContext(UserContext);
    const [graph, setGraph] = useState([]);
    const [currentIdeaID, setCurrentIdeaID] = useState<string>(
        ideas[0]?._id || ""
    );

    const fetchGraph = useCallback(async () => {
        if (axiosInstance) {
            const {data} = await axiosInstance.get(
                "data/prompts/getDeckPromptGraph"
            );
            setGraph(data.graph);
        }
    }, [axiosInstance]);

    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    return (
        <Grid container direction="column" rowSpacing={10} alignItems="center">
            {setCurrentIdeaID && (
                <Grid item>
                    <IdeaSelector
                        selectedIdeaID={currentIdeaID}
                        setSelectedIdeaID={setCurrentIdeaID}
                    />
                </Grid>
            )}
            <Grid item>
                {Object.keys(graph).map((key) => (
                    <>
                        <Typography variant="h4">{key}</Typography>
                        {(graph[key as any] as any).map((name: any) => (
                            <Typography>{name}</Typography>
                        ))}
                    </>
                ))}
            </Grid>
        </Grid>
    );
};

export default Deck;
