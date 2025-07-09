import React from 'react';
import ThemeProvider from './ThemeProvider';
import RootNavigator from '../navigation/RootNavigator';
import LoadingScreen from './LoadingScreen';
import NotificationContainer from './NotificationContainer';
import {useI18nInitialization} from '../hooks/useI18nInitialization';
import {useFirebaseMessaging} from '../hooks/useFirebaseMessaging';
import {SafeAreaView} from 'react-native-safe-area-context';
const AppWrapper: React.FC = () => {
  const {isI18nReady} = useI18nInitialization();
  useFirebaseMessaging();
  return (
    <ThemeProvider>
      <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right']}>
        {/* SafeAreaView to ensure content is within safe area boundaries, excluding bottom for tab bar */}
        {!isI18nReady ? <LoadingScreen /> : <RootNavigator />}
        <NotificationContainer />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default AppWrapper;
