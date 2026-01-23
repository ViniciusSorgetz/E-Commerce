import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';

export const productCategoriesTable = pgTable('product_categories', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  category: varchar('category', { length: 50 }).notNull().unique(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
