import messaging from '@react-native-firebase/messaging';

import {Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';

// Request permission for iOS
export async function requestUserPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
  }
  return true; // Android doesn't need explicit permission for FCM
}

// Get the FCM token
export async function getFCMToken() {
  try {
    await requestUserPermission();
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
}

// Listen for token refresh
export function onTokenRefresh(callback: any) {
  return messaging().onTokenRefresh(token => {
    if (callback) {
      callback(token);
    }
  });
}

// Create a notification channel for Android
export async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    try {
      logToReactotron('🏗️ Creating Android notification channel');
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
      });
      logToReactotron('✅ Android notification channel created successfully');
    } catch (error) {
      logToReactotron('❌ Error creating notification channel', error);
      console.error('Failed to create notification channel:', error);
      throw error;
    }
  } else {
    logToReactotron('ℹ️ iOS - no notification channel needed');
  }
}

// Display a foreground notification
export async function displayNotification(
  title: string,
  body: any,
  data: any = {},
) {
  try {
    logToReactotron('🏗️ Creating notification channel');
    // Create a channel (required for Android)
    await createNotificationChannel();
    logToReactotron('✅ Notification channel created');

    logToReactotron('📤 Displaying notification via notifee', {
      title,
      body,
      data,
    });
    // Display notification
    await notifee.displayNotification({
      title: title || 'Notification',
      body: body || 'New message',
      data: data || {},
      android: {
        channelId: 'default',
        // Remove smallIcon temporarily to see if that's the issue
        // smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
        actions: (data && data.actions) || [],
      },
      ios: {
        categoryId: (data && data.categoryId) || '',
        attachments: (data && data.attachments) || [],
      },
    });
    logToReactotron('✅ Notifee displayNotification completed');
  } catch (error) {
    logToReactotron('❌ Error in displayNotification function', error);
    console.error('Failed to display notification:', error);
    throw error; // Re-throw to let caller handle it
  }
}

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

// Handle foreground message
export async function handleForegroundMessage(remoteMessage: any) {
  const {notification, data} = remoteMessage;
  if (notification) {
    logToReactotron('📱 Processing foreground notification', notification);

    try {
      logToReactotron('🔄 About to call displayNotification');
      // Display the notification using Notifee
      await displayNotification(notification.title, notification.body, data);
      logToReactotron('✅ displayNotification completed successfully');
    } catch (error) {
      logToReactotron('❌ Error in displayNotification', error);
      console.error('Error displaying notification:', error);
    }
  }

  return Promise.resolve();
}

// Handle background messages
export function handleBackgroundMessage(message: any) {
  // For background messages, we can also display a notification
  const {notification, data} = message;

  if (notification) {
    displayNotification(notification.title, notification.body, data);
  }

  // Return a promise to signal completion of the background task
  return Promise.resolve();
}

// Initialize Firebase Messaging
export async function initializeFirebaseMessaging() {
  try {
    await requestUserPermission();
    const token = await getFCMToken();
    return token;
  } catch (error) {
    console.error('Firebase messaging initialization failed:', error);
    return null;
  }
}
