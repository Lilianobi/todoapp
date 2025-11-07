import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${theme.colors.primary}15` },
          ]}
        >
          <Ionicons name="alert-circle" size={80} color={theme.colors.primary} />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Page Not Found
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          This screen doesn't exist.
        </Text>
        <Link href="/" style={[styles.link, { color: theme.colors.primary }]}>
          Go to home screen
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});