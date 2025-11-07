import { Id } from "../convex/_generated/dataModel";

export interface Todo {
  _id: Id<"todos">;
  _creationTime: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: number;
  createdAt: number;
  updatedAt: number;
  order: number;
}

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    completed: string;
    incomplete: string;
    card: string;
    shadow: string;
    overlay: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeight: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'date' | 'dueDate' | 'alphabetical' | 'custom';