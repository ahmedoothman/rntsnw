import {Platform} from 'react-native';
import type {FontWeight, FontFamilies} from '@/types/fonts';

// Font families for different languages
export const FONT_FAMILIES: FontFamilies = {
  // English fonts
  en: {
    regular: Platform.select({
      ios: 'System', // Use system font on iOS
      android: 'Roboto', // Default Android font
    }),
    light: Platform.select({
      ios: 'System',
      android: 'Roboto-Light',
    }),
    extraLight: Platform.select({
      ios: 'System',
      android: 'Roboto-Thin', // Use Thin variant for ExtraLight
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
    }),
    semiBold: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium', // Use Medium for SemiBold fallback
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
    }),
    extraBold: Platform.select({
      ios: 'System',
      android: 'Roboto-Black', // Use Black variant for ExtraBold
    }),
    black: Platform.select({
      ios: 'System',
      android: 'Roboto-Black',
    }),
  },
  // Arabic fonts
  ar: {
    regular: Platform.select({
      ios: 'Cairo-Regular', // Cairo font for iOS
      android: 'Cairo-Regular', // Cairo font for Android
    }),
    light: Platform.select({
      ios: 'Cairo-Light',
      android: 'Cairo-Light',
    }),
    extraLight: Platform.select({
      ios: 'Cairo-ExtraLight',
      android: 'Cairo-ExtraLight',
    }),
    medium: Platform.select({
      ios: 'Cairo-Medium',
      android: 'Cairo-Medium',
    }),
    semiBold: Platform.select({
      ios: 'Cairo-SemiBold',
      android: 'Cairo-SemiBold',
    }),
    bold: Platform.select({
      ios: 'Cairo-Bold',
      android: 'Cairo-Bold',
    }),
    extraBold: Platform.select({
      ios: 'Cairo-ExtraBold',
      android: 'Cairo-ExtraBold',
    }),
    black: Platform.select({
      ios: 'Cairo-Black',
      android: 'Cairo-Black',
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
  weight: FontWeight = 'regular',
) => {
  const fontConfig = language === 'ar' ? FONT_FAMILIES.ar : FONT_FAMILIES.en;
  return fontConfig[weight] || fontConfig.regular;
};

// Text styles for different languages
export const getTextStyle = (
  language: string,
  weight: FontWeight = 'regular',
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
