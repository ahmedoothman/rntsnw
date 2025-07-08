import React from 'react';
import ThemeProvider from './ThemeProvider';
import MainContent from './MainContent';
import LoadingScreen from './LoadingScreen';
import NotificationContainer from './NotificationContainer';
import {useI18nInitialization} from '../hooks/useI18nInitialization';
import {useFirebaseMessaging} from '../hooks/useFirebaseMessaging';

const AppWrapper: React.FC = () => {
  const {isI18nReady} = useI18nInitialization();
  useFirebaseMessaging();
  console.log('AppWrapper initialized');
  return (
    <ThemeProvider>
      {!isI18nReady ? <LoadingScreen /> : <MainContent />}
      <NotificationContainer />
    </ThemeProvider>
  );
};

export default AppWrapper;
