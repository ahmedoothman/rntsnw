import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import LanguageSelector from './LanguageSelector';

type FooterProps = {
  isDarkMode?: boolean; // Made optional for backward compatibility
};

const Footer: React.FC<FooterProps> = () => {
  const {t} = useTranslation();

  return (
    <View className="pt-10 pb-8 px-5 items-center bg-blue-50 dark:bg-blue-900 border-t border-blue-100 dark:border-blue-800">
      {/* Logo */}
      <View className="w-12 h-12 mb-4 rounded-full bg-blue-600 items-center justify-center shadow-lg">
        <Text className="text-white font-bold text-lg">AO</Text>
      </View>

      {/* Language selector */}
      <View className="mb-4">
        <LanguageSelector />
      </View>

      <Text className="font-medium mb-2 text-gray-800 dark:text-white">
        {t('footer.copyright')}
      </Text>
      <Text className="text-sm mb-4 text-blue-700 dark:text-blue-200">
        Made with 💙 using React Native & NativeWind
      </Text>
      <View className="w-20 h-1 rounded-full bg-blue-600" />
    </View>
  );
};

export default Footer;
