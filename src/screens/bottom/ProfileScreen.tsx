import React from 'react';
import {View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Text from '@components/Text';
import {useAppSelector, useAppDispatch} from '@redux/hooks';
import {logout} from '@redux/slices/authSlice';
import {toggleDarkMode} from '@redux/slices/themeSlice';
import {useTranslation} from 'react-i18next';

interface ProfileOptionProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  color?: string;
  showArrow?: boolean;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  title,
  subtitle,
  onPress,
  color,
  showArrow = true,
}) => (
  <TouchableOpacity
    className="rounded-xl p-4 mb-3 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600"
    onPress={onPress}>
    <View className="flex-row justify-between items-center">
      <View className="flex-1">
        <Text
          className={`text-base font-medium ${
            color ? '' : 'text-gray-900 dark:text-gray-50'
          }`}
          weight="bold"
          style={color ? {color} : {}}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm mt-1 text-gray-900 dark:text-gray-50">
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && (
        <Text className="text-xl text-gray-900 dark:text-gray-50">›</Text>
      )}
    </View>
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  const {isDarkMode} = useAppSelector(state => state.theme);
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const handleLogout = () => {
    Alert.alert(t('logout'), t('logout_confirmation'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('logout'),
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  const handleToggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      contentContainerClassName="p-4">
      {/* Profile Header */}
      <View className="rounded-2xl p-6 mb-6 items-center shadow-lg bg-white dark:bg-gray-800">
        <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4">
          <Text className="text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-50">
          {user?.name || 'User'}
        </Text>
        <Text className="text-base opacity-70 text-gray-900 dark:text-gray-50">
          {user?.email || 'user@example.com'}
        </Text>
      </View>

      {/* Settings Options */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-50">
          {t('preferences')}
        </Text>

        <ProfileOption
          title={t('dark_mode')}
          subtitle={isDarkMode ? t('enabled') : t('disabled')}
          onPress={handleToggleTheme}
        />

        <ProfileOption
          title={t('language')}
          subtitle={t('english')}
          onPress={() => {}}
        />

        <ProfileOption
          title={t('notifications')}
          subtitle={t('manage_notifications')}
          onPress={() => {}}
        />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-50">
          {t('account')}
        </Text>

        <ProfileOption title={t('edit_profile')} onPress={() => {}} />

        <ProfileOption title={t('privacy_settings')} onPress={() => {}} />

        <ProfileOption title={t('help_support')} onPress={() => {}} />
      </View>

      <View className="mb-6">
        <ProfileOption
          title={t('logout')}
          onPress={handleLogout}
          color="#EF4444"
          showArrow={false}
        />
      </View>

      <View className="items-center py-6">
        <Text className="text-sm opacity-50 text-gray-900 dark:text-gray-50">
          {t('app_version')} 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
