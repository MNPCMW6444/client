import {Box, Grid, Typography} from "@mui/material";
import {Warning} from "@mui/icons-material";
import capitalize from "../../../util/capitalize";
import {useContext, useEffect, useState} from "react";
import {PromptName, WhiteModels} from "@failean/shared-types";
import {MainserverContext} from "@failean/mainserver-provider";


const removePrefix = (str: string): string => {
    if (str.startsWith(", Idea, ")) {
        return str.slice(", Idea, ".length);
    } else if (str.startsWith(", ")) {
        return str.slice(", ".length);
    } else {
        return str;
    }
};


const Polled = () => {

    const msc = useContext(MainserverContext)

    const axiosInstance = msc?.axiosInstance;


    const [newPolled, setNewPolled] = useState<PromptName[]>([])


    useEffect(() => {
        const r = setInterval(async () => {
            const res = await axiosInstance?.get("data/prompts/tasks");
            if (res?.data?.data) {
                const x: WhiteModels.Tasks.OpenAITaskModel [] = res.data.data.filter(({status}: WhiteModels.Tasks.OpenAITaskModel) => status === "running")
                setNewPolled(x.filter(({promptName}) => promptName !== "idea").map(({promptName}) => promptName));
            }
        }, 5000)
        return () => clearInterval(r)
    }, [axiosInstance]);


    return (newPolled.length > 0 ? (
        <Grid
            item
            container
            direction="column"
            rowSpacing={4}
            alignItems="center"
        >
            <Grid item>
                <Box display="flex" alignItems="center">
                    <Warning sx={{color: "warning.main", mr: 1}}/>
                    <Typography color="warning.main">
                        These prompts are now running:
                    </Typography>
                </Box>
            </Grid>
            <Grid item>
                <Typography color="warning.main" textAlign="center">
                    {removePrefix(
                        newPolled.map((name: string) => ", " + capitalize(name)).join("")
                    )}
                </Typography>
            </Grid>
        </Grid>
    ) : <></>)
};

export default Polled