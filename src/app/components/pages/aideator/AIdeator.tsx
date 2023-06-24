import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import UserContext from "../../../context/UserContext";
import Prompt from "../../common/Prompt";
import PromptDialog from "../../common/prompt-dialog/PromptDialog";
import { PromptGraph, PromptName } from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";
import capitalize from "../../../util/capitalize";
import { Lock, LockOpen } from "@mui/icons-material";

const AIdeator = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(
    ideas[0]?._id || ""
  );

  const [loaded, setLoaded] = useState<string>("");

  interface Graph extends PromptGraph {
    hasData: boolean;
  }

  const [graph, setGraph] = useState<Graph>();

  const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");

  useEffect(() => {
    const fetchGraph = async () => {
      if (axiosInstance) {
        const { data } = await axiosInstance.get("data/prompts/getPromptGraph");
        const baseGraph = data.graph;
        let hasDatas: boolean[] = [];
        for (const prompt of baseGraph) {
          setLoaded(capitalize(prompt.name));
          hasDatas.push(
            (
              await axiosInstance.post("data/prompts/getPromptResult", {
                ideaId: currentIdeaId,
                promptName: prompt.name,
              })
            ).data.promptResult?.data?.length > 2
          );
        }
        setGraph(
          baseGraph.map((x: any, index: number) => ({
            ...x,
            hasData: index === 0 || hasDatas[index],
          }))
        );
      }
    };
    setGraph(undefined);
    fetchGraph();
  }, [axiosInstance, currentIdeaId]);

  const renderGraph = (tempGraph: PromptGraph) => {
    const graph: any = tempGraph.map((tg) => ({
      ...tg,
      locked: tempGraph
        .find((g) => g.name === tg.name)
        ?.deps.some(
          (dep: PromptName) =>
            !(tempGraph.find((g) => g.name === dep) as any).hasData
        ),
    }));
    const result: { level: any[]; unlocked: number }[] = [];
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
          unlocked: prevLevel
            ? grouped[prevLevel].filter(({ hasData }: any) => hasData).length
            : grouped[level].length,
        });
        prevLevel = level;
      }
    }

    return (
      <Grid container direction="column" rowSpacing={10} alignItems="center">
        {result.map(({ level, unlocked }, index) => (
          <Grid
            item
            key={index}
            container
            justifyContent="center"
            columnSpacing={3}
          >
            {unlocked !== 0 && (
              <Grid item>
                {unlocked === level.length ? <Lock /> : <LockOpen />}
              </Grid>
            )}
            {level.map(({ name }, index) => (
              <Grid key={index} item>
                <Prompt
                  promptName={name}
                  locked={false}
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
        <Grid item>
          <IdeaSelector
            selectedIdeaId={currentIdeaId}
            setSelectedIdeaId={setCurrentIdeaId}
          />
        </Grid>
        <Grid item>
          <Paper sx={{ overflow: "scroll" }}>
            {graph ? (
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
