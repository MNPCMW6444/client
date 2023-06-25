import { useState, useContext } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import Prompt from "../../common/Prompt";
import PromptDialog from "../../common/prompt-dialog/PromptDialog";
import { PromptGraph, PromptName, WhiteModels } from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";
import { Lock, LockOpen } from "@mui/icons-material";
import AIdeatorContext from "../../../context/AIdeatorContext";
import UserContext from "../../../context/UserContext";

const AIdeator = () => {
  const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");

  const { ideas } = useContext(UserContext);
  const { currentIdeaId, setCurrentIdeaId, graph, loaded } =
    useContext(AIdeatorContext);

  const renderGraph = (tempGraph: PromptGraph) => {
    const graph: any = tempGraph.map((tg) => ({
      ...tg,
      locked: tempGraph
        .find((g) => g.name === tg.name)
        ?.deps.some(
          (dep: PromptName) =>
            (tempGraph.find((g) => g.name === dep) as any).result === "empty" ||
            !(
              (tempGraph.find((g) => g.name === dep) as any).result ===
                "idea" ||
              (
                (tempGraph.find((g) => g.name === dep) as any).result
                  .promptResult as WhiteModels.Data.Prompts.WhitePromptResult
              )?.data?.length > 2
            )
        ),
    }));

    const result: { level: any[]; lockedCount: number }[] = [];
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
          lockedCount: prevLevel
            ? grouped[level].filter(({ locked }: any) => locked).length
            : 0,
        });
        prevLevel = level;
      }
    }

    return (
      <Grid container direction="column" rowSpacing={10} alignItems="center">
        {result.map(({ level, lockedCount }, index) => (
          <Grid
            item
            key={index}
            container
            justifyContent="center"
            columnSpacing={3}
          >
            {lockedCount !== 0 && (
              <Grid item>
                {lockedCount === level.length ? <Lock /> : <LockOpen />}
              </Grid>
            )}
            {level.map(({ name, locked }, index) => (
              <Grid key={index} item>
                <Prompt
                  promptName={name}
                  locked={locked}
                  setOpenPrompt={setOpenPrompt}
                />
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
        />
      )}
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
