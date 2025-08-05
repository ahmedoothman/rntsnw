import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  TextStyle,
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import {Text} from '@components/Text';
import type {FontWeight} from '@/types/fonts';

interface CustomButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  textStyle?: TextStyle;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  iconPosition?: 'left' | 'right';
  textWeight?: FontWeight;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  className,
  textClassName,
  textStyle,
  isLoading = false,
  variant = 'primary',
  disabled,
  icon,
  iconStyle,
  iconPosition = 'left',
  textWeight = 'medium',
  ...props
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'rounded-lg p-4 items-center w-full my-2';
    const variantClasses = {
      primary: 'border-2 bg-primary-600 border-primary-600',
      secondary: 'border-2 bg-secondary-600 border-secondary-600',
      outline: 'border-2 border-primary-600 bg-transparent',
    };
    const disabledClasses = isLoading || disabled ? 'opacity-70' : '';

    return `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${
      className || ''
    }`;
  };

  const getTextClasses = () => {
    // If custom textClassName is provided, use it as override
    if (textClassName) {
      return textClassName;
    }

    // Default styling when no custom textClassName is provided
    const baseClasses = 'text-base';
    const variantTextClasses = {
      primary: 'text-white',
      secondary: 'text-white',
      outline: 'text-primary-600',
    };

    return `${baseClasses} ${variantTextClasses[variant]}`;
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      onPress={!isLoading && !disabled ? onPress : undefined}
      disabled={isLoading || disabled}
      {...props}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? '#E5843B' : 'white'}
        />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && iconPosition === 'left' && (
            <Image
              source={icon}
              style={[
                {
                  width: 24,
                  height: 24,
                  marginRight: 8,
                  tintColor: variant === 'outline' ? '#E5843B' : 'white',
                },
                iconStyle,
              ]}
            />
          )}
          <Text
            weight={textWeight}
            className={getTextClasses()}
            style={textStyle}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Image
              source={icon}
              style={[
                {
                  width: 24,
                  height: 24,
                  marginLeft: 8,
                  tintColor: variant === 'outline' ? '#E5843B' : 'white',
                },
                iconStyle,
              ]}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
