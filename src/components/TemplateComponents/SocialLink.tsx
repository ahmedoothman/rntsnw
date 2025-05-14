import React from 'react';
import {TouchableOpacity, Text, Linking, View} from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type SocialLinkProps = {
  title: string;
  url: string;
  icon?: string;
  color?: string;
  iconName?: string;
};

const SocialLink: React.FC<SocialLinkProps> = ({
  title,
  url,
  color = 'blue',
  iconName,
}) => {
  // Animation for button press
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  // Create an object with styles for different colors
  const getButtonStyles = () => {
    const styles = {
      background: '',
      iconName: '',
      border: '',
      shadow: '',
      iconColor: 'white',
    };

    switch (color) {
      case 'purple':
        // LinkedIn brand color
        styles.background = 'bg-[#0A66C2]';
        styles.border = 'border-[#0A66C2]';
        styles.iconName = iconName || 'linkedin';
        styles.shadow = 'shadow-blue-600/50';
        break;
      case 'green':
        // Portfolio/Briefcase (using a professional green)
        styles.background = 'bg-[#2E8B57]';
        styles.border = 'border-[#2E8B57]';
        styles.iconName = iconName || 'briefcase';
        styles.shadow = 'shadow-green-700/50';
        break;
      case 'orange':
        // RSS feed standard color
        styles.background = 'bg-[#F26522]';
        styles.border = 'border-[#F26522]';
        styles.iconName = iconName || 'rss';
        styles.shadow = 'shadow-orange-500/50';
        break;
      case 'facebook':
        styles.background = 'bg-[#1877F2]';
        styles.border = 'border-[#1877F2]';
        styles.iconName = iconName || 'facebook';
        styles.shadow = 'shadow-blue-500/50';
        break;
      case 'twitter':
        styles.background = 'bg-[#1DA1F2]';
        styles.border = 'border-[#1DA1F2]';
        styles.iconName = iconName || 'twitter';
        styles.shadow = 'shadow-blue-400/50';
        break;
      case 'instagram':
        // Instagram has a gradient but using a primary purple color
        styles.background = 'bg-[#E1306C]';
        styles.border = 'border-[#E1306C]';
        styles.iconName = iconName || 'instagram';
        styles.shadow = 'shadow-pink-600/50';
        break;
      default:
        // GitHub brand color
        styles.background = 'bg-[#24292F]';
        styles.border = 'border-[#24292F]';
        styles.iconName = iconName || 'github';
        styles.shadow = 'shadow-gray-700/50';
    }

    return styles;
  };

  const styles = getButtonStyles();

  // Get shadow color based on button color
  const getShadowColor = () => {
    switch (color) {
      case 'purple':
        return '#0A66C2'; // LinkedIn blue
      case 'green':
        return '#2E8B57'; // Professional green
      case 'orange':
        return '#F26522'; // RSS orange
      case 'facebook':
        return '#1877F2'; // Facebook blue
      case 'twitter':
        return '#1DA1F2'; // Twitter blue
      case 'instagram':
        return '#E1306C'; // Instagram pink
      default:
        return '#24292F'; // GitHub dark
    }
  };

  return (
    <Reanimated.View style={animatedStyles}>
      <TouchableOpacity
        className={`flex-row items-center justify-center ${styles.background} px-4 py-3 rounded-xl mb-3 shadow-lg border-2 ${styles.border}`}
        style={{shadowColor: getShadowColor()}}
        onPress={() => Linking.openURL(url)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <FontAwesome name={styles.iconName} size={20} color="white" />
        <View className="w-2" />
        <Text className="text-white font-bold text-base">{title}</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default SocialLink;
