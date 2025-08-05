// Font weight type definitions
export type FontWeight =
  | 'regular'
  | 'light'
  | 'extraLight'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

// Language type definitions
export type SupportedLanguage = 'en' | 'ar';

// Font family configuration type
export interface FontFamilyConfig {
  regular: string | undefined;
  light: string | undefined;
  extraLight: string | undefined;
  medium: string | undefined;
  semiBold: string | undefined;
  bold: string | undefined;
  extraBold: string | undefined;
  black: string | undefined;
}

// Complete font families configuration type
export interface FontFamilies {
  en: FontFamilyConfig;
  ar: FontFamilyConfig;
}

// Cairo font variants available
export const CAIRO_VARIANTS = [
  'Cairo-Regular',
  'Cairo-Light',
  'Cairo-ExtraLight',
  'Cairo-Medium',
  'Cairo-SemiBold',
  'Cairo-Bold',
  'Cairo-ExtraBold',
  'Cairo-Black',
] as const;

export type CairoVariant = (typeof CAIRO_VARIANTS)[number];
