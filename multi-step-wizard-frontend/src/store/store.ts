import { configureStore } from '@reduxjs/toolkit';
import wizardReducer from '../features/wizard/slice/wizard.slice';

const store = configureStore({
  reducer: {
    wizard: wizardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
