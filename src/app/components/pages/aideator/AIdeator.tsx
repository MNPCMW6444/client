import { useState, useContext, Dispatch, SetStateAction } from "react";
import { Grid, Typography, Paper, Tooltip, Button } from "@mui/material";
import Prompt from "../../common/Prompt";
import PromptDialog from "../../common/prompt-dialog/PromptDialog";
import { PromptGraph, PromptName, WhiteModels } from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";
import { Lock, LockOpen } from "@mui/icons-material";
import AIdeatorContext from "../../../context/AIdeatorContext";
import UserContext from "../../../context/UserContext";
import capitalize from "../../../util/capitalize";
import { MainserverContext } from "@failean/mainserver-provider";
import RunDialog from "../../common/prompt-dialog/RunDialog";
import FeedbackDialog from "../../common/prompt-dialog/FeedbackDialog";
import SaveDialog from "../../common/prompt-dialog/SaveDialog";

type TypeOfOpenDialog = "closed" | "run" | "feedback" | "save";
export type TypeOfSetOpenDialog = Dispatch<SetStateAction<TypeOfOpenDialog>>;

const AIdeator = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const { ideas } = useContext(UserContext);
  const { currentIdeaId, setCurrentIdeaId, graph, loaded, setPolled } =
    useContext(AIdeatorContext);
  const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");
  const [openDialog, setOpenDialog] = useState<TypeOfOpenDialog>("closed");
  const [price, setPrice] = useState<number>(999999);

  const renderGraph = (tempGraph: PromptGraph) => {
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

    const result: { level: any[]; lockedPrompts: PromptName[] }[] = [];
    const grouped = graph.reduce((group: { [key: number]: any }, item: any) => {
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
            ? grouped[level].filter(({ locked }: any) => locked)
            : [],
        });
        prevLevel = level;
      }
    }

    return (
      <Grid container direction="column" rowSpacing={10} alignItems="center">
        <Grid item>
          <Button
            onClick={() => {
              axiosInstance &&
                axiosInstance.post("data/prompts/runAndGetPromptResult", {
                  ideaId: currentIdeaId,
                  promptNames: graph.map(({ name }: any) => name),
                });
              setPolled &&
                setPolled((p) => [...p, graph.map(({ name }: any) => name)]);
            }}
          >
            Run All
          </Button>
        </Grid>
        {result.map(({ level, lockedPrompts }, index) => (
          <Grid
            item
            key={index}
            container
            justifyContent="center"
            columnSpacing={3}
          >
            {lockedPrompts.length !== 0 && (
              <Grid item>
                {lockedPrompts.length === level.length ? (
                  <Tooltip title="All the prompts in this group are locked">
                    <Lock />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title={
                      "The promtps:" +
                      lockedPrompts.map(
                        ({ name }: any) => " " + capitalize(name)
                      ) +
                      " are locked"
                    }
                  >
                    <LockOpen />
                  </Tooltip>
                )}
              </Grid>
            )}
            {level.map((level, index) => (
              <Grid key={index} item>
                <Prompt level={level} setOpenPrompt={setOpenPrompt} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      {openPrompt !== "closed" && (
        <PromptDialog
          idea={ideas.find(({ _id }) => _id === currentIdeaId) || "NO IDEAS"}
          promptName={openPrompt}
          setOpenPrompt={setOpenPrompt}
          setOpenDialog={setOpenDialog}
          setPrice={setPrice}
        />
      )}
      {openDialog !== "closed" &&
        (openDialog === "run" ? (
          <RunDialog
            idea={ideas.find(({ _id }) => _id === currentIdeaId) || "NO IDEAS"}
            promptName={openPrompt}
            setOpenDialog={setOpenDialog}
            price={price}
          />
        ) : openDialog === "feedback" ? (
          /*   <FeedbackDialog
            idea={ideas.find(({ _id }) => _id === currentIdeaId) || "NO IDEAS"}
            setOpenDialog={setOpenDialog}
          /> */ <> </>
        ) : (
          /*   <SaveDialog
            idea={ideas.find(({ _id }) => _id === currentIdeaId) || "NO IDEAS"}
            setOpenDialog={setOpenDialog}
          /> */ <> </>
        ))}
      <Grid container direction="column" rowSpacing={4} alignItems="center">
        {setCurrentIdeaId && (
          <Grid item>
            <IdeaSelector
              selectedIdeaId={currentIdeaId}
              setSelectedIdeaId={setCurrentIdeaId}
            />
          </Grid>
        )}
        <Grid item>
          <Paper sx={{ overflow: "scroll" }}>
            {graph.length > 0 ? (
              renderGraph(graph)
            ) : (
              <Typography>Loading {loaded}...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AIdeator;
