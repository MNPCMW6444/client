import {PromptName} from "@failean/shared-types";
import capitalize from "../../../util/capitalize";
import {Box, Grid, Typography} from "@mui/material";
import {useCallback, useContext, useEffect, useState} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import ReactMarkdown from "react-markdown";


interface DeckPageProps {
    category?: PromptName [];
    currentIdeaID: string;
}


const DeckPage = ({category, currentIdeaID}: DeckPageProps) => {

    const [res, setRes] = useState<string[]>([]);

    const msc = useContext(MainserverContext)

    const axiosInstance = msc?.axiosInstance;

    const fetchPromptResult = useCallback(async (promptName: PromptName, i: number) => {
        const res = await (axiosInstance?.post(
            "data/prompts/getPromptResult",
            {
                ideaID: currentIdeaID,
                promptName,
            }
        ));
        setRes((pValue) => {
            const newValue = [...pValue];
            newValue[i] = res?.data.promptResult?.data || ""
            return newValue
        });
    }, [axiosInstance, currentIdeaID]);


    useEffect(() => {
        category?.forEach((promptName, i) =>
            fetchPromptResult(promptName, i)
        )
    }, [category, fetchPromptResult]);

    return (
        <Box sx={{border: "1px solid gray", borderRadius: "20px"}}>
            <Grid container direction="column" rowSpacing={4}>
                {category?.map((name, i) => (
                    <Grid item container direction="column" alignItems="center" rowSpacing={2}>
                        <Grid item>
                            <Typography variant="h4">{capitalize(name)}:</Typography>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{border: "0.5px solid gray", borderRadius: "20px", width: "94%", marginLeft: "3%"}}>
                                <Typography textAlign="center">
                                    <ReactMarkdown>{res[i]}</ReactMarkdown>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Grid> </Box>
    )

};

export default DeckPage