import {PromptName} from "@failean/shared-types";
import {Button, Grid, Tooltip} from "@mui/material";
import {Lock, LockOpen} from "@mui/icons-material";
import capitalize from "../../../util/capitalize";
import Prompt from "../../common/Prompt";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {TypeOfOpenDialog} from "./AIdeator";

interface GroupProps {
    level: any
    lockedPrompts: any;
    currentIdeaID: string;
    setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>
    setPrice: Dispatch<SetStateAction<number>>
    setOpenDialog: Dispatch<SetStateAction<TypeOfOpenDialog>>
}


const Group = ({
                   level, lockedPrompts,
                   currentIdeaID,
                   setOpenPrompt,
                   setPrice,
                   setOpenDialog
               }: GroupProps) => {

    const [groupLabel, setGroupLabel] = useState<string>("Run Group");

    const msc = useContext(MainserverContext);
    const axiosInstance = msc?.axiosInstance

    if (level.length > 0) {
        const singleLevel = [level[0]]
        const theRest = level.splice(0, 1);


        return (
            <>
                <Grid
                    item
                    container
                    justifyContent="center"
                    columnSpacing={3}
                >
                    {
                        <Grid item>
                            {lockedPrompts.length === singleLevel.length ? (
                                <Tooltip title="All the prompts in this group are locked">
                                    <Lock/>
                                </Tooltip>
                            ) : lockedPrompts.length > 0 ? (
                                <Tooltip
                                    title={
                                        "The promtps:" +
                                        lockedPrompts.map(
                                            ({name}: any) => " " + capitalize(name)
                                        ) +
                                        " are locked"
                                    }
                                >
                                    <LockOpen/>
                                </Tooltip>
                            ) : (
                                singleLevel.length !== 1 && (
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        disabled={groupLabel !== "Run Group"}
                                        onClick={async () => {
                                            setGroupLabel("Estimating cost...");
                                            let price = 9999;
                                            if (axiosInstance) {
                                                try {
                                                    price = (
                                                        await axiosInstance.post(
                                                            "data/prompts/preRunPrompt",
                                                            {
                                                                ideaID: currentIdeaID,
                                                                promptNames: singleLevel.map(({name}: any) => name),
                                                            }
                                                        )
                                                    ).data.price;
                                                    setOpenPrompt(singleLevel.map(({name}: any) => name) as any);
                                                    setPrice(price);
                                                    setOpenDialog("run");
                                                    setGroupLabel("Run Group");
                                                } catch (e) {
                                                    setGroupLabel("Run Group");
                                                }
                                            }
                                        }}
                                    >
                                        {groupLabel}
                                    </Button>
                                )
                            )}
                        </Grid>
                    }
                    {singleLevel.map((level: any, index: number) => (
                        <Grid key={index} item>
                            <Prompt level={level} setOpenPrompt={setOpenPrompt}/>
                        </Grid>
                    ))}


                </Grid>
                <Group level={theRest} lockedPrompts={lockedPrompts} currentIdeaID={currentIdeaID}
                       setOpenPrompt={setOpenPrompt} setPrice={setPrice} setOpenDialog={setOpenDialog}
                />
            </>

        );
    }
    return null;
};


export default Group