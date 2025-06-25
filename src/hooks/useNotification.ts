import {useCallback} from 'react';
import {useAppDispatch} from '../redux/hooks';
import {
  addNotification,
  removeNotification,
  clearAllNotifications,
  Notification,
} from '../redux/slices/notificationSlice';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const showNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp'>) => {
      dispatch(addNotification(notification));
    },
    [dispatch],
  );

  const showSuccess = useCallback(
    (message: string, title?: string, duration?: number) => {
      showNotification({
        type: 'success',
        title,
        message,
        duration,
      });
    },
    [showNotification],
  );

  const showError = useCallback(
    (message: string, title?: string, duration?: number) => {
      showNotification({
        type: 'error',
        title,
        message,
        duration: duration ?? 6000, // errors shown longer by default
      });
    },
    [showNotification],
  );

  const showWarning = useCallback(
    (message: string, title?: string, duration?: number) => {
      showNotification({
        type: 'warning',
        title,
        message,
        duration,
      });
    },
    [showNotification],
  );

  const showInfo = useCallback(
    (message: string, title?: string, duration?: number) => {
      showNotification({
        type: 'info',
        title,
        message,
        duration,
      });
    },
    [showNotification],
  );

  const hideNotification = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch],
  );

  const clearAll = useCallback(() => {
    dispatch(clearAllNotifications());
  }, [dispatch]);

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification,
    clearAll,
  };
};
