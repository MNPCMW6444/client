import { useState, useEffect, useContext } from "react";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@mui/material";
import UserContext from "../../../context/UserContext";
import { MainserverContext } from "@failean/mainserver-provider";
import { PromptGraph } from "@failean/shared-types";
import PromptEditor from "../ai-graph/PromptEditor";

interface Column {
  headerName: string;
}

const columns: Column[] = [
  { headerName: "Assumtions" },
  { headerName: "Impact" },
  { headerName: "Effort" },
  { headerName: "Likelyhood" },
  { headerName: "CritiQ Score" },
  { headerName: "Actions" },
];

const CritiQ = () => {
  const { ideas } = useContext(UserContext);
  const { axiosInstance } = useContext(MainserverContext);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  /*  const [selectedPromptsNames, setSelectedPromptsNames] = useState<string[]>(
    []
  );
  const [actionPlan, setActionPlan] = useState<any>([]); */
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const { data } = await axiosInstance.get("data/getPromptGraph");
      setPrompts((data.graph as PromptGraph).map(({ name }) => name));
    };
    fetchPrompts();
  }, [axiosInstance]);
  /* 
  const renderPromptOptions = () => {
    // Render your prompt options here
    // This function should return an array of <Option> components
  }; */

  const handleSubmit = () => {
    // Handle the submit action here
  };

  return (
    <Grid
      container
      direction="column"
      rowSpacing={4}
      width="80%"
      paddingLeft="10%"
      paddingTop="20px"
    >
      <Grid item>
        <Typography variant="h4" textAlign="center">
          CritiQ
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" textAlign="center">
          Select the Idea to Critique
        </Typography>
      </Grid>
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
        <Typography variant="h6" textAlign="center">
          Select the Prompt to Critique:
        </Typography>
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
          {ideas.length > 0 && (
            <PromptEditor
              idea={ideas.find(
                (idea) => idea._id === selectedIdeaId || ideas[0]
              )}
              promptName={selectedPrompt}
            ></PromptEditor>
          )}
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
        <Grid item>
          <Table>
            <TableHead>
              {columns.map(({ headerName }) => (
                <TableCell>{headerName}</TableCell>
              ))}
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CritiQ;
