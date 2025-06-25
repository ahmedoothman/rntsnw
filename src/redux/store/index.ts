import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../slices/themeSlice';
import languageReducer from '../slices/languageSlice';
import notificationReducer from '../slices/notificationSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
