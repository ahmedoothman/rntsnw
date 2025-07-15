// Font families configuration for Tailwind CSS
// This file doesn't use React Native Platform.select to avoid import issues in Tailwind config

const FONT_FAMILIES = {
  // English fonts - using web-safe fallbacks for Tailwind
  en: {
    regular: ['Roboto', 'system-ui', 'sans-serif'],
    light: ['Roboto-Light', 'system-ui', 'sans-serif'],
    extraLight: ['Roboto-Thin', 'system-ui', 'sans-serif'],
    medium: ['Roboto-Medium', 'system-ui', 'sans-serif'],
    semiBold: ['Roboto-Medium', 'system-ui', 'sans-serif'],
    bold: ['Roboto-Bold', 'system-ui', 'sans-serif'],
    extraBold: ['Roboto-Black', 'system-ui', 'sans-serif'],
    black: ['Roboto-Black', 'system-ui', 'sans-serif'],
  },
  // Arabic fonts
  ar: {
    regular: ['Cairo-Regular', 'system-ui', 'sans-serif'],
    light: ['Cairo-Light', 'system-ui', 'sans-serif'],
    extraLight: ['Cairo-ExtraLight', 'system-ui', 'sans-serif'],
    medium: ['Cairo-Medium', 'system-ui', 'sans-serif'],
    semiBold: ['Cairo-SemiBold', 'system-ui', 'sans-serif'],
    bold: ['Cairo-Bold', 'system-ui', 'sans-serif'],
    extraBold: ['Cairo-ExtraBold', 'system-ui', 'sans-serif'],
    black: ['Cairo-Black', 'system-ui', 'sans-serif'],
  },
};

module.exports = {
  FONT_FAMILIES,
};
