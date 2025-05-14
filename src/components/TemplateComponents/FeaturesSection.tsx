import React from 'react';
import {View, Text} from 'react-native';
import FeatureCard from './FeatureCard';

type FeaturesSectionProps = {
  isDarkMode: boolean;
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({isDarkMode}) => {
  const features = [
    {
      icon: '📱',
      title: 'Cross-Platform',
      description:
        'Build once, deploy on both iOS and Android platforms with a unified codebase and consistent experience',
      cardColor: 'indigo',
    },
    {
      icon: '🎨',
      title: 'Modern Styling',
      description:
        "Use Tailwind's utility-first approach for rapid UI development with clean, maintainable code",
      cardColor: 'purple',
    },
    {
      icon: '🛡️',
      title: 'Type Safety',
      description:
        'TypeScript integration for better development experience with fewer bugs and improved code quality',
      cardColor: 'blue',
    },
  ];

  return (
    <View className={`px-6 py-10 ${isDarkMode ? 'bg-gray-900' : 'bg-blue-50'}`}>
      <Text
        className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        } mb-6`}>
        Why Choose RNTSNW?
      </Text>

      {/* Feature cards with glass effect */}
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          isDarkMode={isDarkMode}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          cardColor={feature.cardColor as 'indigo' | 'purple' | 'blue'}
        />
      ))}
    </View>
  );
};

export default FeaturesSection;
