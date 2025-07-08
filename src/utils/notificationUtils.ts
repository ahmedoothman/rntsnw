import notifee, {EventType} from '@notifee/react-native';

// You can import AsyncStorage or other storage solutions here to persist notification data
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigation types
interface NavigationData {
  screen?: string;
  params?: Record<string, unknown>;
}

interface NavigationProp {
  navigate: (_screen: string, _params?: Record<string, unknown>) => void;
}

/**
 * Set up background event handler for notifications
 * This should be called once during app startup
 *
 * CUSTOM UI NOTE:
 * This function handles background notification interactions.
 * While you can't show custom UI while the app is in background,
 * you can prepare the app to show custom UI when it reopens by storing
 * notification information in AsyncStorage or another persistent store.
 */
export function setupBackgroundNotificationListeners(
  _navigation: NavigationProp,
): void {
  // Handle notification press in background/quit state
  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      // Get any navigation data from notification
      const data = detail.notification?.data as NavigationData | undefined;

      // Handle navigation or other actions based on notification data
      if (data && data.screen) {
        // CUSTOM UI PREPARATION POINT
        // You can store notification data to trigger custom UI when app opens
        // Example with AsyncStorage:
        // AsyncStorage.setItem('PENDING_NOTIFICATION_DATA', JSON.stringify({
        //   screen: data.screen,
        //   params: data.params,
        //   title: detail.notification.title,
        //   body: detail.notification.body,
        //   timestamp: Date.now()
        // }));
        // You can dispatch an action to Redux store to handle navigation when app opens
        // or use another mechanism to navigate when app becomes active
      }
    } else if (type === EventType.ACTION_PRESS) {
      // Handle action button press
    }
  });
}

/**
 * Process initial notification that launched the app
 * Call this on app launch to check if app was opened from a notification
 */
/**
 * Process initial notification that launched the app
 * Call this on app launch to check if app was opened from a notification
 *
 * CUSTOM UI NOTE:
 * This is a critical point for custom UI implementation.
 * When the app launches from a notification, you can:
 * 1. Show a special welcome screen or modal specific to the notification
 * 2. Pre-populate form fields based on notification data
 * 3. Show different UI elements based on notification type
 * 4. Combine with stored data from AsyncStorage to provide context
 */
export async function checkInitialNotification(
  _navigation: NavigationProp,
): Promise<void> {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    // Get navigation data from notification
    const data = initialNotification.notification?.data as
      | NavigationData
      | undefined;

    // Navigate based on notification data
    if (data && data.screen) {
      // Example (uncomment and adapt to your navigation structure):
      // _navigation.navigate(data.screen, data.params);
    }
  }
}
