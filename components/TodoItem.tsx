import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../types';
import { useTheme } from '../hooks/useTheme';

type Props = {
  todo: Todo;
  onToggle: (id: Todo["_id"]) => Promise<void>;
  onDelete: (id: Todo["_id"]) => Promise<void>;
  onEdit?: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow },
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity onPress={() => onToggle(todo._id)}>
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={todo.completed ? theme.colors.success : theme.colors.textSecondary}
          style={{ marginRight: 12 }}
        />
      </TouchableOpacity>

      {/* Text */}
      <View style={styles.content}>
        <Text
          style={{
            color: theme.colors.text,
            textDecorationLine: todo.completed ? 'line-through' : 'none',
            fontSize: 16,
          }}
        >
          {todo.title}
        </Text>
        {todo.description && (
          <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>
            {todo.description}
          </Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity onPress={() => onEdit(todo)}>
            <Ionicons name="pencil" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onDelete(todo._id)} style={{ marginLeft: 12 }}>
          <Ionicons name="trash-bin" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: { shadowOpacity: 0.1, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  content: { flex: 1 },
  actions: { flexDirection: 'row', alignItems: 'center' },
});
