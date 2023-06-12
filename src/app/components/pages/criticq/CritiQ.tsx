import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { Grid, Paper,Button } from '@mui/material';

type Idea = {
  _id: string;
  name: string;
};

type ActionPlanItem = {
  id: string;
  description: string;
};

const { Option } = Select;

const CritiQ = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState('');
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlanItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:6555/api/critique/data/getIdeas')
      .then((response) => response.json())
      .then((data) => setIdeas(data));
  }, []);

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
          value={selectedIdea}
          onChange={(value) => setSelectedIdea(value)}
          style={{ width: 200 }}
        >
          {ideas.map((idea: Idea) => (
            <Option key={idea._id} value={idea._id}>
              {idea.name}
            </Option>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Select
          mode="multiple"
          style={{ width: 200 }}
          placeholder="Select prompts"
          onChange={(values: string[]) => setSelectedPrompts(values)}
        >
          {renderPromptOptions()}
        </Select>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit}>Submit</Button>
      </Grid>
      <Grid item>
        <Paper elevation={2}>
          {actionPlan.map((item: ActionPlanItem, index: number) => (
            // Make sure to return a component or a piece of JSX here
            // Replace 'null' with your actual component or JSX
            null
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CritiQ;
