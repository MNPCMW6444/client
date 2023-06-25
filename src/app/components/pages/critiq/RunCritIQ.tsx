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
  Typography,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
const steps = [
  {
    title: "Market validation",
    questions: [
      "Have you conducted any user interviews or surveys to validate the problem and your solution? If yes, what were the key insights?",
      "Have you used any tools or methodologies to validate your customer's needs? For example, Lean Canvas, Value Proposition Design, etc.",
    ],
  },
  {
    title: "User/customer feedback",
    questions: [
      "Have you run any marketing tests, such as building a landing page for your product/service and seeing if people sign up or express interest?",
      "Did you test your CAC (Customer Acquisition Cost) on your main marketing channels? If yes, what is your average CAC?",
      "Have you created a minimum viable product (MVP)? If yes, what feedback have you received?",
      "Do you have any beta users or early adopters? What has been their experience and feedback?",
      "Have you done any A/B testing or usability testing for your product/service?",
      "Have you received any customer testimonials or feedback from early users?",
      "Have you organized focus groups or usability testing sessions to gather feedback from potential users?",
    ],
  },
  {
    title: "Financial resources",
    questions: [
      "How did you validate your market size and target audience?",
      "Did you validate your revenue model and price points with potential customers or through market data?",
      "Have you sought and received feedback from industry experts, advisors, or mentors?",
    ],
  },
  {
    title: "Technical resources",
    questions: [
      "How have you validated your go-to-market strategy? Did you use any experiments like launch on a small scale or in a limited area?",
      "If you have started sales, what have you learned from your sales efforts? What worked, and what didn't?",
    ],
  },
  {
    title: "Partners & stakeholders",
    questions: [
      "Have you pitched to any investors? If so, what feedback did you receive?",
      "If you've received funding, who are your investors, and why did they choose to invest in your startup?",
    ],
  },
  {
    title: "Primary offering",
    questions: [
      "Have you built a prototype/POC of your product/service? If yes, what were the results and feedback?",
      "Have you iterated your prototype based on the feedback received?",
      "Have you developed a financial model for your startup? If yes, have you shared it with a financial expert for validation?",
      "Have you validated your cost structure and revenue streams? How?",
      "Have you validated your operational processes? If so, how efficient are they, and what feedback have you received?",
      "Have you validated your business against legal and regulatory requirements? Have you consulted a lawyer or a relevant regulatory body?",
      "If applicable, have you validated your intellectual property rights, such as patents, trademarks, copyrights, etc.?",
      "Have you received any awards, industry recognition, or media coverage for your startup or its product/service?",
      "Have you participated in any industry events or trade shows? If yes, what was the response?",
      "If your business model involves working with other businesses, have you validated your solution with potential partners? What feedback or expressions of interest have you received?",
      "Have you secured any strategic partnerships or collaborations?",
      "What is the size and structure of your current team? What are their skills and areas of expertise?",
      "Do you have the necessary talent in-house to achieve your short-term and long-term goals? If not, what are your hiring plans?",
      "If your team needs to grow, how will you recruit new members and what skills will you prioritize?",
      "What is your current financial status? How long can your business operate with your current funds?",
      "Have you secured any external funding? If so, who are your investors and how much have they invested?",
      "What are your plans for raising additional funding? If you don't plan to raise funds, how will you ensure financial sustainability?",
      "What physical assets does your business have or need (e.g., office space, equipment, inventory)?",
      "Do you own these assets or are they leased/rented? How does this affect your operating costs?",
      "How do you plan to scale your physical resources as your business grows?",
      "What technology or software tools are you currently using to operate your business?",
      "Do you have the technical capacity in-house to develop, maintain, and upgrade your product/service, or will you rely on external partners/vendors?",
      "How do you plan to keep up with technological advancements relevant to your industry?",
      "Do you have any proprietary technology, patents, trademarks, or copyrights?",
      "How do you plan to protect your intellectual property as you grow?",
      "Do you have access to networks or partnerships that can provide valuable resources or support (e.g., industry contacts, mentors, strategic partners)?",
    ],
  },
];

const IdeaValidationQuestionnaire = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<{
    [key: string]: number | "";
  }>({});

  const handleChange =
    (stepIndex: number, questionIndex: number) =>
    (event: SelectChangeEvent<number>) => {
      setSelectedValue((prev) => ({
        ...prev,
        [`${stepIndex}-${questionIndex}`]: event.target.value as number,
      }));
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Idea Validation Questionnaire</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep}>
              {steps.map((step, index) => (
                <Step key={step.title}>
                  <StepLabel>{step.title}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {steps[activeStep].questions.map((question, index) => (
              <React.Fragment key={`${activeStep}-${index}`}>
                <Typography variant="h6" gutterBottom>
                  {question}
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                  <Select
                    value={selectedValue[`${activeStep}-${index}`] || ""}
                    onChange={handleChange(activeStep, index)}
                  >
                    <MenuItem value={10}>Option 1</MenuItem>
                    <MenuItem value={20}>Option 2</MenuItem>
                  </Select>
                </FormControl>
              </React.Fragment>
            ))}
          </DialogContent>
          <DialogActions>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={
                activeStep === steps.length - 1 ? handleClose : handleNext
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
