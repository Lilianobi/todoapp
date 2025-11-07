import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
    dueDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    order: v.number(),
  })
    .index("by_creation", ["createdAt"])
    .index("by_order", ["order"])
    .index("by_completed", ["completed"]),
});