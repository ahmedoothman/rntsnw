import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {useNotification} from '../hooks/useNotification';
import {Notification} from '../redux/slices/notificationSlice';

const {width} = Dimensions.get('window');

interface NotificationItemProps {
  notification: Notification;
  onRemove: (_id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-width)).current;

  const handleRemove = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove(notification.id);
    });
  }, [fadeAnim, slideAnim, onRemove, notification.id]);

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto remove if duration is set
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [fadeAnim, slideAnim, handleRemove, notification.duration]);

  const getNotificationStyle = () => {
    switch (notification.type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.info;
    }
  };

  const getIconText = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <Animated.View
      style={[
        styles.notificationContainer,
        getNotificationStyle(),
        {
          opacity: fadeAnim,
          transform: [{translateX: slideAnim}],
        },
      ]}>
      <TouchableOpacity
        style={styles.notificationContent}
        onPress={handleRemove}
        activeOpacity={0.8}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{getIconText()}</Text>
        </View>
        <View style={styles.textContainer}>
          {notification.title && (
            <Text style={styles.title}>{notification.title}</Text>
          )}
          <Text style={styles.message}>{notification.message}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleRemove}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const NotificationContainer: React.FC = () => {
  const notifications = useAppSelector(
    state => state.notification.notifications,
  );
  const {hideNotification} = useNotification();

  return (
    <View style={styles.container}>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={hideNotification}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    zIndex: 9999,
    pointerEvents: 'box-none',
  },
  notificationContainer: {
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  closeText: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  success: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  error: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  warning: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  info: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
});

export default NotificationContainer;
