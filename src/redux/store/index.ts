import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../slices/themeSlice';
import languageReducer from '../slices/languageSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
