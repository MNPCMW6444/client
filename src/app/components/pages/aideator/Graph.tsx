import {PromptGraph, PromptName} from "@failean/shared-types";
import {Box, Button, Grid, Typography} from "@mui/material";
import {PlayArrow, Warning} from "@mui/icons-material";
import capitalize from "../../../util/capitalize";
import Prompt from "../../common/Prompt";
import {Dispatch, SetStateAction, useContext, useState, useMemo} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {TypeOfOpenDialog} from "./AIdeator";


interface PromptGroupProps {

    levels: any
    levelIndex: number
    setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>

}

interface GraphProps {
    tempGraph: PromptGraph;
    missing: string[]
    newPolled: PromptName[];
    currentIdeaID: string;
    setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>
    setPrice: Dispatch<SetStateAction<number>>
    setOpenDialog: Dispatch<SetStateAction<TypeOfOpenDialog>>
}

const removePrefix = (str: string) => {
    if (str.startsWith(", Idea, ")) return str.slice(", Idea, ".length);
    if (str.startsWith(", ")) return str.slice(", ".length);
    return str;
};

const PromptGroup = ({levels, levelIndex, setOpenPrompt}: PromptGroupProps) => {
    const currentLevel = levels[levelIndex];
    if (!currentLevel) return null;

    return (
        <Grid
            item
            container
            justifyContent="center"
            columnSpacing={3}
        >
            {currentLevel.level.map((level: any, index: any) => (
                <Grid key={index} item>
                    <Prompt level={level} setOpenPrompt={setOpenPrompt}/>
                </Grid>
            ))}
            <PromptGroup levels={levels} levelIndex={levelIndex + 1} setOpenPrompt={setOpenPrompt}/>
        </Grid>
    );
};

const Graph = ({tempGraph, missing, newPolled, currentIdeaID, setOpenPrompt, setPrice, setOpenDialog}: GraphProps) => {
    const [allLabel, setAllLabel] = useState("Run All");
    const [missingLabel, setMissingLabel] = useState("Run Missing");
    const [groupLabel, setGroupLabel] = useState("Run Group");
    const msc = useContext(MainserverContext);
    const axiosInstance = msc?.axiosInstance;

    const graph: any = tempGraph.map(tg => {
        const missingDeps = tempGraph.find(g => g.name === tg.name)?.deps.filter(dep => {
            const depO = tempGraph.find(g => g.name === dep);
            if (depO?.name === "idea") return false;
            if (depO?.result === "empty" || (depO?.result as any) === "One of the dependencies or feedback is invalid, please try to change it") return true;
            return !((depO?.result as any).length > 2);
        });
        return {...tg, missingDeps, locked: missingDeps && missingDeps.length > 0};
    });

    const result = useMemo(() => {
        const res = [];
        const grouped = graph.reduce((group: any, item: any) => {
            if (!(group)[item.level]) (group)[item.level] = [];
            group[item.level].push(item);
            return group;
        }, {});
        let prevLevel;
        for (const level in grouped) {
            if (grouped.hasOwnProperty(level)) {
                res.push({
                    level: grouped[level],
                    lockedPrompts: prevLevel ? grouped[level].filter(({locked}: any) => locked) : []
                });
                prevLevel = level;
            }
        }
        return res;
    }, [graph]);

    return (
        <Grid container direction="column" rowSpacing={10} alignItems="center">
            {newPolled.length > 0 && (
                <Grid item container direction="column" rowSpacing={4} alignItems="center">
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <Warning sx={{color: "warning.main", mr: 1}}/>
                            <Typography color="warning.main">These prompts are now running:</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography color="warning.main" textAlign="center">
                            {removePrefix(newPolled.map(name => ", " + capitalize(name)).join(""))}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            <br/><br/><br/>
            <Grid item container columnSpacing={6} justifyContent="center" alignItems="center">
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
                                    price = (await axiosInstance.post("data/prompts/preRunPrompt", {
                                        ideaID: currentIdeaID,
                                        promptNames: graph.map(({name}: any) => name)
                                    })).data.price;
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
                        sx={{bgcolor: "#FFDBD8", border: "1px solid", color: "#EF3E36", borderColor: "#EF3E36"}}
                        variant="outlined"
                        disabled={missingLabel !== "Run Missing" || missing.length === 0}
                        onClick={async () => {
                            setMissingLabel("Estimating cost...");
                            let price = 9999;
                            if (axiosInstance) {
                                try {
                                    price = (await axiosInstance.post("data/prompts/preRunPrompt", {
                                        ideaID: currentIdeaID,
                                        promptNames: missing
                                    })).data.price;
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
                        <><PlayArrow/><PlayArrow sx={{paddingRight: "5px"}}/></>
                        {" " + missingLabel}
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        size="large"
                        sx={{bgcolor: "#D8FFDA", border: "1px solid", color: "#00B300", borderColor: "#00B300"}}
                        variant="outlined"
                        disabled={groupLabel !== "Run Group" || graph.map(({locked}: any) => locked).some((v: any) => v === true)}
                        onClick={async () => {
                            setGroupLabel("Estimating cost...");
                            let price = 9999;
                            if (axiosInstance) {
                                try {
                                    price = (await axiosInstance.post("data/prompts/preRunPrompt", {
                                        ideaID: currentIdeaID,
                                        promptNames: graph.map(({name}: any) => name).filter((name: any) => name !== "idea")
                                    })).data.price;
                                    setOpenPrompt(graph.map(({name}: any) => name).filter((name: any) => name !== "idea"));
                                    setPrice(price);
                                    setOpenDialog("run");
                                    setGroupLabel("Run Group");
                                } catch (e) {
                                    setGroupLabel("Run Group");
                                }
                            }
                        }}
                    >
                        <><PlayArrow/><PlayArrow sx={{paddingRight: "5px"}}/></>
                        {" " + groupLabel}
                    </Button>
                </Grid>
            </Grid>
            <PromptGroup levels={result} levelIndex={0} setOpenPrompt={setOpenPrompt}/>
        </Grid>
    );
};

export default Graph;
