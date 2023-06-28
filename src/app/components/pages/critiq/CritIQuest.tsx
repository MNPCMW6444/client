import React, { useState } from "react";
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
  Box,
  Link,
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
        text: "Did you take your product for a test drive with real users, or are you crossing fingers for a smooth ride?",
        answers: [
          "Usability tests? Completed it, mate",
          "Conducted a few test drives",
          "Getting there",
          "What is a 'usability test'?",
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

const IdeaValidationQuestionnaire = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    [key: string]: string | "";
  }>({});
  const [showTextField, setShowTextField] = useState<{
    [key: string]: boolean;
  }>({});
  const [freeText, setFreeText] = useState<{ [key: string]: string | "" }>({});

  const handleChange =
    (stepIndex: number, questionIndex: number) =>
    (event: SelectChangeEvent<string>) => {
      setSelectedValue((prev) => ({
        ...prev,
        [`${stepIndex}-${questionIndex}`]: event.target.value as string,
      }));
    };

  const handleRadioChange =
    (stepIndex: number, questionIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue((prev) => ({
        ...prev,
        [`${stepIndex}-${questionIndex}`]: event.target.value,
      }));
    };

  const handleFreeTextChange =
    (stepIndex: number, questionIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFreeText((prev) => ({
        ...prev,
        [`${stepIndex}-${questionIndex}`]: event.target.value,
      }));
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    const currentStepQuestions = steps[activeStep].questions;
    const isStepCompleted = currentStepQuestions.every((_, index) =>
      Boolean(selectedValue[`${activeStep}-${index}`])
    );

    if (isStepCompleted) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert("Please answer all questions before proceeding.");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    const isFormCompleted = steps.every((step, stepIndex) =>
      step.questions.every((_, questionIndex) =>
        Boolean(selectedValue[`${stepIndex}-${questionIndex}`])
      )
    );

    if (isFormCompleted) {
      handleClose();
    } else {
      alert("Please complete all questions in the questionnaire.");
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", padding: "0 15px" }}
    >
      <Grid item>
        <Button variant="outlined" onClick={handleClickOpen}>
          Start Validation questionnaire
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Validation Questionnaire</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} style={{ maxWidth: "100%" }}>
              {steps.map((step, index) => (
                <Step key={step.title}>
                  <StepLabel>{step.title}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {steps[activeStep].questions.map((question, index) => (
              <Box my={2} key={`${activeStep}-${index}`}>
                <Typography variant="h6" gutterBottom>
                  {question.text}
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
                  <Select
                    value={selectedValue[`${activeStep}-${index}`] || ""}
                    onChange={handleChange(activeStep, index)}
                    required
                  >
                    <MenuItem value="">None</MenuItem>
                    {question.answers.map(
                      (answer: string, answerIndex: number) => (
                        <MenuItem key={answerIndex} value={answer}>
                          {answer}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() =>
                    setShowTextField((prev) => ({
                      ...prev,
                      [`${activeStep}-${index}`]: true,
                    }))
                  }
                >
                  Add more details
                </Link>
                {showTextField[`${activeStep}-${index}`] && (
                  <TextField
                    label="Please provide details"
                    value={freeText[`${activeStep}-${index}`] || ""}
                    onChange={handleFreeTextChange(activeStep, index)}
                    fullWidth
                    margin="normal"
                  />
                )}
              </Box>
            ))}
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
      </Grid>
    </Grid>
  );
};

export default IdeaValidationQuestionnaire;
