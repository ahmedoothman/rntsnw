const {colors} = require('./src/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Override default colors with custom ones
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        neutral: colors.neutral,

        // Background colors
        background: colors.background,

        // Text colors
        text: colors.text,

        // Border colors
        border: colors.border,

        // Surface colors
        surface: colors.surface,

        // Accent colors
        accent: colors.accent,

        // Social colors
        social: colors.social,

        // Semantic aliases
        danger: colors.error,
        muted: colors.neutral,
      },
      // Removed fontFamily configuration - handle fonts in React Native components instead
    },
  },
  plugins: [],
};
