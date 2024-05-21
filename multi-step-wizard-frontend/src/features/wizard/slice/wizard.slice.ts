import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWizard, IStep, IQuestion } from '../interfaces/wizard.interface'; // Adjust the import path as necessary
import { fetchWizard } from '../api/wizardApi';

interface Answer {
  questionId: number;
  answer: string | string[] | number | null;
}

interface WizardState {
  currentWizard: IWizard | null;
  currentStepIndex: number;
  answers: Record<number, Answer>;
}

const initialState: WizardState = {
  currentWizard: null,
  currentStepIndex: 0,
  answers: {},
};

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setCurrentWizard(state, action: PayloadAction<IWizard | null>) {
        console.log(action.payload)
      state.currentWizard = action.payload;
      state.currentStepIndex = 0; 
      state.answers = {};
    },
    nextStep(state) {
      if (state.currentWizard && state.currentStepIndex < state.currentWizard.steps.length - 1) {
        state.currentStepIndex += 1;
      }
    },
    prevStep(state) {
      if (state.currentStepIndex > 0) {
        state.currentStepIndex -= 1;
      }
    },
    saveAnswer(state, action: PayloadAction<Answer>) {
        console.log(action.payload, 'save answer')
      const { questionId, answer } = action.payload;
      state.answers[questionId] = { questionId, answer };
    },
  },
});

export const { setCurrentWizard, nextStep, prevStep, saveAnswer } = wizardSlice.actions;

export const fetchWizardById = (id: number) => async (dispatch: any) => {
    try {
      const data = await fetchWizard(id); 
      dispatch(setCurrentWizard(data));
    } catch (error) {
      console.error('Error fetching wizard:', error);
    }
  };

export default wizardSlice.reducer;
