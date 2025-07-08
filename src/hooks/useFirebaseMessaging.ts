import {useEffect, useRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {
  initializeFirebaseMessaging,
  handleForegroundMessage,
  createNotificationChannel,
} from '../services/firebaseService';
import {
  setupBackgroundNotificationListeners,
  checkInitialNotification,
} from '../utils/notificationUtils';

// Reactotron logging helper
const logToReactotron = (message: string, data?: unknown) => {
  if (__DEV__) {
    try {
      const reactotron = require('../config/ReactotronConfig').default;
      if (reactotron && reactotron.log) {
        reactotron.log(message, data);
      }
    } catch (error) {
      console.warn('Reactotron logging failed:', error);
    }
  }
};

export const useFirebaseMessaging = () => {
  const navigationRef =
    useRef<NavigationContainerRef<Record<string, object | undefined>>>(null);

  useEffect(() => {
    logToReactotron('🚀 Firebase Messaging Hook Initialized');

    // Initialize Firebase messaging
    initializeFirebaseMessaging().then(token => {
      logToReactotron('🔑 Firebase Token Received', {token});
    });

    // Create notification channel
    createNotificationChannel();

    // Setup background listeners if navigation is ready
    if (navigationRef.current) {
      setupBackgroundNotificationListeners(navigationRef.current);
    }

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      logToReactotron('📱 Foreground Message Received', remoteMessage);
      await handleForegroundMessage(remoteMessage);
    });

    // Handle foreground notification events
    const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
      logToReactotron('🔔 Notification Event', {type, detail});

      switch (type) {
        case EventType.PRESS:
          if (
            detail.notification &&
            detail.notification.data &&
            detail.notification.data.screen
          ) {
            const {screen, params} = detail.notification.data;
            if (navigationRef.current && typeof screen === 'string') {
              logToReactotron('📍 Navigating to screen', {screen, params});
              navigationRef.current.navigate(
                screen,
                params as object | undefined,
              );
            }
          }
          break;
        case EventType.ACTION_PRESS:
          // Handle action press if needed
          break;
      }
    });

    // Check for initial notification
    if (navigationRef.current) {
      checkInitialNotification(navigationRef.current);
    }

    // Cleanup subscriptions
    return () => {
      logToReactotron('🧹 Cleaning up Firebase Messaging subscriptions');
      unsubscribeForeground();
      unsubscribeNotifee();
    };
  }, []);

  return {navigationRef};
};
