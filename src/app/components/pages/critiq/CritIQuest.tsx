import { useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MainserverContext } from "@failean/mainserver-provider";
import { LinearProgress, Box } from "@mui/material";
import UserContext from "../../../context/UserContext";
import IdeaSelector from "../../common/IdeaSelector";
import { steps, answerScores } from "../critiq/validationScore";

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

const CritIQuest = () => {
  const mainserverContext = useContext(MainserverContext);
  const axiosInstance = mainserverContext?.axiosInstance;
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>({});
  const [resultsOpen, setResultsOpen] = useState(false);
  const [averageFailScore, setAverageFailScore] = useState(0);
  const [averageLeanScore, setAverageLeanScore] = useState(0);
  const [failScores, setFailScores] = useState<any>({});
  const [leanScores, setLeanScores] = useState<any>({});
  const [numQuestionsAnswered, setNumQuestionsAnswered] = useState(0);

  const handleAnswerChange = (
    event: SelectChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setSelectedValue((prevSelectedValue: any) => ({
      ...prevSelectedValue,
      [name!]: value,
    }));

    const [stepIndex, questionIndex] = name.split("-");
    const answer = value as string;
    if (answerScores[answer]) {
      const { fail, lean } = answerScores[answer];
      setFailScores((prevFailScores: any) => ({
        ...prevFailScores,
        [`${stepIndex}-${questionIndex}`]: fail,
      }));
      setLeanScores((prevLeanScores: any) => ({
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
    const isStepCompleted = currentStepQuestions.every((question, index) => {
      const questionKey = `${activeStep}-${index}`;
      return Boolean(selectedValue[questionKey]);
    });

    if (isStepCompleted) {
      if (activeStep !== steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [currentIdeaID, setCurrentIdeaID] = useState<string>("");
  const { ideas } = useContext(UserContext);
  const handleIdeaClick = (ideaID: string) => {
    setCurrentIdeaID(ideaID);
  };

  useEffect(() => {
    if (ideas.length > 0) {
      setCurrentIdeaID(ideas[0]._id);
    }
  }, [ideas]);

  const handleFinish = () => {
    const answers: string[] = steps.flatMap((step) =>
      step.questions.map((question, index) => {
        const questionKey = `${activeStep}-${index}`;
        return selectedValue[questionKey] || "";
      })
    );

    postDataToDatabase(answers);
  };

  const handleResultsClose = () => {
    setResultsOpen(false);
  };

  const postDataToDatabase = async (answers: string[]) => {
    try {
      if (axiosInstance) {
        const response = await axiosInstance.post(
          `/data/critiqQuestionire/update/${currentIdeaID}`, // Replace `ideaID` with the actual idea ID
          {
            ideaID: currentIdeaID,
            answers: answers,
          }
        );

        console.log(response.data);
        setResultsOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={8} md={6}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Start Validation Questionnaire
        </Button>
        <IdeaSelector
          selectedIdeaID={currentIdeaID}
          setSelectedIdeaID={setCurrentIdeaID}
        />
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Validation Questionnaire</DialogTitle>
          <DialogContent>
            {loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <>
                <Stepper activeStep={activeStep} style={{ width: "100%" }}>
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
                      value={selectedValue[activeStep - index] as any}
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
          <Grid
            container
            direction="column"
            sx={{ width: "50%", height: "70vh" }}
          >
            <DialogTitle>Results</DialogTitle>
            <DialogContent>
              <Typography variant="h6">
                Your Fail score is: {Math.floor(averageFailScore)}
              </Typography>
              <Typography variant="h6">
                Your Lean score is: {Math.floor(averageLeanScore)}
              </Typography>
              <Typography variant="h6">
                Your Failean score is:{" "}
                {(averageFailScore + averageLeanScore) / 2}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleResultsClose}>Close</Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default CritIQuest;
