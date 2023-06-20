import { useState, useEffect, useContext } from "react";
import { Grid, Select, MenuItem, Typography, Paper } from "@mui/material";
import { MainserverContext } from "@failean/mainserver-provider";
import UserContext from "../../../context/UserContext";
import PromptEditor from "../../common/PromptEditor";
import { PromptGraph } from "@failean/shared-types";

const AIGraph = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(
    ideas[0]?._id || ""
  );
  const [graph, setGraph] = useState<PromptGraph>();

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
      <Grid
        container
        wrap="nowrap"
        direction="column"
        rowSpacing={10}
        alignItems="center"
      >
        {result.map((level, index) => (
          <Grid
            item
            key={index}
            container
            wrap="nowrap"
            justifyContent="center"
            columnSpacing={3}
          >
            {level.map(({ name }, index) => (
              <Grid key={index} item>
                <PromptEditor
                  idea={
                    ideas.find(({ _id }) => _id === currentIdeaId) || "NO IDEAS"
                  }
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
