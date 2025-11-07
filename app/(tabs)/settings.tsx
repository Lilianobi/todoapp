import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../hooks/useTheme';
import { ThemeToggle } from '../../components/ThemeToggle';



export default function SettingsScreen() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const todos = useQuery(api.todos.list);
  const clearCompleted = useMutation(api.todos.clearCompleted);

  const stats = {
    total: todos?.length || 0,
    active: todos?.filter((t) => !t.completed).length || 0,
    completed: todos?.filter((t) => t.completed).length || 0,
  };

  const handleClearCompleted = async () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    try {
      await clearCompleted({});
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    rightElement,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
      ]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${theme.colors.primary}15` },
        ]}
      >
        <Ionicons name={icon} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  const StatCard = ({
    icon,
    label,
    value,
    color,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: number;
    color: string;
  }) => (
    <View
      style={[
        styles.statCard,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
      ]}
    >
      <View style={[styles.statIconContainer, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
        {label}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Stats Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Statistics
        </Text>
        <View style={styles.statsContainer}>
          <StatCard
            icon="list"
            label="Total"
            value={stats.total}
            color={theme.colors.primary}
          />
          <StatCard
            icon="radio-button-off"
            label="Active"
            value={stats.active}
            color={theme.colors.warning}
          />
          <StatCard
            icon="checkmark-circle"
            label="Completed"
            value={stats.completed}
            color={theme.colors.success}
          />
        </View>
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Appearance
        </Text>
        <SettingItem
          icon={themeMode === 'dark' ? 'moon' : 'sunny'}
          title="Theme"
          subtitle={`Current: ${themeMode === 'dark' ? 'Dark' : 'Light'} Mode`}
          rightElement={<ThemeToggle />}
        />
      </View>

      {/* Data Management Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Data Management
        </Text>
        <SettingItem
          icon="trash-bin"
          title="Clear Completed"
          subtitle={`Remove ${stats.completed} completed ${
            stats.completed === 1 ? 'todo' : 'todos'
          }`}
          rightElement={
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: `${theme.colors.error}20`,
                  opacity: stats.completed === 0 ? 0.5 : 1,
                },
              ]}
              onPress={handleClearCompleted}
              disabled={stats.completed === 0}
            >
              <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>
                Clear
              </Text>
            </TouchableOpacity>
          }
        />
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About
        </Text>
        <SettingItem
          icon="information-circle"
          title="Version"
          subtitle="1.0.0"
        />
        <SettingItem
          icon="code-slash"
          title="Made with"
          subtitle="React Native & Convex"
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textTertiary }]}>
          Built with ❤️ for Stage 3b
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
  },
});