import React, { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ImageBackground,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../hooks/useTheme';
import { TodoItem } from '../../components/TodoItem';
import { EmptyState } from '../../components/EmptyState';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { FilterType, Todo } from '../../types';
import { useRouter } from 'expo-router';

const lightBackground = require('../../assets/Bitmap-light.png');
const darkBackground = require('../../assets/Bitmap-dark.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 300;

// ✅ Safe Loader in case something breaks early
function SafeLoader({ message }: { message: string }) {
  return (
    <View style={styles.safeLoader}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 10, color: '#666', fontSize: 16 }}>{message}</Text>
    </View>
  );
}

export default function HomeScreen() {
  console.log('🟢 HomeScreen rendering...');

  try {
    const { theme, toggleTheme } = useTheme();
    console.log('✅ Theme loaded:', theme.mode);

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');

    console.log('🧠 Fetching todos from Convex...');
    const todos = useQuery(api.todos.list);
    const toggleTodo = useMutation(api.todos.toggle);
    const deleteTodo = useMutation(api.todos.remove);

    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const filteredTodos = useMemo(() => {
      if (!todos) return [];
      let filtered = [...todos];

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (todo) =>
            todo.title.toLowerCase().includes(query) ||
            (todo.description && todo.description.toLowerCase().includes(query))
        );
      }

      if (filter === 'active') filtered = filtered.filter((t) => !t.completed);
      else if (filter === 'completed') filtered = filtered.filter((t) => t.completed);

      filtered.sort((a, b) => b.createdAt - a.createdAt);
      return filtered;
    }, [todos, searchQuery, filter]);

    const handleToggle = async (id: Todo["_id"]) => {
      try {
        await toggleTodo({ id });
        console.log('✅ Todo toggled:', id);
      } catch (error) {
        console.error('❌ Error toggling todo:', error);
      }
    };

    const handleDelete = async (id: Todo["_id"]) => {
      try {
        await deleteTodo({ id });
        console.log('🗑️ Todo deleted:', id);
      } catch (error) {
        console.error('❌ Error deleting todo:', error);
      }
    };

    const handleEdit = (todo: Todo) => setEditingTodo(todo);

    const handleAddTodo = () => {
      console.log('➕ Add Todo pressed');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.push('/modal');
    };

    if (!todos) {
      console.log('⏳ Todos still loading...');
      return <LoadingIndicator />;
    }

    console.log('✅ Todos fetched:', todos.length);

    const itemsLeft = todos.filter((t) => !t.completed).length;
    const headerImage = theme.mode === 'dark' ? darkBackground : lightBackground;

    return (
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <ImageBackground
            source={headerImage}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.headerContent}>
              <Text style={[styles.title, { color: theme.colors.text }]}>TODO</Text>
              <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
                <Ionicons
                  name={theme.mode === 'dark' ? 'sunny' : 'moon'}
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View style={styles.searchWrapper}>
            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Ionicons
                name="search"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search todos..."
                placeholderTextColor={theme.colors.textTertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={[styles.searchInput, { color: theme.colors.text }]}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState message="No todos found" icon="checkbox-outline" />
          }
        />

        <View style={[styles.footer, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            {itemsLeft} items left
          </Text>
          <View style={styles.filterContainer}>
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <TouchableOpacity key={f} onPress={() => setFilter(f)} style={styles.filterButton}>
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: filter === f ? theme.colors.primary : theme.colors.textSecondary,
                      fontWeight: filter === f ? '600' : '400',
                    },
                  ]}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => todos.filter((t) => !t.completed)}>
            <Text style={[styles.clearText, { color: theme.colors.error }]}>
              Clear Completed
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={handleAddTodo}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  } catch (error) {
    console.error('🔥 Fatal render error in HomeScreen:', error);
    return <SafeLoader message="Something went wrong. Check console logs." />;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: { position: 'relative', width: '100%', height: HERO_HEIGHT, marginBottom: 40 },
  heroImage: { position: 'absolute', width: '100%', height: HERO_HEIGHT, left: 0, top: 0 },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
  },
  title: { fontSize: 40, fontWeight: '700', letterSpacing: 15, color: '#FFFFFF' },
  themeToggle: { padding: 4 },
  searchWrapper: { position: 'absolute', bottom: -28, left: 0, right: 0, paddingHorizontal: 20, zIndex: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, padding: 0 },
  listContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerText: { fontSize: 14 },
  filterContainer: { flexDirection: 'row', gap: 12 },
  filterButton: { paddingHorizontal: 8, paddingVertical: 4 },
  filterText: { fontSize: 14 },
  clearText: { fontSize: 14 },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
