export enum QuestionType {
  INPUT = "input",
  MULTI_CHOICE = "multi-choice",
  SINGLE_CHOICE = "single-choice",
  NUMERIC = "numeric",
}

export interface IQuestion {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
  stepId: number;
}

export interface IStep {
  id: number;
  title: string;
  stepNumber: number;
  wizardId: number;
  questions: IQuestion[];
}

export interface IWizard {
  id: number;
  title: string;
  steps: IStep[];
}
