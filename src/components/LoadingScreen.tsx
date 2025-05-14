import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Animated, Easing, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {useAppSelector} from '../redux/hooks';

// Import animations
// Animation files will be required directly in getCurrentAnimation

const LoadingScreen = (): React.JSX.Element => {
  const [animationType, setAnimationType] = useState(1);
  const {isDarkMode} = useAppSelector(state => state.theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);

  // Create fade-in effect when component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  // Switch between animations every few seconds for a dynamic effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationType(prev => {
        // Cycle through 3 animations
        if (prev === 3) {
          return 1;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  // Play the animation when it changes
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.reset();
      lottieRef.current.play();
    }
  }, [animationType]);
  // Pick the current animation based on state
  const getCurrentAnimation = () => {
    switch (animationType) {
      case 1:
        return require('../assets/animations/loading_animation.json');
      case 2:
        return require('../assets/animations/dots_loading.json');
      case 3:
        return require('../assets/animations/success_animation.json');
      default:
        return require('../assets/animations/loading_animation.json');
    }
  };

  // Loading message based on animation type
  const getLoadingMessage = () => {
    switch (animationType) {
      case 1:
        return 'Loading...';
      case 2:
        return 'Almost ready...';
      case 3:
        return 'Finalizing...';
      default:
        return 'Loading...';
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900 justify-center items-center">
        <Animated.View
          style={{opacity: fadeAnim}}
          className={`items-center p-8 rounded-3xl ${
            isDarkMode ? 'bg-gray-800/40' : 'bg-white/40'
          } shadow-lg`}>
          {' '}
          <View className="w-[200px] h-[200px] items-center justify-center">
            <LottieView
              ref={lottieRef}
              source={getCurrentAnimation()}
              autoPlay={true}
              loop={true}
              style={styles.lottieView}
              resizeMode="contain"
              speed={1}
              hardwareAccelerationAndroid={true}
            />
          </View>
          <Text
            className={`mt-4 text-xl font-semibold ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
            {getLoadingMessage()}
          </Text>
          <Text
            className={`text-sm mt-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Preparing your experience...
          </Text>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  lottieView: {
    width: '100%',
    height: '100%',
  },
});

export default LoadingScreen;
