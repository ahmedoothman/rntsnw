import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

interface ThemeState {
  isDarkMode: boolean;
}

// Initialize with the system preference
const initialState: ThemeState = {
  isDarkMode: Appearance.getColorScheme() === 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {toggleDarkMode, setDarkMode} = themeSlice.actions;
export default themeSlice.reducer;
