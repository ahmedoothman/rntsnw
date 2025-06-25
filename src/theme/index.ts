import {colors, semanticColors} from './colors';

// Type definitions for theme colors
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type Theme = {
  colors: typeof colors;
  semanticColors: typeof semanticColors;
};

// Helper function to get color by theme mode
export const getColor = (
  colorPath: string,
  mode: 'light' | 'dark' = 'light',
): string => {
  const pathArray = colorPath.split('.');
  let color: unknown =
    mode === 'light' ? semanticColors.light : semanticColors.dark;

  for (const path of pathArray) {
    if (color && typeof color === 'object' && path in color) {
      color = (color as Record<string, unknown>)[path];
    } else {
      color = undefined;
      break;
    }
  }

  return typeof color === 'string' ? color : '#000000';
};

// Helper function to get semantic colors
export const getSemanticColor = (
  colorName: keyof typeof semanticColors.light,
  mode: 'light' | 'dark' = 'light',
): string => {
  return mode === 'light'
    ? semanticColors.light[colorName]
    : semanticColors.dark[colorName];
};

// Theme configuration object
export const theme: Theme = {
  colors,
  semanticColors,
};

export default theme;
