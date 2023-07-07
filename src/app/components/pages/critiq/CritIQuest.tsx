import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

type StepType = {
  title: string;
  questions: {
    text: string;
    answers: string[];
  }[];
};

const steps: StepType[] = [
  {
    title: "Value validation",
    questions: [
      {
        text: "Did you actually experience the problem you're solving, or is it somone else's problem?",
        answers: [
          "Experienced it first-hand",
          "Found it in a report",
          "Someone told me about it",
          "Chat GPT told me about it",
        ],
      },
      {
        text: "Did you chat with real potential customers, or just imagined what they could possibly want?",
        answers: [
          "Had heart-to-heart with customers",
          "Conducted non-biased user interviews",
          "Conducted user questionirs",
          "Conducted focus groups",
          "I am my own customer",
          "Playing guessing games",
          "More then one of the above",
        ],
      },
      {
        text: "Did you validate your idea with real people, or just your mom and her book club?",
        answers: [
          "Asked my Facebook friends",
          "Beyond my social circle",
          "With investors/entrepreneurs/domain experts",
          "Google is my validation",
        ],
      },
    ],
  },
  {
    title: "Market Validation",
    questions: [
      {
        text: "Did you dive deep into competitor analysis, or are you hoping to learn hoe to swim with sharks?",
        answers: [
          "I know my competitors better then them",
          "Did some snooping",
          "Competitors? Who are they?",
        ],
      },
      {
        text: "Are you an insider in your industry/domain?",
        answers: [
          "No, but somone on my team is",
          "We are a team of insiders",
          "No, but i have connections",
          "Well, no",
        ],
      },
      {
        text: "Did you validate there's a decent-sized market for your idea or are you just throwing darts in the dark?",
        answers: [
          "Big fish in a big pond",
          "Small fish in a big pond",
          "What's a market?",
        ],
      },
      {
        text: "Did you validate a unique value proposition, or are you just another 'me too' wannabe?",
        answers: [
          "I'm the next big thing",
          "We're pretty similar, but...",
          "We're still figuring it out",
        ],
      },
    ],
  },
  {
    title: "Technological Validation",
    questions: [
      {
        text: "Have you conducted a feasibility study, or are you navigating in the dark?",
        answers: [
          "Feasibility study? Check!",
          "In the process of studying feasibility",
          "We plan to do it soon",
          "Feasibility... what now?",
        ],
      },
      {
        text: "Do you have a Proof of Concept (PoC) that shows your idea works, or are you still in the 'trust me, it'll work' stage?",
        answers: [
          "We've got a successful PoC",
          "We're in the middle of creating a PoC",
          "PoC is on the to-do list",
          "'Trust me, it'll work'",
        ],
      },

      {
        text: "Do you have a minimum viable product, or is your idea still just a cool doodle on a napkin?",
        answers: [
          "MVP up and running",
          "Got a neat prototype",
          "Still in the dev dungeon",
          "We have a napkin",
        ],
      },
      {
        text: "Got a tech whiz steering your ship, or outsourcing to the highest bidder?",
        answers: [
          "Got a tech team and a CTO",
          "Got a tech team, no CTO yet",
          "Outsourcing our battles",
          "Building our tech dream team",
        ],
      },
      {
        text: "Did you lock in your tech stack, or are you lost in the tech supermarket?",
        answers: [
          "Tech stack, checked",
          "Still perusing the tech aisle",
          "Our dev team will handle it",
          "Tech stack? Sounds delicious",
        ],
      },
      {
        text: "Thought about scalability, or hoping your server won't crash at the first sign of success?",
        answers: [
          "Scaling like a seasoned mountaineer",
          "Eyeing that mountain",
          "Will cross that bridge when we come to it",
          "Scalability sounds like a brand of fish food",
        ],
      },
      {
        text: "Have you fortified your cyber castle, or inviting hackers for a free-for-all?",
        answers: [
          "Our cyber castle is a fortress",
          "Building the cyber walls",
          "Defenses are on the agenda",
          "Cyber...security? Is that a new game?",
        ],
      },
    ],
  },

  {
    title: "Business Validation",
    questions: [
      {
        text: "Have you drafted a business plan, or are you just letting fate steer your ship?",
        answers: [
          "Business plan in hand",
          "Fate's at the wheel",
          "It's a work in progress",
        ],
      },
      {
        text: "Have you predicted potential cash flows or is your financial strategy 'hope for the best'?",
        answers: [
          "We have cash flow forecasts",
          "Hoping for the best",
          "Cash what now?",
        ],
      },
      {
        text: "Did you break down your startup costs or are you still playing hide and seek with numbers?",
        answers: [
          "Costs broken down",
          "Still counting",
          "I prefer not to think about it",
        ],
      },
      {
        text: "Have you secured funding needed to jump start from friends and family? or are you funding it from your pocket?",
        answers: [
          "Secured for now",
          "Still in discussions",
          "We take care of us",
          "What is this 'funding' you speak of?",
        ],
      },
    ],
  },
  {
    title: "Team Validation",
    questions: [
      {
        text: "Is your team an Avengers-like squad of experts, or a motley crew of zealous novices? Please add details about the background of each team member. ",
        answers: [
          "We're the Avengers",
          "The Goonies",
          "We got a mix",
          "I don't have a team yet",
        ],
      },
      {
        text: "Did you assign key roles in your startup or are you hoping for a workplace fairy tale?",
        answers: [
          "Roles are crystal clear",
          "Winging the organization",
          "Still figuring it out",
        ],
      },
      {
        text: "Do you have a hiring plan, or are you betting on the 'multiplicity' theory?",
        answers: [
          "Hiring plan is in place",
          "Expecting clones to appear",
          "Making it up as we go",
        ],
      },
    ],
  },
  {
    title: "Economic Validation",
    questions: [
      {
        text: "Have you plotted your revenue streams, or are you counting on the kindness of users?",
        answers: [
          "Got our financial GPS",
          "Will ask users nicely",
          "Looking for the money tree",
        ],
      },
      {
        text: "Did you work out your customer acquisition cost, or are you betting on 'viral' to do the job?",
        answers: [
          "CAC calculated",
          "Hoping for viral spread",
          "Maybe we'll get lucky",
        ],
      },
    ],
  },
  {
    title: "Compliance & Legal Validation",
    questions: [
      {
        text: "Did you check the legal boxes, or are you hoping 'not knowing' will be your shield?",
        answers: [
          "We've lawyered up",
          "What is law?",
          "Taking it step by step",
        ],
      },
      {
        text: "Have formed a legal entity yet? if yes which and where",
        answers: [
          "We have a company",
          "working on it",
          "waiting for it to be necessary",
        ],
      },
      {
        text: "Did you secure necessary patents or trademarks, or are you planning a logo-thon later?",
        answers: [
          "Got the legal stuff sorted",
          "Don't need it",
          "Still on the to-do list",
        ],
      },
      {
        text: "Did you size up potential legal risks, or are you treating your startup like a Vegas roll?",
        answers: [
          "We've assessed the risks",
          "What happens in Vegas...",
          "Working on it",
        ],
      },
    ],
  },
];
type AnswerScoresType = {
  [key: string]: { fail: number; lean: number };
};

const answerScores: AnswerScoresType = {
  "Experienced it first-hand": { fail: 1, lean: 5 },
  "Found it in a report": { fail: 2, lean: 4 },
  "Someone told me about it": { fail: 3, lean: 3 },
  "Chat GPT told me about it": { fail: 4, lean: 2 },
  "Had heart-to-heart with customers": { fail: 1, lean: 5 },
  "Conducted non-biased user interviews": { fail: 2, lean: 4 },
  "Conducted user questionnaires": { fail: 3, lean: 3 },
  "Conducted focus groups": { fail: 4, lean: 2 },
  "I am my own customer": { fail: 5, lean: 1 },
  "Playing guessing games": { fail: 4, lean: 2 },
  "More than one of the above": { fail: 3, lean: 3 },
  "Asked my Facebook friends": { fail: 3, lean: 3 },
  "Beyond my social circle": { fail: 2, lean: 4 },
  "With investors/entrepreneurs/domain experts": { fail: 1, lean: 5 },
  "Google is my validation": { fail: 4, lean: 2 },
  "I know my competitors better than them": { fail: 5, lean: 1 },
  "Did some snooping": { fail: 4, lean: 2 },
  "Competitors? Who are they?": { fail: 3, lean: 3 },
  "No, but someone on my team is": { fail: 4, lean: 2 },
  "We are a team of insiders": { fail: 5, lean: 1 },
  "No, but I have connections": { fail: 3, lean: 3 },
  "Well, no": { fail: 2, lean: 4 },
  "Big fish in a big pond": { fail: 1, lean: 5 },
  "Small fish in a big pond": { fail: 2, lean: 4 },
  "What's a market?": { fail: 3, lean: 3 },
  "I'm the next big thing": { fail: 5, lean: 1 },
  "We're pretty similar, but...": { fail: 4, lean: 2 },
  "We're still figuring it out": { fail: 3, lean: 3 },
  "Feasibility study? Check!": { fail: 1, lean: 5 },
  "In the process of studying feasibility": { fail: 2, lean: 4 },
  "We plan to do it soon": { fail: 3, lean: 3 },
  "Feasibility... what now?": { fail: 4, lean: 2 },
  "We've got a successful PoC": { fail: 1, lean: 5 },
  "We're in the middle of creating a PoC": { fail: 2, lean: 4 },
  "PoC is on the to-do list": { fail: 3, lean: 3 },
  "'Trust me, it'll work'": { fail: 4, lean: 2 },
  "MVP up and running": { fail: 1, lean: 5 },
  "Got a neat prototype": { fail: 2, lean: 4 },
  "Still in the dev dungeon": { fail: 3, lean: 3 },
  "We have a napkin": { fail: 4, lean: 2 },
  "Got a tech team and a CTO": { fail: 1, lean: 5 },
  "Got a tech team, no CTO yet": { fail: 2, lean: 4 },
  "Outsourcing our battles": { fail: 3, lean: 3 },
  "Building our tech dream team": { fail: 4, lean: 2 },
  "Tech stack, checked": { fail: 1, lean: 5 },
  "Still perusing the tech aisle": { fail: 2, lean: 4 },
  "Our dev team will handle it": { fail: 3, lean: 3 },
  "Tech stack? Sounds delicious": { fail: 4, lean: 2 },
  "Scaling like a seasoned mountaineer": { fail: 1, lean: 5 },
  "Eyeing that mountain": { fail: 2, lean: 4 },
  "Will cross that bridge when we come to it": { fail: 3, lean: 3 },
  "Scalability sounds like a brand of fish food": { fail: 4, lean: 2 },
  "Our cyber castle is a fortress": { fail: 1, lean: 5 },
  "Building the cyber walls": { fail: 2, lean: 4 },
  "Defenses are on the agenda": { fail: 3, lean: 3 },
  "Cyber...security? Is that a new game?": { fail: 4, lean: 2 },
  "Business plan in hand": { fail: 1, lean: 5 },
  "Fate's at the wheel": { fail: 2, lean: 4 },
  "It's a work in progress": { fail: 3, lean: 3 },
  "We have cash flow forecasts": { fail: 1, lean: 5 },
  "Hoping for the best": { fail: 2, lean: 4 },
  "Cash what now?": { fail: 3, lean: 3 },
  "Costs broken down": { fail: 1, lean: 5 },
  "Still counting": { fail: 2, lean: 4 },
  "I prefer not to think about it": { fail: 3, lean: 3 },
  "Secured for now": { fail: 1, lean: 5 },
  "Still in discussions": { fail: 2, lean: 4 },
  "We take care of us": { fail: 3, lean: 3 },
  "What is this 'funding' you speak of?": { fail: 4, lean: 2 },
  "We're the Avengers": { fail: 1, lean: 5 },
  "The Goonies": { fail: 2, lean: 4 },
  "We got a mix": { fail: 3, lean: 3 },
  "I don't have a team yet": { fail: 4, lean: 2 },
  "Roles are crystal clear": { fail: 1, lean: 5 },
  "Winging the organization": { fail: 2, lean: 4 },
  "Still figuring it out": { fail: 3, lean: 3 },
  "Hiring plan is in place": { fail: 1, lean: 5 },
  "Expecting clones to appear": { fail: 2, lean: 4 },
  "Making it up as we go": { fail: 3, lean: 3 },
  "Got our financial GPS": { fail: 1, lean: 5 },
  "Will ask users nicely": { fail: 2, lean: 4 },
  "Looking for the money tree": { fail: 3, lean: 3 },
  "CAC calculated": { fail: 1, lean: 5 },
  "Hoping for viral spread": { fail: 2, lean: 4 },
  "Maybe we'll get lucky": { fail: 3, lean: 3 },
  "We've lawyered up": { fail: 1, lean: 5 },
  "What is law?": { fail: 2, lean: 4 },
  "Taking it step by step": { fail: 3, lean: 3 },
  "We have a company": { fail: 1, lean: 5 },
  "Working on it": { fail: 2, lean: 4 },
  "Waiting for it to be necessary": { fail: 3, lean: 3 },
  "Got the legal stuff sorted": { fail: 1, lean: 5 },
  "Don't need it": { fail: 2, lean: 4 },
  "Still on the to-do list": { fail: 3, lean: 3 },
  "We've assessed the risks": { fail: 1, lean: 5 },
  "What happens in Vegas...": { fail: 2, lean: 4 },
};

const IdeaValidationQuestionnaire = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    [key: string]: string | "" | undefined | any;
  }>({});
  const [resultsOpen, setResultsOpen] = useState(false);
  const [averageFailScore, setAverageFailScore] = useState(0);
  const [averageLeanScore, setAverageLeanScore] = useState(0);

  const [failScores, setFailScores] = useState<{ [key: string]: number }>({});
  const [leanScores, setLeanScores] = useState<{ [key: string]: number }>({});
  const [numQuestionsAnswered, setNumQuestionsAnswered] = useState(0);

  const handleAnswerChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    const { name, value } = event.target;
    setSelectedValue((prevSelectedValue) => ({
      ...prevSelectedValue,
      [name as string]: value as string | "" | undefined,
    }));

    const [stepIndex, questionIndex] = name.split("-");
    const answer = value as string;

    // Update failScores and leanScores based on the selected answer
    if (answerScores[answer]) {
      const { fail, lean } = answerScores[answer];
      setFailScores((prevFailScores) => ({
        ...prevFailScores,
        [`${stepIndex}-${questionIndex}`]: fail,
      }));
      setLeanScores((prevLeanScores) => ({
        ...prevLeanScores,
        [`${stepIndex}-${questionIndex}`]: lean,
      }));
    }

    setNumQuestionsAnswered(
      (prevNumQuestionsAnswered) => prevNumQuestionsAnswered + 1
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    const currentStepQuestions = steps[activeStep].questions;
    const isStepCompleted = currentStepQuestions.every((_, index) =>
      Boolean(selectedValue[`${activeStep}-${index}`])
    );

    if (isStepCompleted) {
      // If it's not the last step, move to the next step
      if (activeStep !== steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // If it's the last step, start loading progress and after 10 seconds, open the results dialog
        setLoading(true);
        setTimeout(() => {
          setOpen(true);
          setLoading(false);
        }, 10000); // 10 seconds delay
      }
    } else {
      // Show alert if not all questions in the current step have been answered
      alert("Please answer all questions before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    const totalFailScore = Object.values(failScores).reduce(
      (sum, score) => sum + score,
      0
    );
    const totalLeanScore = Object.values(leanScores).reduce(
      (sum, score) => sum + score,
      0
    );
    const averageFailScore = totalFailScore / numQuestionsAnswered;
    const averageLeanScore = totalLeanScore / numQuestionsAnswered;
    setAverageFailScore(averageFailScore);
    setAverageLeanScore(averageLeanScore);
    const finalScore =
      (2 * (averageFailScore * averageLeanScore)) /
      (averageFailScore + averageLeanScore);
    console.log("Failean Score:", finalScore);

    // Open the results dialog
    setResultsOpen(true);
  };
  const handleResultsClose = () => {
    setResultsOpen(false);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "10vh", padding: "0 15px" }}
    >
      <Grid item>
        <Button variant="outlined" onClick={handleClickOpen}>
          Start Validation questionnaire
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Validation Questionnaire</DialogTitle>
          <DialogContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Stepper activeStep={activeStep} style={{ maxWidth: "100%" }}>
                  {steps.map((step, index) => (
                    <Step key={step.title}>
                      <StepLabel>{step.title}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {steps[activeStep].questions.map((question, index) => (
                  <FormControl key={index} fullWidth>
                    <Typography variant="subtitle1" gutterBottom>
                      {question.text}
                    </Typography>
                    <Select
                      name={`${activeStep}-${index}`}
                      value={selectedValue[`${activeStep}-${index}`] || ""}
                      onChange={handleAnswerChange}
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value="">Select an answer</MenuItem>
                      {question.answers.map((answer, answerIndex) => (
                        <MenuItem key={answerIndex} value={answer}>
                          {answer}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ))}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleFinish : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={resultsOpen} onClose={handleResultsClose}>
          <DialogTitle>Results</DialogTitle>
          <DialogContent>
            <Typography variant="h6">
              Your Fail score is:
              <CircularProgress
                variant="determinate"
                value={averageFailScore}
                style={{ color: "#f00" }}
              />
            </Typography>
            <Typography variant="h6">
              Your Lean score is:
              <CircularProgress
                variant="determinate"
                value={averageLeanScore}
                style={{ color: "#0f0" }}
              />
            </Typography>
            <Typography variant="h6">
              Your Failean score is:
              <CircularProgress
                variant="determinate"
                value={(averageFailScore + averageLeanScore) / 2}
                style={{ color: "#00f" }}
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResultsClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default IdeaValidationQuestionnaire;
