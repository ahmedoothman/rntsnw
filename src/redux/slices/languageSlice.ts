import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import i18n, {configureLayoutDirection, LANGUAGES} from '../../i18n';
import {getLocales} from 'react-native-localize';

// Get device language or default to English
const deviceLanguage = getLocales()[0]?.languageCode || LANGUAGES.EN;

// Define the language state type
interface LanguageState {
  currentLanguage: string;
}

// Initialize the language state
const initialState: LanguageState = {
  currentLanguage: deviceLanguage,
};

// Create the language slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // Change language action
    changeLanguage: (state, action: PayloadAction<string>) => {
      const newLanguage = action.payload;

      // Update i18n language
      i18n.changeLanguage(newLanguage);

      // Configure RTL layout
      configureLayoutDirection(newLanguage);

      // Update state
      state.currentLanguage = newLanguage;
    },
  },
});

export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer;
