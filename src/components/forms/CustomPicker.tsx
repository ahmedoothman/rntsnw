import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {Text} from '@components/Text';
import {useAppSelector} from '@redux/hooks';
import {getFontFamily} from '@theme/fonts';

// Get screen dimensions for calculating modal height
const {height: screenHeight} = Dimensions.get('window');

interface PickerItem {
  id: string | number;
  [key: string]: string | number | boolean | null | undefined;
}

interface CustomPickerProps<T extends PickerItem> {
  title?: string;
  value?: string | number;
  items: T[];
  onValueChange: (_value: string | number) => void;
  placeholder?: string;
  modalTitle?: string;
  keyExtractor?: (_item: T) => string | number;
  labelExtractor: (_item: T) => string;
  searchPlaceholder?: string;
  modalHeight?: number;
  className?: string;
  error?: boolean;
  noBorder?: boolean;
}

const CustomPicker = <T extends PickerItem>({
  title = '',
  value,
  items,
  onValueChange,
  placeholder = 'Select an option',
  modalTitle = 'Select an Item',
  keyExtractor = (item: T) => item.id,
  labelExtractor,
  searchPlaceholder,
  modalHeight = screenHeight * 0.6, // Default modal height (60% of screen)
  className,
  error = false,
  noBorder = false,
}: CustomPickerProps<T>) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  // Get the font family for the current language
  const fontFamily = getFontFamily(currentLanguage, 'regular');

  // Use translated search placeholder as default
  const effectiveSearchPlaceholder =
    searchPlaceholder || t('authScreens.search');

  const selectedItem = items.find(item => keyExtractor(item) === value);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    return items.filter(item => {
      const itemLabel = labelExtractor(item) || '';
      return itemLabel.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [items, searchQuery, labelExtractor]);

  // Clear search when modal closes
  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSearchQuery('');
  }, []);

  const getContainerClasses = () => {
    const baseClasses = noBorder
      ? 'w-full relative overflow-hidden'
      : 'w-full relative border rounded-lg overflow-hidden';
    const errorClasses =
      error && !noBorder ? 'border-red-500' : noBorder ? '' : 'border-gray-300';
    return `${baseClasses} ${errorClasses} ${className || ''}`;
  };

  const textStyle = {
    fontFamily,
    fontSize: 16,
    textAlign: 'left' as const,
  };

  const placeholderTextStyle = {
    ...textStyle,
    color: !selectedItem ? '#999999' : '#000',
  };

  const contentContainerStyle =
    filteredItems.length < 5 ? {flexGrow: 1} : undefined;

  const getIconPosition = () => {
    return 'right-4';
  };

  const getTextPadding = () => {
    return 'pr-8';
  };

  return (
    <View className={`${className || ''}`}>
      {title.trim() !== '' && (
        <Text weight="medium" className="text-base text-gray-800 mb-2">
          {title}
        </Text>
      )}
      <View className={getContainerClasses()}>
        <TouchableOpacity
          className="bg-white p-3 flex-row justify-between items-center relative"
          onPress={() => setModalVisible(true)}>
          <Text
            style={placeholderTextStyle}
            className={`flex-1 ${getTextPadding()}`}>
            {selectedItem ? labelExtractor(selectedItem) : placeholder}
          </Text>
          <View className={`absolute top-4 ${getIconPosition()}`}>
            <Feather name="chevron-down" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={handleCloseModal}>
        <View className="flex-1 bg-black/50 justify-end">
          <View
            className="bg-white rounded-t-xl"
            style={{
              height: modalHeight + insets.bottom,
              paddingBottom: insets.bottom,
            }}>
            <View className="flex-row justify-between items-center p-5 border-b border-gray-200">
              <Text weight="medium" className="text-lg text-gray-800">
                {modalTitle}
              </Text>
              <TouchableOpacity onPress={handleCloseModal} className="p-1">
                <Feather name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View className="px-4 py-2 border-b border-gray-200 bg-gray-50">
              <View className="border border-gray-300 rounded-lg bg-white flex-row items-center px-3 py-2">
                <Feather
                  name="search"
                  size={20}
                  color="#666"
                  className="mr-2"
                />
                <TextInput
                  className="flex-1  text-base text-black"
                  style={textStyle}
                  placeholder={effectiveSearchPlaceholder}
                  placeholderTextColor="#999999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  clearButtonMode="while-editing"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery('')}
                    className="p-1">
                    <Feather name="x-circle" size={18} color="#999" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {filteredItems.length === 0 ? (
              <View className="p-5 items-center flex-1 justify-center">
                <Text className="text-base text-gray-500">
                  No results found
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredItems}
                keyExtractor={item => keyExtractor(item).toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    className="flex-row justify-between items-center p-4 border-b border-gray-200"
                    onPress={() => {
                      onValueChange(keyExtractor(item));
                      handleCloseModal();
                    }}>
                    <Text
                      className="text-base text-black flex-1"
                      style={textStyle}>
                      {labelExtractor(item) || 'Unknown'}
                    </Text>
                    {value === keyExtractor(item) && (
                      <Feather name="check" size={20} color="#60A9C6" />
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={contentContainerStyle}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(CustomPicker) as <T extends PickerItem>(
  _props: CustomPickerProps<T>,
) => React.JSX.Element;
