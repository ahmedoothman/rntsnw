import React, {useState, useEffect} from 'react';
import {StatusBar, Animated} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {useAppSelector} from './src/redux/hooks';
import {useTranslation} from 'react-i18next';

// Import i18n configuration
import './src/i18n';

// Import components
import Header from './src/components/TemplateComponents/Header';
import DeveloperProfile from './src/components/TemplateComponents/DeveloperProfile';
import FeaturesSection from './src/components/TemplateComponents/FeaturesSection';
import CallToAction from './src/components/TemplateComponents/CallToAction';
import Footer from './src/components/TemplateComponents/Footer';
import ThemeProvider from './src/components/ThemeProvider';

import './global.css';

function AppContent(): React.JSX.Element {
  const {isDarkMode} = useAppSelector(state => state.theme);
  const {currentLanguage} = useAppSelector(state => state.language);
  const {i18n} = useTranslation();
  const [scrollY] = useState(new Animated.Value(0));

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

  // Handle language changes and RTL
  useEffect(() => {
    // If the current UI language doesn't match the Redux state
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
