import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {getTextStyle, FONT_SIZES} from '../theme/fonts';

interface CustomTextProps extends TextProps {
  weight?: 'regular' | 'medium' | 'bold' | 'light';
  size?: keyof typeof FONT_SIZES;
  children: React.ReactNode;
}

export const Text: React.FC<CustomTextProps> = ({
  weight = 'regular',
  size = 'base',
  style,
  children,
  ...props
}) => {
  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  const textStyle = getTextStyle(currentLanguage, weight, size);

  const combinedStyle = Array.isArray(style)
    ? [textStyle, ...style]
    : [textStyle, style];

  return (
    <RNText style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
