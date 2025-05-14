import React from 'react';
import {View, Text} from 'react-native';
import SocialLink from './SocialLink';

type DeveloperProfileProps = {
  isDarkMode: boolean;
};

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({isDarkMode}) => {
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
      <View
        className={`${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-lg rounded-3xl p-6 shadow-lg border ${
          isDarkMode ? 'border-gray-700' : 'border-blue-100'
        }`}>
        <View className="flex-row items-center mb-4">
          <View className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mr-4 items-center justify-center shadow-md">
            <Text className="text-2xl text-white font-bold bg-slate-600 p-2 rounded-lg">
              AO
            </Text>
          </View>
          <View>
            <Text
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Ahmed Othman
            </Text>
            <Text
              className={`${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              } font-medium`}>
              Mobile & Web Developer
            </Text>
          </View>
        </View>
        <Text
          className={`${
            isDarkMode ? 'text-gray-300' : 'text-gray-800'
          } mb-6 leading-relaxed`}>
          Passionate about creating beautiful, responsive, and user-friendly
          mobile and web applications using modern technologies like React
          Native and Tailwind CSS.
        </Text>
        {/* Social Links */}
        <View className="mb-2">
          <View className="flex-row items-center mb-4">
            <View
              className={`h-1 w-6 rounded-full ${
                isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
              } mr-2`}
            />
            <Text
              className={`text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Connect with me:
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
