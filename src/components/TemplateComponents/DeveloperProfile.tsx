import React from 'react';
import {View, Text} from 'react-native';
import SocialLink from './SocialLink';
import {useTranslation} from 'react-i18next';

type DeveloperProfileProps = {
  isDarkMode?: boolean; // Made optional for backward compatibility
};

const DeveloperProfile: React.FC<DeveloperProfileProps> = () => {
  const {t} = useTranslation();

  // Social links data
  const socialLinks = [
    {
      title: 'GitHub',
      url: 'https://github.com/ahmedoothman',
      color: 'blue',
      iconName: 'github',
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/aothmang',
      color: 'purple',
      iconName: 'linkedin',
    },
    {
      title: 'Portfolio',
      url: 'https://othman-portfolio.vercel.app',
      color: 'green',
      iconName: 'briefcase',
    },
  ];

  return (
    <View className="px-5 -mt-8">
      <View className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-blue-100 dark:border-gray-700">
        <View className="flex-row items-center mb-4">
          <View className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mr-4 items-center justify-center shadow-md">
            <Text className="text-2xl text-white font-bold bg-slate-600 p-2 rounded-lg">
              AO
            </Text>
          </View>
          <View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('profile.greeting')} Ahmed Othman
            </Text>
            <Text className="text-blue-700 dark:text-blue-300 font-medium">
              {t('profile.title')}
            </Text>
          </View>
        </View>
        <Text className="text-gray-800 dark:text-gray-300 mb-6 leading-relaxed">
          {t('profile.bio')}
        </Text>
        {/* Social Links */}
        <View className="mb-2">
          <View className="flex-row items-center mb-4">
            <View className="h-1 w-6 rounded-full bg-blue-600 dark:bg-blue-500 mr-2" />
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {t('profile.cta')}:
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {socialLinks.map((link, index) => (
              <View key={index} className="w-[48%]">
                <SocialLink
                  title={link.title}
                  url={link.url}
                  color={link.color}
                  iconName={link.iconName}
                />
              </View>
            ))}
          </View>
        </View>
        {/* Spacer for better visual separation */}
        <View className="h-2" />
      </View>
    </View>
  );
};

export default DeveloperProfile;
