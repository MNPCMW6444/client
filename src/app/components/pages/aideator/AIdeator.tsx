import {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Grid, Typography, Paper, Tooltip, Button, Box } from "@mui/material";
import Prompt from "../../common/Prompt";
import PromptDialog from "../../common/prompt-dialog/PromptDialog";
import { PromptGraph, PromptName } from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";
import { Lock, LockOpen, Warning } from "@mui/icons-material";
import AIdeatorContext from "../../../context/AIdeatorContext";
import UserContext from "../../../context/UserContext";
import capitalize from "../../../util/capitalize";
import { MainserverContext } from "@failean/mainserver-provider";
import RunDialog from "../../common/prompt-dialog/RunDialog";
import FeedbackDialog from "../../common/prompt-dialog/FeedbackDialog";

type TypeOfOpenDialog = "closed" | "run" | "feedback";
export type TypeOfSetOpenDialog = Dispatch<SetStateAction<TypeOfOpenDialog>>;

const removePrefix = (str: string): string => {
  if (str.startsWith(", Idea, ")) {
    return str.slice(", Idea, ".length);
  } else if (str.startsWith(", ")) {
    return str.slice(", ".length);
  } else {
    return str;
  }
};

const AIdeator = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const { ideas } = useContext(UserContext);
  const { currentIdeaID, setCurrentIdeaID, graph, loaded, polled } =
    useContext(AIdeatorContext);
  const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");
  const [openDialog, setOpenDialog] = useState<TypeOfOpenDialog>("closed");
  const [price, setPrice] = useState<number>(999999);
  const [allLabel, setAllLabel] = useState<string>("Run All");
  const [missingLabel, setMissingLabel] = useState<string>("Run Missing");
  const [groupLabel, setGroupLabel] = useState<string>("Run Group");
  const [missing, setMissing] = useState<PromptName[]>([]);

  useEffect(() => {
    if (graph.length > 0) {
      setMissing(
        graph
          .map(({ name, result }: any) => {
            if (
              result === "empty" ||
              result ===
                "One of the dependencies or feedback is invalid, please try to change it"
            )
              return name;
            return !(result?.length > 2) ? name : null;
          })
          .filter((name: any) => name) as PromptName[]
      );
    }
  }, [graph]);

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
        {polled.length > 0 && (
          <Grid
            item
            container
            direction="column"
            rowSpacing={4}
            alignItems="center"
          >
            <Grid item>
              <Box display="flex" alignItems="center">
                <Warning sx={{ color: "warning.main", mr: 1 }} />
                <Typography color="warning.main">
                  These prompts are now running:
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography color="warning.main" textAlign="center">
                {removePrefix(
                  polled.map((name: string) => ", " + capitalize(name)).join("")
                )}
              </Typography>
            </Grid>
          </Grid>
        )}
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
              disabled={allLabel !== "Run All"}
              onClick={async () => {
                setAllLabel("Estimating cost...");
                let price = 9999;
                if (axiosInstance) {
                  try {
                    price = (
                      await axiosInstance.post("data/prompts/preRunPrompt", {
                        ideaID: currentIdeaID,
                        promptNames: graph.map(({ name }: any) => name),
                      })
                    ).data.price;
                    setOpenPrompt(graph.map(({ name }: any) => name));
                    setPrice(price);
                    setOpenDialog("run");
                    setAllLabel("Run All");
                  } catch (e) {
                    setAllLabel("Run All");
                  }
                }
              }}
            >
              {allLabel}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
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
              {missingLabel}
            </Button>
          </Grid>
        </Grid>
        {result.map(({ level, lockedPrompts }, index) => (
          <Grid
            item
            key={index}
            container
            justifyContent="center"
            columnSpacing={3}
          >
            {
              <Grid item>
                {lockedPrompts.length === level.length ? (
                  <Tooltip title="All the prompts in this group are locked">
                    <Lock />
                  </Tooltip>
                ) : lockedPrompts.length > 0 ? (
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
                                  promptNames: level.map(({ name }) => name),
                                }
                              )
                            ).data.price;
                            setOpenPrompt(level.map(({ name }) => name) as any);
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
      {openPrompt !== "closed" &&
        !(openPrompt[0].length && openPrompt[0].length > 2) && (
          <PromptDialog
            idea={ideas.find(({ _id }) => _id === currentIdeaID) || "NO IDEAS"}
            promptName={openPrompt}
            setOpenPrompt={setOpenPrompt}
            setOpenDialog={setOpenDialog}
            setPrice={setPrice}
          />
        )}
      {openDialog !== "closed" &&
        (openDialog === "run" ? (
          <RunDialog
            idea={ideas.find(({ _id }) => _id === currentIdeaID) || "NO IDEAS"}
            promptName={openPrompt}
            setOpenDialog={setOpenDialog}
            price={price}
          />
        ) : (
          <FeedbackDialog
            idea={ideas.find(({ _id }) => _id === currentIdeaID) || "NO IDEAS"}
            promptName={openPrompt}
            setOpenDialog={setOpenDialog}
          />
        ))}
      <Grid container direction="column" rowSpacing={4} alignItems="center">
        {setCurrentIdeaID && (
          <Grid item>
            <IdeaSelector
              selectedIdeaID={currentIdeaID}
              setSelectedIdeaID={setCurrentIdeaID}
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
