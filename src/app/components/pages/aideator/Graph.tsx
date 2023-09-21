import {PromptGraph, PromptName} from "@failean/shared-types";
import {Box, Button, Grid, Typography} from "@mui/material";
import {PlayArrow, RemoveCircleOutlineOutlined, Warning} from "@mui/icons-material";
import capitalize from "../../../util/capitalize";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {TypeOfOpenDialog} from "./AIdeator";
import Group from "./Group";

interface GraphProps {
    tempGraph: PromptGraph;
    missing: string[]
    newPolled: PromptName[];
    currentIdeaID: string;
    setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>
    setPrice: Dispatch<SetStateAction<number>>
    setOpenDialog: Dispatch<SetStateAction<TypeOfOpenDialog>>
}


const removePrefix = (str: string): string => {
    if (str.startsWith(", Idea, ")) {
        return str.slice(", Idea, ".length);
    } else if (str.startsWith(", ")) {
        return str.slice(", ".length);
    } else {
        return str;
    }
};


const Graph = ({tempGraph, missing, newPolled, currentIdeaID, setOpenPrompt, setPrice, setOpenDialog}: GraphProps) => {

    const [allLabel, setAllLabel] = useState<string>("Run All");
    const [missingLabel, setMissingLabel] = useState<string>("Run Missing");

    const msc = useContext(MainserverContext);
    const axiosInstance = msc?.axiosInstance

    const graph: any = tempGraph.map((tg) => {
        const missingDeps = tempGraph
            .find((g) => g.name === tg.name)
            ?.deps.filter((dep: PromptName) => {
                const depO = tempGraph.find((g) => g.name === dep) as any;
                if (depO?.name === "idea") return false;
                if (
                    depO?.result === "empty" ||
                    depO?.result ===
                    "One of the dependencies or feedback is invalid, please try to change it"
                )
                    return true;
                return !(depO?.result?.length > 2);
            });
        return {
            ...tg,
            missingDeps,
            locked: missingDeps && missingDeps.length > 0,
        };
    });

    const result: {
        level: any[];
        lockedPrompts: PromptName[]
    }[] = [];
    const grouped = graph.reduce((group: {
        [key: number]: any
    }, item: any) => {
        if (!group[item.level]) {
            group[item.level] = [];
        }
        group[item.level].push(item);
        return group;
    }, {});
    let prevLevel: any;
    for (const level in grouped) {
        if (grouped.hasOwnProperty(level)) {
            result.push({
                level: grouped[level],
                lockedPrompts: prevLevel
                    ? grouped[level].filter(({locked}: any) => locked)
                    : [],
            });
            prevLevel = level;
        }
    }


    return (
        <Grid container direction="column" rowSpacing={10} alignItems="center">
            {newPolled.length > 0 && (
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
            )}
            <br/>
            <br/>
            <br/>
            <Grid
                item
                container
                columnSpacing={6}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Button
                        color="secondary"
                        variant="outlined"
                        size="large"
                        sx={{bgcolor: "#FFDCFB", border: "1px solid"}}
                        disabled={allLabel !== "Run All"}
                        onClick={async () => {
                            setAllLabel("Estimating cost...");
                            let price = 9999;
                            if (axiosInstance) {
                                try {
                                    price = (
                                        await axiosInstance.post("data/prompts/preRunPrompt", {
                                            ideaID: currentIdeaID,
                                            promptNames: graph.map(({name}: any) => name),
                                        })
                                    ).data.price;
                                    setOpenPrompt(graph.map(({name}: any) => name));
                                    setPrice(price);
                                    setOpenDialog("run");
                                    setAllLabel("Run All");
                                } catch (e) {
                                    setAllLabel("Run All");
                                }
                            }
                        }}
                    >
                        <><PlayArrow/><PlayArrow sx={{paddingRight: "5px"}}/></>
                        {" " + allLabel}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="large"
                        sx={{
                            bgcolor: "#FFDBD8",
                            border: "1px solid",
                            color: "#EF3E36",
                            borderColor: "#EF3E36",
                        }}
                        variant="outlined"
                        disabled={missingLabel !== "Run Missing" || missing.length === 0}
                        onClick={async () => {
                            setMissingLabel("Estimating cost...");
                            let price = 9999;
                            if (axiosInstance) {
                                try {
                                    price = (
                                        await axiosInstance.post("data/prompts/preRunPrompt", {
                                            ideaID: currentIdeaID,
                                            promptNames: missing,
                                        })
                                    ).data.price;
                                    setOpenPrompt(missing as any);
                                    setPrice(price);
                                    setOpenDialog("run");
                                    setMissingLabel("Run Missing");
                                } catch (e) {
                                    setMissingLabel("Run Missing");
                                }
                            }
                        }}
                    >
                        <><PlayArrow/><RemoveCircleOutlineOutlined sx={{paddingRight: "5px"}}/></>
                        {" " + missingLabel}
                    </Button>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <Group result={result} currentIdeaID={currentIdeaID}
                   setOpenPrompt={setOpenPrompt} setOpenDialog={setOpenDialog} setPrice={setPrice}/>
        </Grid>
    );
};


export default Graph