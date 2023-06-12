import { useState, useEffect, useContext } from "react";
import { Grid, Paper, Button, Select, MenuItem } from "@mui/material";
import UserContext from "../../../context/UserContext";
import MainserverContext from "../../../context/WhiteserverContext";
import { Prompt, PromptGraph } from "@failean/shared-types";

const CritiQ = () => {
  const { ideas } = useContext(UserContext);
  const { axiosInstance } = useContext(MainserverContext);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [selectedPromptsNames, setSelectedPromptsNames] = useState<string[]>(
    []
  );
  const [actionPlan, setActionPlan] = useState<any>([]);
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data } = await axiosInstance.get("data/getPromptGraph");
      setPrompts((data.graph as PromptGraph).map(({ name }) => name));
    };
    fetchPrompts();
  }, [axiosInstance]);

  const renderPromptOptions = () => {
    // Render your prompt options here
    // This function should return an array of <Option> components
  };

  const handleSubmit = () => {
    // Handle the submit action here
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Select
          value={selectedIdeaId}
          onChange={(e) => setSelectedIdeaId(e.target.value)}
          fullWidth
        >
          {ideas.map((idea: any, index: number) => (
            <MenuItem key={index} value={idea._id}>
              {idea?.idea}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Select
          value={selectedPrompt}
          onChange={(e) => setSelectedPrompt(e.target.value)}
          fullWidth
        >
          {prompts.map((prompt: string, index: number) => (
            <MenuItem key={index} value={prompt}>
              {prompt}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit}>Submit</Button>
      </Grid>
      <Grid item>
        <Paper elevation={2}>
          {actionPlan.map(
            (item: any, index: number) =>
              // Make sure to return a component or a piece of JSX here
              // Replace 'null' with your actual component or JSX
              null
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CritiQ;
