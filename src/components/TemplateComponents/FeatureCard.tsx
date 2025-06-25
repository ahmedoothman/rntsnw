import React from 'react';
import {View, Text} from 'react-native';

type FeatureCardProps = {
  isDarkMode?: boolean; // Made optional for backward compatibility
  icon: string;
  title: string;
  description: string;
  cardColor: 'indigo' | 'purple' | 'blue';
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  cardColor,
}) => {
  const getCardClasses = () => {
    const baseClasses =
      'mb-4 rounded-2xl p-5 shadow-md bg-white/90 dark:bg-gray-800/90 border border-blue-100';

    switch (cardColor) {
      case 'purple':
        return `${baseClasses} dark:border-purple-800`;
      case 'indigo':
        return `${baseClasses} dark:border-indigo-800`;
      default:
        return `${baseClasses} dark:border-blue-800`;
    }
  };

  const getIconClasses = () => {
    const baseClasses =
      'w-12 h-12 rounded-full items-center justify-center mb-3';

    switch (cardColor) {
      case 'purple':
        return `${baseClasses} bg-purple-100 dark:bg-purple-800`;
      case 'indigo':
        return `${baseClasses} bg-blue-100 dark:bg-indigo-800`;
      default:
        return `${baseClasses} bg-blue-100 dark:bg-blue-800`;
    }
  };

  const getTitleClasses = () => {
    const baseClasses = 'text-lg font-semibold mb-2';

    switch (cardColor) {
      case 'purple':
        return `${baseClasses} text-purple-700 dark:text-purple-300`;
      case 'indigo':
        return `${baseClasses} text-blue-700 dark:text-blue-300`;
      default:
        return `${baseClasses} text-blue-700 dark:text-blue-300`;
    }
  };

  return (
    <View className={getCardClasses()}>
      <View className={getIconClasses()}>
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className={getTitleClasses()}>{title}</Text>
      <Text className="text-gray-700 dark:text-gray-300">{description}</Text>
    </View>
  );
};

export default FeatureCard;
