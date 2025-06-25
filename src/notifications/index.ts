// Main notification exports
export {default as NotificationContainer} from '../components/NotificationContainer';
export {useNotification} from '../hooks/useNotification';
export {NotificationService} from '../utils/NotificationService';
export {default as NotificationExample} from '../components/NotificationExample';

// Redux exports
export {
  addNotification,
  removeNotification,
  clearAllNotifications,
} from '../redux/slices/notificationSlice';
export type {Notification} from '../redux/slices/notificationSlice';
