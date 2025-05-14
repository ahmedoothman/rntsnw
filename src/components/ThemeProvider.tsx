import React, {useEffect} from 'react';
import {useColorScheme} from 'nativewind';
import {useAppSelector} from '../redux/hooks';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const {isDarkMode} = useAppSelector(state => state.theme);
  const {setColorScheme} = useColorScheme();

  // Set the color scheme based on Redux state
  useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, setColorScheme]);

  return <>{children}</>;
};

export default ThemeProvider;
