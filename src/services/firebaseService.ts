import messaging from '@react-native-firebase/messaging';

import {Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {store} from '../redux/store';
import {addNotification} from '../redux/slices/notificationSlice';

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
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      lights: true,
      vibration: true,
      importance: AndroidImportance.HIGH,
    });
  }
}

// Display a foreground notification
export async function displayNotification(
  title: string,
  body: any,
  data: any = {},
) {
  // Create a channel (required for Android)
  await createNotificationChannel();

  // Display notification
  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId: 'default',
      smallIcon: 'ic_notification', // must be a drawable resource
      color: '#ffffff',
      pressAction: {
        id: 'default',
      },
      actions: data.actions || [],
    },
    ios: {
      categoryId: data.categoryId || '',
      attachments: data.attachments || [],
    },
  });
}

// Handle foreground message
export async function handleForegroundMessage(remoteMessage: any) {
  const {notification, data} = remoteMessage;

  if (notification) {
    // Display the notification using Notifee
    await displayNotification(notification.title, notification.body, data);
    // Dispatch the notification to Redux store
    store.dispatch(
      addNotification({
        message: notification.body,
        type: 'info',
      }),
    );
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
