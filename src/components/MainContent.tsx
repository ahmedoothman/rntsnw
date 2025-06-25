import React, {useState, useEffect} from 'react';
import {StatusBar, Animated, View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {setLoadedLanguage} from '../redux/slices/languageSlice';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotification} from '../hooks/useNotification';

// Import components
import Header from './TemplateComponents/Header';
import DeveloperProfile from './TemplateComponents/DeveloperProfile';
import FeaturesSection from './TemplateComponents/FeaturesSection';
import CallToAction from './TemplateComponents/CallToAction';
import Footer from './TemplateComponents/Footer';

const MainContent = (): React.JSX.Element => {
  const {isDarkMode} = useAppSelector(state => state.theme);
  const {currentLanguage} = useAppSelector(state => state.language);
  const {i18n} = useTranslation();
  const [scrollY] = useState(new Animated.Value(0));
  const dispatch = useAppDispatch();
  const {showNotification} = useNotification(); // Destructure showNotification from the hook

  // Handle scroll for parallax effect
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  // Update StatusBar based on theme
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    StatusBar.setBackgroundColor(isDarkMode ? '#111827' : '#F3F4F6');
  }, [isDarkMode]);

  // Load saved language from AsyncStorage on app start
  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('@app_language');
        if (savedLanguage) {
          dispatch(setLoadedLanguage(savedLanguage));
        }
      } catch (error) {
        console.error('Error loading saved language:', error);
      }
    };

    loadSavedLanguage();
  }, [dispatch]);

  // Handle language changes and RTL
  useEffect(() => {
    const handleLanguageChange = async () => {
      // If the current UI language doesn't match the Redux state
      if (i18n.language !== currentLanguage) {
        i18n.changeLanguage(currentLanguage);
        try {
          await AsyncStorage.setItem('@app_language', currentLanguage);
        } catch (error) {
          console.error('Error saving language:', error);
        }
      }
    };
    handleLanguageChange();
  }, [currentLanguage, i18n]);

  // Test notification buttons
  const triggerSuccessNotification = () => {
    showNotification({
      title: 'Success',
      message: 'This is a success message!',
      type: 'success',
    });
  };

  const triggerErrorNotification = () => {
    showNotification({
      title: 'Error',
      message: 'This is an error message!',
      type: 'error',
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <Animated.ScrollView
          className="flex-1"
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <Header />
          <DeveloperProfile />
          <FeaturesSection />
          <CallToAction />
          <Footer />
        </Animated.ScrollView>
        {/* Test buttons for notifications */}
        <View className="flex-row justify-center items-center gap-4 p-4">
          <TouchableOpacity
            className="bg-green-500 px-3 py-4 rounded shadow-sm flex-1 max-w-64"
            onPress={triggerSuccessNotification}>
            <Text className="text-white font-bold text-center text-lg">
              Success
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 px-3 py-4 rounded shadow-sm flex-1 max-w-64"
            onPress={triggerErrorNotification}>
            <Text className="text-white font-bold text-center text-lg">
              Error
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MainContent;
