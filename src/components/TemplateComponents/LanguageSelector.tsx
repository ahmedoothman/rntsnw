import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {changeLanguage} from '../../redux/slices/languageSlice';
import {LANGUAGES} from '../../i18n';

const LanguageSelector: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {currentLanguage} = useAppSelector(state => state.language);
  const {isDarkMode} = useAppSelector(state => state.theme);

  const handleLanguageChange = (language: string) => {
    dispatch(changeLanguage(language));
  };

  return (
    <View className="flex flex-row items-center gap-2">
      <Text
        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {t('footer.language')}:
      </Text>
      <View className="flex flex-row gap-2">
        <TouchableOpacity
          className={`px-2 py-1 rounded ${
            currentLanguage === LANGUAGES.EN
              ? isDarkMode
                ? 'bg-blue-700'
                : 'bg-blue-500'
              : isDarkMode
              ? 'bg-gray-700'
              : 'bg-gray-200'
          }`}
          onPress={() => handleLanguageChange(LANGUAGES.EN)}>
          <Text
            className={`text-sm font-medium ${
              currentLanguage === LANGUAGES.EN || isDarkMode
                ? 'text-white'
                : 'text-gray-800'
            }`}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-2 py-1 rounded ${
            currentLanguage === LANGUAGES.AR
              ? isDarkMode
                ? 'bg-blue-700'
                : 'bg-blue-500'
              : isDarkMode
              ? 'bg-gray-700'
              : 'bg-gray-200'
          }`}
          onPress={() => handleLanguageChange(LANGUAGES.AR)}>
          <Text
            className={`text-sm font-medium ${
              currentLanguage === LANGUAGES.AR || isDarkMode
                ? 'text-white'
                : 'text-gray-800'
            }`}>
            العربية
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageSelector;
