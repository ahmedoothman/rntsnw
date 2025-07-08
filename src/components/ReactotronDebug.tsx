import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ReactotronDebugProps {
  title?: string;
  data?: unknown;
  style?: object;
}

const ReactotronDebug: React.FC<ReactotronDebugProps> = ({
  title = 'Debug',
  data,
  style,
}) => {
  const logToReactotron = () => {
    if (__DEV__) {
      try {
        const reactotron = require('../config/ReactotronConfig').default;
        if (reactotron && reactotron.log) {
          reactotron.log(`🐛 ${title}`, data || 'Debug button pressed');
        }
      } catch (error) {
        console.warn('Reactotron logging failed:', error);
      }
    }
  };

  if (!__DEV__) {
    return null; // Don't render in production
  }

  return (
    <TouchableOpacity
      style={[styles.debugButton, style]}
      onPress={logToReactotron}>
      <Text style={styles.debugText}>🐛 {title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  debugButton: {
    backgroundColor: '#ff6b35',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ReactotronDebug;
