// src/features/wizard/components/Wizard.tsx
import React, { useEffect, useState } from "react";
import { fetchWizard } from "../api/wizardApi";
import Questions from "./Questions";

interface WizardStep {
  id: number;
  title: string;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  type: string;
  options?: string[];
}

const Wizard: React.FC = () => {
  const [wizardData, setWizardData] = useState<WizardStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWizardData = async () => {
      setStatus("loading");
      try {
        const data = await fetchWizard(1);
        setWizardData(data[0].steps);
        setStatus("succeeded");
      } catch (error: any) {
        setStatus("failed");
        setError(error.message);
      }
    };

    if (status === "idle") {
      fetchWizardData();
    }
  }, [status]);

  const handleNextStep = () => {
    if (currentStep < wizardData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (wizardData.length === 0) {
    return null;
  }

  const currentStepData = wizardData[currentStep];

  return (
    <div>
      <h2>
        Step {currentStep + 1} of {wizardData.length}
      </h2>
      <h3>{currentStepData.title}</h3>
      {currentStepData.questions.map((question, index) => (
        <Questions key={index} question={question} />
      ))}
      <div>
        {currentStep > 0 && (
          <button onClick={handlePrevStep}>Previous</button>
        )}
        {currentStep < wizardData.length - 1 && (
          <button onClick={handleNextStep}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
