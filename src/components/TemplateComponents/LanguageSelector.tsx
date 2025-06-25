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

  const handleLanguageChange = (language: string) => {
    dispatch(changeLanguage(language));
  };

  return (
    <View className="flex flex-row items-center gap-2">
      <Text className="text-sm text-gray-700 dark:text-gray-300">
        {t('footer.language')}:
      </Text>
      <View className="flex flex-row gap-2">
        <TouchableOpacity
          className={`px-2 py-1 rounded ${
            currentLanguage === LANGUAGES.EN
              ? 'bg-blue-500 dark:bg-blue-700'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
          onPress={() => handleLanguageChange(LANGUAGES.EN)}>
          <Text
            className={`text-sm font-medium ${
              currentLanguage === LANGUAGES.EN
                ? 'text-white'
                : 'text-gray-800 dark:text-white'
            }`}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-2 py-1 rounded ${
            currentLanguage === LANGUAGES.AR
              ? 'bg-blue-500 dark:bg-blue-700'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
          onPress={() => handleLanguageChange(LANGUAGES.AR)}>
          <Text
            className={`text-sm font-medium ${
              currentLanguage === LANGUAGES.AR
                ? 'text-white'
                : 'text-gray-800 dark:text-white'
            }`}>
            العربية
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageSelector;
