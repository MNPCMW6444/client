import { useState, useContext } from "react";
import { Grid, Typography, Paper, Tooltip, /*Button*/ } from "@mui/material";
import Prompt from "../../common/Prompt";
import PromptDialog from "../../common/prompt-dialog/PromptDialog";
import { PromptGraph, PromptName, WhiteModels } from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";
import { Lock, LockOpen } from "@mui/icons-material";
import AIdeatorContext from "../../../context/AIdeatorContext";
import UserContext from "../../../context/UserContext";
import capitalize from "../../../util/capitalize";
import { MainserverContext } from "@failean/mainserver-provider";
import { StyledLinearProgress, StyledTypography, StyledCard, StyledContainer } from '../../../../content/style/styled-components/all';
import { StyledButton as Button} from "../../../../content/style/styled-components/all";
const AIdeator = () => {
  const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");

  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;

  const { ideas } = useContext(UserContext);
  const { currentIdeaId, setCurrentIdeaId, graph, loaded } =
    useContext(AIdeatorContext);

  const renderGraph = (tempGraph: PromptGraph) => {
    const graph: any = tempGraph.map((tg) => {
      const missingDeps = tempGraph
        .find((g) => g.name === tg.name)
        ?.deps.filter(
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
        );
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
            onClick={() =>
              axiosInstance &&
              axiosInstance.post("data/prompts/runAndGetPromptResult", {
                ideaId: currentIdeaId,
                promptNames: graph.map(({ name }: any) => name),
              })
            }
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
          {/* <Paper> */}
            {graph.length > 0 ? (
              renderGraph(graph)
            ) : (
              <StyledContainer>
              <StyledCard>
                <StyledTypography variant="h6" align="center">
                  Loading {loaded}, please wait...
                </StyledTypography>
                <StyledLinearProgress />
              </StyledCard>
            </StyledContainer>
            )}
          {/* </Paper> */}
        </Grid>
      </Grid>
    </>
  );
};

export default AIdeator;
