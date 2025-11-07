import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, themeMode, toggleTheme } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue: themeMode === 'dark' ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 0.8,
          useNativeDriver: true,
          tension: 100,
          friction: 3,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 3,
        }),
      ]),
    ]).start();
  }, [themeMode]);

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleTheme();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: `${theme.colors.primary}20`,
        },
      ]}
      activeOpacity={0.7}
    >
      <Animated.View
        style={{
          transform: [{ rotate }, { scale: scaleAnim }],
        }}
      >
        <Ionicons
          name={themeMode === 'dark' ? 'moon' : 'sunny'}
          size={24}
          color={theme.colors.primary}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});