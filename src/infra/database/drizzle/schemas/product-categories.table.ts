import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { productsTable } from './products.table';

export const productCategoriesTable = pgTable('product_categories', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  productId: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  category: varchar('category', { length: 50 }).notNull().unique(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
