import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '@features/modal/modalSlice';
import filtersReducer from '@features/modal/filtersSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
