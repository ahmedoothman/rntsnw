import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

const NotificationsScreen: React.FC = () => {
  const {t} = useTranslation();

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: t('welcome_notification'),
      message: t('welcome_notification_message'),
      timestamp: '2 min ago',
      read: false,
      type: 'info',
    },
    {
      id: '2',
      title: t('task_completed'),
      message: t('task_completed_message'),
      timestamp: '1 hour ago',
      read: true,
      type: 'success',
    },
    {
      id: '3',
      title: t('reminder'),
      message: t('reminder_message'),
      timestamp: '3 hours ago',
      read: true,
      type: 'warning',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'warning':
        return 'border-yellow-500';
      case 'error':
        return 'border-red-500';
      default:
        return 'border-blue-500';
    }
  };

  const renderNotification = ({item}: {item: Notification}) => (
    <TouchableOpacity
      className={`rounded-xl p-4 mb-3 border-l-4 shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 ${getTypeColor(
        item.type,
      )} ${!item.read ? 'shadow-md' : ''}`}>
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold flex-1 mr-2 text-gray-900 dark:text-gray-50">
          {item.title}
        </Text>
        <Text className="text-xs opacity-60 text-gray-900 dark:text-gray-50">
          {item.timestamp}
        </Text>
      </View>
      <Text className="text-sm leading-5 opacity-80 text-gray-900 dark:text-gray-50">
        {item.message}
      </Text>
      {!item.read && (
        <View className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row justify-between items-center px-4 py-5 pt-15">
        <Text className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          {t('notifications')}
        </Text>
        <TouchableOpacity>
          <Text className="text-blue-500 text-base font-semibold">
            {t('mark_all_read')}
          </Text>
        </TouchableOpacity>
      </View>

      {notifications.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-base opacity-60 text-gray-900 dark:text-gray-50">
            {t('no_notifications')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          contentContainerClassName="px-4 pb-5"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default NotificationsScreen;
