import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Storage key for language preference - must match key used in App.tsx
const LANGUAGE_STORAGE_KEY = '@app_language';

// Function to save language preference to AsyncStorage
export const saveLanguageToStorage = async (language: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

// Get device language or default to English
const deviceLanguage = getLocales()[0]?.languageCode || LANGUAGES.EN;

// Function to set up RTL layout if language is Arabic
export const configureLayoutDirection = (language: string) => {
  const isRTL = language === LANGUAGES.AR;

  // Save language to AsyncStorage before potentially restarting
  saveLanguageToStorage(language);

  // Only update if the RTL state needs to change
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // Restart the app to apply RTL layout changes
    RNRestart.restart();
    return true; // Indicates that app is restarting
  }
  return false; // No restart needed
};

// Load saved language from AsyncStorage and initialize i18n
const initializeI18n = async () => {
  try {
    // Try to get saved language
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

    // Use saved language, device language, or fallback to English
    const initialLanguage = savedLanguage || deviceLanguage;

    await i18n.use(initReactI18next).init({
      compatibilityJSON: 'v4', // Required for Android
      resources,
      lng: initialLanguage,
      fallbackLng: LANGUAGES.EN,
      interpolation: {
        escapeValue: false, // React already escapes values
      },
    });

    // Set initial RTL configuration based on the loaded language
    configureLayoutDirection(initialLanguage);
  } catch (error) {
    console.error('Error initializing i18n:', error); // Initialize with defaults if there was an error
    await i18n.use(initReactI18next).init({
      compatibilityJSON: 'v4',
      resources,
      lng: deviceLanguage,
      fallbackLng: LANGUAGES.EN,
      interpolation: {
        escapeValue: false,
      },
    });

    configureLayoutDirection(deviceLanguage);
  }
};

// Create a promise to track i18n initialization
export const i18nInitializedPromise = initializeI18n();

export default i18n;
