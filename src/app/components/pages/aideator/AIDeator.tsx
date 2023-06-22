import { useState, useEffect, useContext } from "react";
import { Grid, Select, MenuItem, Typography, Paper } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import UserContext from "../../../context/UserContext";
import Prompt from "../../common/Prompt";
import PromptDialog from "../../common/PromptDialog";
import { PromptGraph, PromptName } from "@failean/shared-types";
import IdeaSelector from "../../common/IdeaSelector";

const AIDeator = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(
    ideas[0]?._id || ""
  );
  const [graph, setGraph] = useState<PromptGraph>();

  const [openPrompt, setOpenPrompt] = useState<PromptName | "closed">("closed");

  useEffect(() => {
    const fetchGraph = async () => {
      if (axiosInstance) {
        const { data } = await axiosInstance.get("data/prompts/getPromptGraph");
        setGraph(data.graph);
      }
    };
    fetchGraph();
  }, [axiosInstance]);

  const renderGraph = (graph: PromptGraph) => {
    const result: any[][] = [];
    const grouped = graph.reduce((group: { [key: number]: any }, item) => {
      if (!group[item.level]) {
        group[item.level] = [];
      }
      group[item.level].push(item);
      return group;
    }, {});
    for (const level in grouped) {
      if (grouped.hasOwnProperty(level)) {
        result.push(grouped[level]);
      }
    }
    return (
      <Grid container direction="column" rowSpacing={10} alignItems="center">
        {result.map((level, index) => (
          <Grid
            item
            key={index}
            container
            justifyContent="center"
            columnSpacing={3}
          >
            {level.map(({ name }, index) => (
              <Grid key={index} item>
                <Prompt promptName={name} setOpenPrompt={setOpenPrompt} />
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
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          columnSpacing={4}
        >
          <Grid item>
            <Typography sx={{ fontSize: "150%" }}>Idea:</Typography>
          </Grid>
          <Grid item>
            <IdeaSelector
              selectedIdeaId={currentIdeaId}
              setSelectedIdeaId={setCurrentIdeaId}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Paper sx={{ overflow: "scroll" }}>
            {graph ? renderGraph(graph) : <Typography>Loading...</Typography>}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AIDeator;
