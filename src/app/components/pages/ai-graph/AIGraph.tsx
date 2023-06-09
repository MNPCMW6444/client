import { useState, useEffect, useContext } from "react";
import { Grid, Select, MenuItem, Typography, Paper } from "@mui/material";
import MainserverContext from "../../../context/WhiteserverContext";
import UserContext from "../../../context/UserContext";
import PromptEditor from "./PromptEditor";
import { PromptGraph } from "@failean/shared-types";

const AIGraph = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(ideas[0]._id);
  const [graph, setGraph] = useState<PromptGraph>();

  useEffect(() => {
    const fetchGraph = async () => {
      const { data } = await axiosInstance.get("data/getPromptGraph");
      setGraph(data.graph);
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
      <Grid container wrap="nowrap" direction="column">
        {result.map((level, index) => (
          <Grid item key={index} container wrap="nowrap">
            {level.map(({ name }, index) => (
              <Grid key={index} item container>
                <PromptEditor
                  idea={ideas.find(({ _id }) => _id === currentIdeaId)}
                  promptName={name}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid container direction="column" rowSpacing={4} alignItems="center">
      <Grid item>
        <Select
          fullWidth
          value={currentIdeaId}
          onChange={(e) => setCurrentIdeaId(e.target.value)}
        >
          {ideas.map((idea, index) => (
            <MenuItem key={index} value={idea._id}>
              {idea?.idea}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Paper sx={{ overflow: "scroll" }}>
          {graph ? renderGraph(graph) : <Typography>Loading...</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AIGraph;
