import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../slices/themeSlice';
import languageReducer from '../slices/languageSlice';
import notificationReducer from '../slices/notificationSlice';

const createStoreEnhancers = () => {
  const enhancers = [];

  if (__DEV__) {
    try {
      const ReactotronConfig = require('../../config/ReactotronConfig').default;
      if (ReactotronConfig && ReactotronConfig.createEnhancer) {
        enhancers.push(ReactotronConfig.createEnhancer());
      }
    } catch (error) {
      console.warn('Reactotron enhancer not available:', error);
    }
  }

  return enhancers;
};

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    notification: notificationReducer,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(createStoreEnhancers()),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
