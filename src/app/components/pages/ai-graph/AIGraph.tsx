import { useState, useEffect, useContext } from "react";
import { Grid, Select, MenuItem, Typography, Paper } from "@mui/material";
import MainserverContext from "../../../context/WhiteserverContext";
import UserContext from "../../../context/UserContext";
import PromptEditor from "./PromptEditor";
import { PromptGraph, PromptMap, PromptPart } from "@failean/shared-types";

const x = (promptMap: PromptMap) => {
  let superPrompts = Object.keys(promptMap).map((promptName: string) => ({
    name: promptName,
    deps: promptMap[promptName]
      .map(
        (promptPart: PromptPart) =>
          promptPart.type === "variable" && promptPart.content
      )
      .filter((x) => x) as string[],
    level: 0,
  }));
  superPrompts.unshift({ name: "idea", deps: [], level: 0 });
  let level = 0;
  while (superPrompts.filter(({ level }) => level < 0).length > 0) {
    level++;
    superPrompts
      .filter(({ level }) => !level)
      .forEach((sp, index) => {
        sp.level = level - 1;
        superPrompts = [...superPrompts, sp];
        superPrompts.splice(index, 1);
      });
    superPrompts
      .filter(({ level }) => !level)
      .forEach((sp: any, index: number) => {
        let satisfied = sp.deps
          .map(
            (name: string) =>
              superPrompts.find((spx) => spx.name === name)?.name
          )
          .map((name: string) => {
            const number = superPrompts.find(
              (spxx) => spxx.name === name
            )?.level;
            debugger;
            return !name || (number && number > 0);
          });
        let total = true;
        satisfied.forEach((f: boolean) => {
          if (!f) total = false;
        });
        if (total) {
          sp.level = -1;
          superPrompts = [...superPrompts, sp];
          superPrompts.splice(index, 1);
        }
      });
  }
  let graph = superPrompts.map(({ name, level }) => ({
    name,
    level,
  }));
  return graph;
};

const AIGraph = () => {
  const { axiosInstance } = useContext(MainserverContext);
  const { ideas } = useContext(UserContext);
  const [currentIdeaId, setCurrentIdeaId] = useState<string>(ideas[0]._id);
  const [graph, setGraph] = useState<PromptGraph>();

  useEffect(() => {
    const fetchGraph = async () => {
      const { data } = await axiosInstance.get("data/getPromptGraph");
      x(data.graph);
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
    return result.map((level, index) => (
      <Grid key={index} container direction="column" wrap="nowrap">
        {level.map(({ name }, index) => (
          <Grid key={index} item>
            <PromptEditor ideaId={currentIdeaId} promptName={name} />
          </Grid>
        ))}
      </Grid>
    ));
  };

  return (
    <Grid
      container
      direction="column"
      width="100%"
      rowSpacing={4}
      alignItems="center"
    >
      <Grid item width="100%">
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
      <Grid item width="100%">
        <Paper sx={{ overflow: "scroll" }}>
          {graph ? renderGraph(graph) : <Typography>Loading...</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AIGraph;
