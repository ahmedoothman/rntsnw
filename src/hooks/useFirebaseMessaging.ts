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

export const useFirebaseMessaging = () => {
  const navigationRef =
    useRef<NavigationContainerRef<Record<string, object | undefined>>>(null);

  useEffect(() => {
    // Initialize Firebase messaging
    initializeFirebaseMessaging().then(_token => {
      // Handle token if needed
    });

    // Create notification channel
    createNotificationChannel();

    // Setup background listeners if navigation is ready
    if (navigationRef.current) {
      setupBackgroundNotificationListeners(navigationRef.current);
    }

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      await handleForegroundMessage(remoteMessage);
    });

    // Handle foreground notification events
    const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          if (
            detail.notification &&
            detail.notification.data &&
            detail.notification.data.screen
          ) {
            const {screen, params} = detail.notification.data;
            if (navigationRef.current && typeof screen === 'string') {
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
      unsubscribeForeground();
      unsubscribeNotifee();
    };
  }, []);

  return {navigationRef};
};
