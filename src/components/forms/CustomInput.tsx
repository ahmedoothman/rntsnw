import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  I18nManager,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '@redux/hooks';
import {getFontFamily} from '@theme/fonts';
import Text from '../Text';

interface CustomInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (_text: string) => void;
  icon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  error?: boolean;
  noBorder?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  icon,
  className,
  inputClassName,
  error = false,
  editable = true,
  keyboardType = 'default',
  noBorder = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);
  const isRTL = I18nManager.isRTL;
  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  // Get the font family for the current language
  const fontFamily = getFontFamily(currentLanguage, 'regular');

  const getContainerClasses = () => {
    const baseClasses = noBorder
      ? 'w-full relative overflow-hidden'
      : 'w-full relative border rounded-lg overflow-hidden';
    const errorClasses =
      error && !noBorder ? 'border-red-500' : noBorder ? '' : 'border-gray-300';
    return `${baseClasses} ${errorClasses} ${className || ''}`;
  };

  const getInputClasses = () => {
    const baseClasses = 'bg-white text-black p-4 text-base';
    const paddingClasses =
      secureTextEntry || icon ? (isRTL ? 'pr-4 pl-12' : 'pr-12 pl-4') : 'px-4';
    return `${baseClasses} ${paddingClasses} ${inputClassName || ''}`;
  };

  const getIconPosition = () => {
    return isRTL ? 'left-4' : 'right-4';
  };

  return (
    <View>
      {label && (
        <Text weight="medium" className="text-base text-gray-800 mb-2">
          {label}
        </Text>
      )}
      <View className={getContainerClasses()}>
        <TextInput
          className={getInputClasses()}
          style={[
            {
              fontFamily,
            },
            styles.textInput,
          ]}
          placeholder={placeholder}
          secureTextEntry={isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999999"
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize="none"
          textAlign={isRTL ? 'right' : 'left'}
          // @ts-ignore - writingDirection is not in TextInputProps but exists
          writingDirection={isRTL ? 'rtl' : 'ltr'}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            className={`absolute top-4 ${getIconPosition()}`}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        )}
        {icon && (
          <View className={`absolute top-4 ${getIconPosition()}`}>{icon}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#000',
    fontSize: 16,
  },
});

export default CustomInput;
