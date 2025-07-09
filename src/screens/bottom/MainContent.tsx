import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useAppSelector} from '@redux/hooks';
import {useTranslation} from 'react-i18next';
import Text from '@components/Text';
const MainContent: React.FC = () => {
  const {user} = useAppSelector(state => state.auth);
  const {t} = useTranslation();

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      contentContainerClassName="p-4">
      {/* Welcome Card */}
      <View className="rounded-2xl p-6 mb-5 shadow-lg bg-white dark:bg-gray-800">
        <Text
          className="text-2xl mb-2  text-gray-900 dark:text-gray-50"
          weight="bold">
          {t('welcome_back')}, {user?.name}!
        </Text>
        <Text className="text-base opacity-70 text-gray-900 dark:text-gray-50">
          {t('have_a_great_day')}
        </Text>
      </View>

      {/* Stats Container */}
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 bg-blue-500 rounded-xl p-5 mx-1.5 items-center">
          <Text className="text-white text-3xl font-bold mb-1">12</Text>
          <Text className="text-white text-sm text-center">
            {t('tasks_completed')}
          </Text>
        </View>
        <View className="flex-1 bg-green-500 rounded-xl p-5 mx-1.5 items-center">
          <Text className="text-white text-3xl font-bold mb-1">5</Text>
          <Text className="text-white text-sm text-center">
            {t('projects_active')}
          </Text>
        </View>
      </View>

      {/* Quick Actions Card */}
      <View className="rounded-2xl p-5 mb-5 shadow-lg bg-white dark:bg-gray-800">
        <Text className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          {t('quick_actions')}
        </Text>

        <TouchableOpacity className="border-2 border-blue-500 rounded-xl py-3.5 px-5 mb-3 items-center">
          <Text className="text-blue-500 text-base font-semibold">
            {t('create_new_task')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-2 border-green-500 rounded-xl py-3.5 px-5 mb-3 items-center">
          <Text className="text-green-500 text-base font-semibold">
            {t('view_reports')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity Card */}
      <View className="rounded-2xl p-5 shadow-lg bg-white dark:bg-gray-800">
        <Text className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          {t('recent_activity')}
        </Text>
        <Text
          className="text-base opacity-70 text-gray-900 dark:text-gray-50"
          weight="regular">
          {t('no_recent_activity')}
        </Text>
      </View>
    </ScrollView>
  );
};

export default MainContent;
