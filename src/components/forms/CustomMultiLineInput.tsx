import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TextStyle,
  I18nManager,
} from 'react-native';
import {Text} from '@components/Text';
import {useAppSelector} from '@redux/hooks';
import {getFontFamily} from '@theme/fonts';

interface CustomMultiLineInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  value?: string;
  onChangeText?: (_text: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  style?: TextStyle;
  numberOfLines?: number;
  error?: boolean;
}

const CustomMultiLineInput: React.FC<CustomMultiLineInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  className,
  inputClassName,
  style,
  numberOfLines = 3,
  error = false,
  ...props
}) => {
  const isRTL = I18nManager.isRTL;
  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  // Get the font family for the current language
  const fontFamily = getFontFamily(currentLanguage, 'regular');

  // Calculate minimum height based on numberOfLines
  // Each line is approximately 20px (fontSize 16 + some line height)
  const lineHeight = 20;
  const minHeight = numberOfLines * lineHeight + 20; // +16 for padding

  // Combine custom style with font family
  const combinedStyle = {
    fontFamily,
    color: '#000',
    fontSize: 16,
    minHeight,
    ...(typeof style === 'object' ? style : {}),
  };

  const getContainerClasses = () => {
    const baseClasses = 'my-2 w-full border rounded-lg overflow-hidden';
    const errorClasses = error ? 'border-red-500' : 'border-gray-300';
    return `${baseClasses} ${errorClasses} ${className || ''}`;
  };

  const getInputClasses = () => {
    const baseClasses = 'bg-white text-black p-4 text-base';
    return `${baseClasses} ${inputClassName || ''}`;
  };

  return (
    <View className="mb-2">
      {label && (
        <Text weight="medium" className="text-base text-black mb-1">
          {label}
        </Text>
      )}
      <View className={getContainerClasses()}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          className={getInputClasses()}
          placeholderTextColor="#999999"
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          autoCapitalize="none"
          textAlign={isRTL ? 'right' : 'left'}
          // @ts-ignore - writingDirection is not in TextInputProps but exists
          writingDirection={isRTL ? 'rtl' : 'ltr'}
          style={combinedStyle}
          {...props}
        />
      </View>
    </View>
  );
};

export default React.memo(CustomMultiLineInput);
