import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { productsTable } from './products.table';
import { productCategoriesTable } from './product-categories.table';

export const productTagsTable = pgTable('product_tags', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  productId: integer('product_id')
    .notNull()
    .references(() => productsTable.id),
  productCategoryId: integer('product_category_id')
    .notNull()
    .references(() => productCategoriesTable.id),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
