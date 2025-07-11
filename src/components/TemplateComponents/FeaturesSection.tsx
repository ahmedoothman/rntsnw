import React from 'react';
import {View, Text} from 'react-native';
import FeatureCard from './FeatureCard';
import {useTranslation} from 'react-i18next';

type FeaturesSectionProps = {
  isDarkMode?: boolean; // Made optional for backward compatibility
};

const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const {t} = useTranslation();
  const features = [
    {
      icon: '📱',
      title: t('features.items.crossplatform.title'),
      description: t('features.items.crossplatform.description'),
      cardColor: 'indigo',
    },
    {
      icon: '🎨',
      title: t('features.items.responsive.title'),
      description: t('features.items.responsive.description'),
      cardColor: 'purple',
    },
    {
      icon: '🛡️',
      title: t('features.items.accessibility.title'),
      description: t('features.items.accessibility.description'),
      cardColor: 'blue',
    },
  ];

  return (
    <View className="px-6 py-10 bg-blue-50 dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('features.title')}
      </Text>
      {/* Feature cards with glass effect */}
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
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
