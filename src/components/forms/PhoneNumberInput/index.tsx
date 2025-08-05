import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  I18nManager,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import countryCodes from './countryCodes.json';
import {useTranslation} from 'react-i18next';
import {Text} from '@components/Text';
import {useAppSelector} from '@redux/hooks';
import {getFontFamily} from '@theme/fonts';

interface CountryCode {
  code: string;
  enName: string;
  arName: string;
  flag: string;
}

interface PhoneInputProps {
  value?: string;
  onSelectCountryCode?: (_code: string) => void;
  onChangeText?: (_text: string) => void;
  errorMessage?: string;
  editable?: boolean;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onSelectCountryCode,
  onChangeText,
  errorMessage,
  editable = true,
  className,
}) => {
  const {t, i18n} = useTranslation();
  const isRTL = I18nManager.isRTL;
  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  // Get the font family for the current language
  const fontFamily = getFontFamily(currentLanguage, 'regular');
  const [selectedCountry, setSelectedCountry] = useState({
    flag: 'https://flagcdn.com/w320/sa.png',
    code: '+966',
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountryCodes, setFilteredCountryCodes] =
    useState(countryCodes);

  // Filter country codes based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCountryCodes(countryCodes);
      return;
    }

    const filtered = countryCodes.filter(country => {
      const countryName =
        i18n.language === 'ar' ? country.arName : country.enName;
      return (
        countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
      );
    });

    setFilteredCountryCodes(filtered);
  }, [searchQuery, i18n.language]);

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    onSelectCountryCode?.(country.code);
    // Keep the phone number as is, including any leading zeros
    setModalVisible(false);
  };

  return (
    <View className={`${className || ''}`}>
      {errorMessage && (
        <Text className="mt-1 text-xs text-red-500 italic">{errorMessage}</Text>
      )}
      <View
        className={`flex-row items-center border rounded-lg px-2 h-14 bg-white ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        } ${!editable ? 'bg-gray-100' : ''}`}>
        <TouchableOpacity
          className={`flex-row items-center ${isRTL ? 'ml-2' : 'mr-2'}`}
          onPress={() => setModalVisible(true)}>
          <Image
            source={{uri: selectedCountry.flag}}
            className={`w-6 h-5 rounded-sm ${isRTL ? 'ml-1' : 'mr-1'}`}
          />
          <Text className="text-base text-black">{selectedCountry.code}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#333" />
        </TouchableOpacity>
        <TextInput
          className={`text-base text-black flex-1 p-4 ${
            !editable ? 'bg-gray-100 text-gray-400' : ''
          }`}
          style={{
            fontFamily,
            color: editable ? '#000' : '#9CA3AF',
            fontSize: 16,
          }}
          keyboardType="phone-pad"
          placeholder={t('authScreens.phoneNumber')}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          autoCapitalize="none"
          textAlign={isRTL ? 'right' : 'left'}
          // @ts-ignore - writingDirection is not in TextInputProps but exists
          writingDirection={isRTL ? 'rtl' : 'ltr'}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-xl h-3/5">
            <View
              className={`flex-row justify-between items-center p-5 border-b border-gray-200 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}>
              <Text
                weight="medium"
                className={`text-lg text-gray-800 ${
                  isRTL ? 'text-right' : ''
                }`}>
                {t('authScreens.selectCountry')}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="p-1">
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View
              className={`flex-row items-center px-4 py-2 border-b border-gray-200 bg-gray-50 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}>
              <MaterialIcons name="search" size={20} color="#666" />
              <View className="w-2" />
              <TextInput
                className={`flex-1 h-10 text-base text-gray-800 ${
                  isRTL ? 'text-right' : ''
                }`}
                style={{
                  fontFamily,
                  color: '#1F2937',
                  fontSize: 16,
                }}
                placeholder={t('authScreens.search') || 'Search...'}
                placeholderTextColor="#999999"
                clearButtonMode="while-editing"
                autoCorrect={false}
                autoCapitalize="none"
                value={searchQuery}
                onChangeText={setSearchQuery}
                textAlign={isRTL ? 'right' : 'left'}
                // @ts-ignore - writingDirection is not in TextInputProps but exists
                writingDirection={isRTL ? 'rtl' : 'ltr'}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  className="p-1">
                  <MaterialIcons name="close" size={18} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {filteredCountryCodes.length === 0 ? (
              <View className="p-5 items-center flex-1 justify-center">
                <Text className="text-base text-gray-500">
                  No results found
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredCountryCodes}
                keyExtractor={item => item.code + item.enName}
                renderItem={({item}) => (
                  <TouchableOpacity
                    className={`flex-row justify-between items-center p-4 border-b border-gray-200 ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                    onPress={() => handleCountrySelect(item)}>
                    <View
                      className={`flex-row items-center ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`}>
                      <Image
                        source={{uri: item.flag}}
                        className={`w-8 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`}
                      />
                      <Text
                        className={`text-base text-gray-800 ${
                          isRTL ? 'text-right' : ''
                        }`}>
                        {`${
                          i18n.language === 'ar' ? item.arName : item.enName
                        } (${item.code})`}
                      </Text>
                    </View>
                    {selectedCountry.code === item.code && (
                      <MaterialIcons name="check" size={20} color="#60A9C6" />
                    )}
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PhoneInput;
