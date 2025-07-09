import React from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';
import {useAppSelector} from '@redux/hooks';
import {getFontFamily, FONT_SIZES} from '@theme/fonts';

interface CustomTextProps extends Omit<TextProps, 'style'> {
  weight?: 'regular' | 'medium' | 'bold' | 'light';
  size?: keyof typeof FONT_SIZES;
  children: React.ReactNode;
  className?: string;
  style?: TextStyle | TextStyle[];
}

export const Text: React.FC<CustomTextProps> = ({
  weight = 'regular',
  size: _size = 'base', // Prefix with underscore to indicate unused
  style,
  className,
  children,
  ...props
}) => {
  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  // Get the font family for the current language and weight
  const fontFamily = getFontFamily(currentLanguage, weight);

  // Only apply font family and let NativeWind handle everything else
  const baseStyle: TextStyle = {
    fontFamily,
    fontWeight: 'normal' as const,
  };

  // Apply styles in the correct order: base -> user style -> className styles will be applied by NativeWind
  const combinedStyle = Array.isArray(style)
    ? [baseStyle, ...style]
    : style
    ? [baseStyle, style]
    : baseStyle;

  return (
    // @ts-ignore - NativeWind className prop
    <RNText style={combinedStyle} className={className} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
