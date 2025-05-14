import React from 'react';
import {View, Text} from 'react-native';

type FooterProps = {
  isDarkMode: boolean;
};

const Footer: React.FC<FooterProps> = ({isDarkMode}) => {
  return (
    <View
      className={`pt-10 pb-8 px-5 items-center ${
        isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
      } border-t ${isDarkMode ? 'border-blue-800' : 'border-blue-100'}`}>
      {/* Logo */}
      <View className="w-12 h-12 mb-4 rounded-full bg-blue-600 items-center justify-center shadow-lg">
        <Text className="text-white font-bold text-lg">AO</Text>
      </View>
      <Text
        className={`font-medium mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
        © {new Date().getFullYear()} Ahmed Othman
      </Text>
      <Text
        className={`text-sm mb-4 ${
          isDarkMode ? 'text-blue-200' : 'text-blue-700'
        }`}>
        Made with 💙 using React Native & NativeWind
      </Text>
      <View className="w-20 h-1 rounded-full bg-blue-600" />
    </View>
  );
};

export default Footer;
