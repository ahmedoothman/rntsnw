import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {I18nManager} from 'react-native';

// Import translations
import en from './translations/en';
import ar from './translations/ar';

// Define available languages
export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

// Resources containing translations
const resources = {
  [LANGUAGES.EN]: en,
  [LANGUAGES.AR]: ar,
};

// Get device language or default to English
const deviceLanguage = getLocales()[0]?.languageCode || LANGUAGES.EN;

// Function to set up RTL layout if language is Arabic
export const configureLayoutDirection = (language: string) => {
  const isRTL = language === LANGUAGES.AR;

  // Only update if the RTL state needs to change
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // Note: In a real app, you might need to restart the app here
    // using something like react-native-restart
  }
};

// Initialize i18n
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4', // Required for Android
  resources,
  lng: deviceLanguage, // Use device language as default
  fallbackLng: LANGUAGES.EN,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

// Set initial RTL configuration
configureLayoutDirection(i18n.language);

export default i18n;
