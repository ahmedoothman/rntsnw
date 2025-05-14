/**
 * RNTSNW - React Native TypeScript NativeWind
 * Created by Ahmed Othman
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, useColorScheme, Animated} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// Import components
import Header from './src/components/TemplateComponents/Header';
import DeveloperProfile from './src/components/TemplateComponents/DeveloperProfile';
import FeaturesSection from './src/components/TemplateComponents/FeaturesSection';
import CallToAction from './src/components/TemplateComponents/CallToAction';
import Footer from './src/components/TemplateComponents/Footer';

import './global.css';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [scrollY] = useState(new Animated.Value(0));

  // Handle scroll for parallax effect
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={isDarkMode ? '#111827' : '#F3F4F6'}
        />
        <Animated.ScrollView
          className="flex-1"
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <Header isDarkMode={isDarkMode} />
          <DeveloperProfile isDarkMode={isDarkMode} />
          <FeaturesSection isDarkMode={isDarkMode} />
          <CallToAction />

          <Footer isDarkMode={isDarkMode} />
        </Animated.ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
