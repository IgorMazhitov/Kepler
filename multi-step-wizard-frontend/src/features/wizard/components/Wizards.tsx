import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Questions from "./Questions";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchWizardById, nextStep, prevStep } from "../slice/wizard.slice";
import Button from "@mui/material/Button";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

const WizardComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentWizard = useSelector(
    (state: RootState) => state.wizard.currentWizard
  );
  const currentStepIndex = useSelector(
    (state: RootState) => state.wizard.currentStepIndex
  );
  const answers = useSelector((state: RootState) => state.wizard.answers);

  useEffect(() => {
    dispatch(fetchWizardById(1));
  }, []);

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  const handlePrevStep = () => {
    dispatch(prevStep());
  };

  if (!currentWizard) return <div>No wizard selected</div>;
  const currentStep = currentWizard.steps[currentStepIndex];

  const handleSubmit = () => {
    alert("Submit Successful!");
    renderSummary();
  };

  const renderSummary = () => (
    <Card variant="outlined" sx={{ padding: 2, backgroundColor: "#f9f9f9" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Summary of Your Answers
        </Typography>
        {currentWizard.steps.map((step) =>
          step.questions.map((question) => (
            <Box key={question.id} mb={2}>
              <Typography variant="body1" fontWeight="bold">
                {question.question}
              </Typography>
              <Typography variant="body2">
                {JSON.stringify(answers[question.id]?.answer)}
              </Typography>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <Card sx={{ minWidth: "450px" }}>
        <CardHeader>
          <Typography variant="h5">Multi-step Wizard</Typography>
          <Typography variant="body2" color="text.secondary">
            Step {currentStepIndex + 1} of {currentWizard.steps.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentStep.title}
          </Typography>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            {currentStep.questions.map((question, index) => (
              <Questions key={index} question={question} />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {currentStepIndex > 0 && (
              <Button variant="outlined" onClick={handlePrevStep}>
                Previous
              </Button>
            )}
            {currentStepIndex < currentWizard.steps.length - 1 ? (
              <Button variant="contained" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {currentStepIndex === currentWizard.steps.length - 1 && renderSummary()}
    </>
  );
};

export default WizardComponent;
