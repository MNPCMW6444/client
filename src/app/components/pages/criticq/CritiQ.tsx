import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  formControl: {
    minWidth: 200,
  },
  paper: {
    padding: theme.spacing(3),
  },
});

const CritiQ = ({ classes }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [assumptions, setAssumptions] = useState([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await axios.post('/api/prompts', {
        prompt,
      });

      setResponse(data.response);
      setAssumptions(data.assumptions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center" gutterBottom>
              CritiQ - Your Startup Idea Validator
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Select a Prompt</InputLabel>
                    <Select value={prompt} onChange={(e) => setPrompt(e.target.value)} label="Select a Prompt">
                      <MenuItem value="">Select a Prompt</MenuItem>
                      {/* Replace with actual prompt keys from your server */}
                      <MenuItem value="refinedIdea">Refined Idea</MenuItem>
                      <MenuItem value="problemStatement">Problem Statement</MenuItem>
                      {/* Continue for all prompts... */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Run CritiQ
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              CritiQ's Response
            </Typography>
            <Typography variant="body1">{response}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Assumptions & Scoring
            </Typography>
            {assumptions.length > 0 ? (
              <ul>
                {assumptions.map((assumption, index) => (
                  <li key={index}>
                    <strong>Assumption:</strong> {assumption.assumption}
                    <br />
                    <strong>Impact:</strong> {assumption.impactScore}
                    <br />
                    <strong>Confidence:</strong> {assumption.confidenceScore}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1">No assumptions found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(CritiQ);
