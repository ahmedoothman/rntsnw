import {Platform} from 'react-native';

// Font families for different languages
export const FONT_FAMILIES = {
  // English fonts
  en: {
    regular: Platform.select({
      ios: 'System', // Use system font on iOS
      android: 'Roboto', // Default Android font
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
    light: Platform.select({
      ios: 'System',
      android: 'Roboto-Light',
    }),
  },
  // Arabic fonts
  ar: {
    regular: Platform.select({
      ios: 'Cairo-Regular', // Cairo font for iOS
      android: 'Cairo-Regular', // Cairo font for Android
    }),
    medium: Platform.select({
      ios: 'Cairo-Medium',
      android: 'Cairo-Medium',
    }),
    bold: Platform.select({
      ios: 'Cairo-Bold',
      android: 'Cairo-Bold',
    }),
    light: Platform.select({
      ios: 'Cairo-Light',
      android: 'Cairo-Light',
    }),
  },
};

// Font sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

// Line heights
export const LINE_HEIGHTS = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

// Helper function to get font family based on current language
export const getFontFamily = (
  language: string,
  weight: 'regular' | 'medium' | 'bold' | 'light' = 'regular',
) => {
  const fontConfig = language === 'ar' ? FONT_FAMILIES.ar : FONT_FAMILIES.en;
  return fontConfig[weight];
};

// Text styles for different languages
export const getTextStyle = (
  language: string,
  weight: 'regular' | 'medium' | 'bold' | 'light' = 'regular',
  size: keyof typeof FONT_SIZES = 'base',
) => ({
  fontFamily: getFontFamily(language, weight),
  fontSize: FONT_SIZES[size],
  lineHeight: FONT_SIZES[size] * LINE_HEIGHTS.normal,
});

export default {
  FONT_FAMILIES,
  FONT_SIZES,
  LINE_HEIGHTS,
  getFontFamily,
  getTextStyle,
};
