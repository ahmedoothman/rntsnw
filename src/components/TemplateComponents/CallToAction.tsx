import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
type CallToActionProps = {
  onPress?: () => void;
};

const CallToAction: React.FC<CallToActionProps> = ({
  onPress = () => Linking.openURL('https://github.com/ahmedoothman'),
}) => {
  return (
    <View className="px-6 py-10">
      <View className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-7 shadow-xl overflow-hidden relative border border-indigo-500/30">
        <View className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <View className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <Text className="text-2xl font-bold text-slate-600 mb-3 relative z-10">
          Start Building Today
        </Text>
        <Text className="text-slate-600 mb-6 relative z-10 font-medium">
          Get started with RNTSNW and create beautiful cross-platform mobile
          apps quickly
        </Text>
        <TouchableOpacity
          className="bg-slate-500 py-3 px-6 rounded-xl self-start flex-row items-center"
          onPress={onPress}>
          <Text className="text-white font-bold mr-1">Get Started</Text>
          <Text>
            <FontAwesome name="caret-right" size={16} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CallToAction;
