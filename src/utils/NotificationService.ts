import {store} from '../redux/store';
import {
  addNotification,
  removeNotification,
  clearAllNotifications,
} from '../redux/slices/notificationSlice';

// Global notification functions that can be used anywhere without hooks
export const NotificationService = {
  success: (message: string, title?: string, duration?: number) => {
    store.dispatch(
      addNotification({
        type: 'success',
        title,
        message,
        duration,
      }),
    );
  },

  error: (message: string, title?: string, duration?: number) => {
    store.dispatch(
      addNotification({
        type: 'error',
        title,
        message,
        duration: duration ?? 6000, // errors shown longer by default
      }),
    );
  },

  warning: (message: string, title?: string, duration?: number) => {
    store.dispatch(
      addNotification({
        type: 'warning',
        title,
        message,
        duration,
      }),
    );
  },

  info: (message: string, title?: string, duration?: number) => {
    store.dispatch(
      addNotification({
        type: 'info',
        title,
        message,
        duration,
      }),
    );
  },

  remove: (id: string) => {
    store.dispatch(removeNotification(id));
  },

  clearAll: () => {
    store.dispatch(clearAllNotifications());
  },
};
