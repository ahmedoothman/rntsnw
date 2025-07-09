import React from 'react';
import ThemeProvider from './ThemeProvider';
import RootNavigator from '../navigation/RootNavigator';
import LoadingScreen from './LoadingScreen';
import NotificationContainer from './NotificationContainer';
import {useI18nInitialization} from '../hooks/useI18nInitialization';
import {useFirebaseMessaging} from '../hooks/useFirebaseMessaging';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const AppWrapper: React.FC = () => {
  const {isI18nReady} = useI18nInitialization();
  useFirebaseMessaging();
  return (
    <ThemeProvider>
      <SafeAreaView
        className="flex-1 bg-white"
        edges={['top', 'left', 'right']}>
        {/* StatusBar configuration */}
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />
        {/* SafeAreaView to ensure content is within safe area boundaries, excluding bottom for tab bar */}
        {!isI18nReady ? <LoadingScreen /> : <RootNavigator />}
        <NotificationContainer />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default AppWrapper;
