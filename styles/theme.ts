import { Theme } from '../types';

const commonTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6584',
    background: '#F8F9FE',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    border: '#E0E0E0',
    error: '#F44336',
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
    completed: '#4CAF50',
    incomplete: '#6C63FF',
    card: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  ...commonTheme,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#8B7FFF',
    secondary: '#FF7A96',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#808080',
    border: '#333333',
    error: '#FF5252',
    success: '#69F0AE',
    warning: '#FFB74D',
    info: '#40C4FF',
    completed: '#69F0AE',
    incomplete: '#8B7FFF',
    card: '#1E1E1E',
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  ...commonTheme,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};