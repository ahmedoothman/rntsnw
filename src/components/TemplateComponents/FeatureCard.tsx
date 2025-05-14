import React from 'react';
import {View, Text} from 'react-native';

type FeatureCardProps = {
  isDarkMode: boolean;
  icon: string;
  title: string;
  description: string;
  cardColor: 'indigo' | 'purple' | 'blue';
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  isDarkMode,
  icon,
  title,
  description,
  cardColor,
}) => {
  const getBgColor = () => {
    switch (cardColor) {
      case 'purple':
        return isDarkMode
          ? 'bg-purple-900/50 border border-purple-800'
          : 'bg-white/90 border border-blue-100';
      case 'indigo':
        return isDarkMode
          ? 'bg-indigo-900/50 border border-indigo-800'
          : 'bg-white/90 border border-blue-100';
      default:
        return isDarkMode
          ? 'bg-blue-900/50 border border-blue-800'
          : 'bg-white/90 border border-blue-100';
    }
  };

  const getIconBgColor = () => {
    switch (cardColor) {
      case 'purple':
        return isDarkMode ? 'bg-purple-800' : 'bg-purple-100';
      case 'indigo':
        return isDarkMode ? 'bg-indigo-800' : 'bg-blue-100';
      default:
        return isDarkMode ? 'bg-blue-800' : 'bg-blue-100';
    }
  };

  const getTitleColor = () => {
    switch (cardColor) {
      case 'purple':
        return isDarkMode ? 'text-purple-300' : 'text-purple-700';
      case 'indigo':
        return isDarkMode ? 'text-blue-300' : 'text-blue-700';
      default:
        return isDarkMode ? 'text-blue-300' : 'text-blue-700';
    }
  };

  return (
    <View className={`mb-4 rounded-2xl p-5 shadow-md ${getBgColor()}`}>
      <View
        className={`w-12 h-12 rounded-full ${getIconBgColor()} items-center justify-center mb-3`}>
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className={`text-lg font-semibold ${getTitleColor()} mb-2`}>
        {title}
      </Text>
      <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {description}
      </Text>
    </View>
  );
};

export default FeatureCard;
