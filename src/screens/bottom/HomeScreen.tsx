import React, {useState, useEffect} from 'react';
import {StatusBar, Animated, View, TouchableOpacity} from 'react-native';
import Text from '@components/Text';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector, useAppDispatch} from '@redux/hooks';
import {setLoadedLanguage} from '@redux/slices/languageSlice';
import {addNotification} from '@redux/slices/notificationSlice';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotification} from '@hooks/useNotification';

// Import components
import Header from '@components/TemplateComponents/Header';
import DeveloperProfile from '@components/TemplateComponents/DeveloperProfile';
import FeaturesSection from '@components/TemplateComponents/FeaturesSection';
import CallToAction from '@components/TemplateComponents/CallToAction';
import Footer from '@components/TemplateComponents/Footer';

const HomeScreen = (): React.JSX.Element => {
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

  const triggerFirebaseStyleNotification = () => {
    // Test the exact same dispatch that Firebase service uses
    dispatch(
      addNotification({
        message: 'This simulates a Firebase notification body',
        type: 'info',
        title: 'Firebase Test',
      }),
    );
  };

  const simulateFirebaseMessage = () => {
    // Simulate exactly what the useFirebaseMessaging hook does
    showNotification({
      message: 'Simulated Firebase message body',
      type: 'info',
      title: 'Simulated Firebase',
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
        <View className="flex-row justify-center items-center gap-1 p-4 flex-wrap">
          <TouchableOpacity
            className="bg-green-500 px-2 py-3 rounded shadow-sm flex-1 min-w-24 max-w-32"
            onPress={triggerSuccessNotification}>
            <Text className="text-white font-bold text-center text-xs">
              Success
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 px-2 py-3 rounded shadow-sm flex-1 min-w-24 max-w-32"
            onPress={triggerErrorNotification}>
            <Text className="text-white font-bold text-center text-xs">
              Error
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 px-2 py-3 rounded shadow-sm flex-1 min-w-24 max-w-32"
            onPress={triggerFirebaseStyleNotification}>
            <Text className="text-white font-bold text-center text-xs">
              Firebase
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-purple-500 px-2 py-3 rounded shadow-sm flex-1 min-w-24 max-w-32"
            onPress={simulateFirebaseMessage}>
            <Text className="text-white font-bold text-center text-xs">
              Hook Test
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
