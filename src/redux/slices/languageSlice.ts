import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import i18n, {
  configureLayoutDirection,
  LANGUAGES,
  saveLanguageToStorage,
} from '../../i18n';
import {getLocales} from 'react-native-localize';

// Get device language or default to English
const deviceLanguage = getLocales()[0]?.languageCode || LANGUAGES.EN;

// Define the language state type
interface LanguageState {
  currentLanguage: string;
  isLoaded: boolean;
}

// Initialize the language state with device language as fallback
// The real language will be loaded from AsyncStorage when the app starts
const initialState: LanguageState = {
  currentLanguage: deviceLanguage,
  isLoaded: false,
};

// Create the language slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // Set the language from AsyncStorage on app startup
    setLoadedLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      state.isLoaded = true;
    },
    // Change language action
    changeLanguage: (state, action: PayloadAction<string>) => {
      const newLanguage = action.payload;

      // Update i18n language
      i18n.changeLanguage(newLanguage);

      // Save language preference to AsyncStorage (even though configureLayoutDirection also does this,
      // we need to do it here too for cases when RTL doesn't change)
      saveLanguageToStorage(newLanguage);

      // Configure RTL layout and check if restart is needed
      const willRestart = configureLayoutDirection(newLanguage);

      // Only update state if we're not restarting (to avoid flickering)
      // The app will restart and load the saved language after restart
      if (!willRestart) {
        state.currentLanguage = newLanguage;
      }
    },
  },
});

export const {changeLanguage, setLoadedLanguage} = languageSlice.actions;
export default languageSlice.reducer;
