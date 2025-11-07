import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

interface EmptyStateProps {
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No todos yet',
  icon = 'checkbox-outline',
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <Ionicons name={icon} size={64} color={theme.colors.primary} />
      </View>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
        {message}
      </Text>
      <Text style={[styles.hint, { color: theme.colors.textTertiary }]}>
        Tap the + button to create your first todo
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});