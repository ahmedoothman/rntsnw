import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import DarkModeToggle from './DarkModeToggle';

type HeaderProps = {
  isDarkMode?: boolean; // Made optional for backward compatibility
};

const Header: React.FC<HeaderProps> = () => {
  // Animation values
  const headerAnimation = useSharedValue(0);

  useEffect(() => {
    // Initial animation when component mounts
    headerAnimation.value = withTiming(1, {duration: 1000});
  }, [headerAnimation]);
  return (
    <View className="pt-12 pb-16 px-5 bg-gradient-to-b from-blue-500/20 to-indigo-500/10 dark:from-indigo-900 dark:to-gray-900 items-center">
      <View className="absolute top-4 right-4">
        <DarkModeToggle />
      </View>

      <View className="w-64 h-32 mb-8 relative">
        <View className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl transform rotate-3 scale-95" />
        <View className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-2xl shadow-xl" />
        <View className="absolute inset-0 flex items-center justify-center bg-slate-600 rounded-xl">
          <Text className="text-7xl text-white font-bold opacity-90 transform -rotate-3">
            AOG
          </Text>
        </View>
      </View>

      <Reanimated.View
        className="items-center"
        style={useAnimatedStyle(() => ({
          opacity: interpolate(headerAnimation.value, [0, 1], [0, 1]),
          transform: [
            {
              translateY: interpolate(headerAnimation.value, [0, 1], [30, 0]),
            },
          ],
        }))}>
        <Text className="text-4xl font-black text-slate-700 dark:text-white bg-clip-text mb-2 px-2 rounded-lg">
          RNTSNW
        </Text>
        <Text className="text-base tracking-wide font-medium text-gray-800 dark:text-gray-300">
          React Native • TypeScript • NativeWind
        </Text>
      </Reanimated.View>
    </View>
  );
};

export default Header;
