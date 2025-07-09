import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector} from '@redux/hooks';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '@components/LoadingScreen';

const RootNavigator: React.FC = () => {
  const {isAuthenticated, loading} = useAppSelector(state => state.auth);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
