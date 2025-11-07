import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all todos
export const list = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .withIndex("by_order")
      .order("desc")
      .collect();
    return todos;
  },
});

// Query to search todos
export const search = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").collect();
    
    if (!args.searchTerm) {
      return todos;
    }
    
    const searchLower = args.searchTerm.toLowerCase();
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchLower) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower))
    );
  },
});

// Mutation to create a new todo
export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Get the highest order number to place new todo at the top
    const todos = await ctx.db.query("todos").collect();
    const maxOrder = todos.length > 0 
      ? Math.max(...todos.map(t => t.order)) 
      : 0;
    
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      completed: false,
      dueDate: args.dueDate,
      createdAt: now,
      updatedAt: now,
      order: maxOrder + 1,
    });
    
    return todoId;
  },
});

// Mutation to update a todo
export const update = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    
    return id;
  },
});

// Mutation to toggle todo completion
export const toggle = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    
    if (!todo) {
      throw new Error("Todo not found");
    }
    
    await ctx.db.patch(args.id, {
      completed: !todo.completed,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Mutation to delete a todo
export const remove = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Mutation to reorder todos (for drag and drop)
export const reorder = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("todos"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const promises = args.updates.map((update) =>
      ctx.db.patch(update.id, {
        order: update.order,
        updatedAt: Date.now(),
      })
    );
    
    await Promise.all(promises);
    return true;
  },
});

// Query to filter todos by completion status
export const filterByStatus = query({
  args: {
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (typeof args.completed === 'undefined') {
      return await ctx.db
        .query("todos")
        .withIndex("by_order")
        .order("desc")
        .collect();
    }
    
    return await ctx.db
      .query("todos")
      .withIndex("by_completed", (q) => q.eq("completed", args.completed as boolean))
      .collect();
  },
});

// Mutation to clear all completed todos
export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .withIndex("by_completed", (q) => q.eq("completed", true))
      .collect();
    
    const deletePromises = completedTodos.map((todo) => ctx.db.delete(todo._id));
    await Promise.all(deletePromises);
    
    return completedTodos.length;
  },
});