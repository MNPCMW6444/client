import {PromptName} from "@failean/shared-types";
import {Button, Grid, Tooltip} from "@mui/material";
import {Lock, LockOpen} from "@mui/icons-material";
import capitalize from "../../../util/capitalize";
import Prompt from "../../common/Prompt";
import {Dispatch, SetStateAction, useContext, useState, memo} from "react";
import {MainserverContext} from "@failean/mainserver-provider";
import {TypeOfOpenDialog} from "./AIdeator";

interface GroupProps {
    result: any
    currentIdeaID: string;
    setOpenPrompt: Dispatch<SetStateAction<PromptName | "closed">>
    setPrice: Dispatch<SetStateAction<number>>
    setOpenDialog: Dispatch<SetStateAction<TypeOfOpenDialog>>
}


const Group = ({
                   result, currentIdeaID,
                   setOpenPrompt,
                   setPrice,
                   setOpenDialog
               }: GroupProps) => {

    const [groupLabel, setGroupLabel] = useState<string>("Run Group");

    const msc = useContext(MainserverContext);
    const axiosInstance = msc?.axiosInstance

    if (result.length > 0) {
        const {level, lockedPrompts} = result[0]
        result.shift();


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
                            {lockedPrompts.length === level.length ? (
                                <Tooltip title="All the prompts in this group are locked">
                                    <Lock/>
                                </Tooltip>
                            ) : lockedPrompts.length > 0 ? (
                                <Tooltip
                                    title={
                                        "The prompts:" +
                                        lockedPrompts.map(
                                            ({name}: any) => " " + capitalize(name)
                                        ) +
                                        " are locked"
                                    }
                                >
                                    <LockOpen/>
                                </Tooltip>
                            ) : (
                                level.length !== 1 && (
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
                                                                promptNames: level.map(({name}: any) => name),
                                                            }
                                                        )
                                                    ).data.price;
                                                    setOpenPrompt(level.map(({name}: any) => name) as any);
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
                    {level.map((level: any, index: number) => (
                        <Grid key={index} item>
                            <Prompt level={level} setOpenPrompt={setOpenPrompt}/>
                        </Grid>
                    ))}


                </Grid>
                <Group result={result} currentIdeaID={currentIdeaID}
                       setOpenPrompt={setOpenPrompt} setPrice={setPrice} setOpenDialog={setOpenDialog}
                />
            </>

        );
    }
    return null;
};


export default memo(Group);
