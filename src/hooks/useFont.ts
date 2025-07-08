import {useAppSelector} from '../redux/hooks';
import {getFontFamily, getTextStyle, FONT_SIZES} from '../theme/fonts';

export const useFont = () => {
  const currentLanguage = useAppSelector(
    state => state.language.currentLanguage,
  );

  const font = {
    regular: getFontFamily(currentLanguage, 'regular'),
    medium: getFontFamily(currentLanguage, 'medium'),
    bold: getFontFamily(currentLanguage, 'bold'),
    light: getFontFamily(currentLanguage, 'light'),
  };

  const getStyle = (
    weight: 'regular' | 'medium' | 'bold' | 'light' = 'regular',
    size: keyof typeof FONT_SIZES = 'base',
  ) => getTextStyle(currentLanguage, weight, size);

  const getTailwindFont = (
    weight: 'regular' | 'medium' | 'bold' | 'light' = 'regular',
  ) => {
    const prefix = currentLanguage === 'ar' ? 'ar' : 'en';
    return `font-${prefix}-${weight}`;
  };

  return {
    font,
    getStyle,
    getTailwindFont,
    currentLanguage,
    isArabic: currentLanguage === 'ar',
  };
};

export default useFont;
