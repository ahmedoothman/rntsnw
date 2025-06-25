import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {toggleDarkMode} from '../../redux/slices/themeSlice';

type DarkModeToggleProps = {
  className?: string;
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({className}) => {
  const {isDarkMode} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };
  return (
    <View className={`flex-row items-center ${className}`}>
      <TouchableOpacity
        onPress={handleToggle}
        className="w-12 h-6 rounded-full p-1 bg-gray-300 dark:bg-indigo-600">
        <View
          className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-all ${
            isDarkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </TouchableOpacity>
      <Text className="ml-2 text-sm font-medium text-gray-700 dark:text-white">
        {isDarkMode ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
};

export default DarkModeToggle;
