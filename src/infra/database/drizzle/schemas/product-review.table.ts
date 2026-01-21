import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { productsTable } from './products.table';

export const productReviewsTable = pgTable('product_reviews', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  rate: integer('rate').notNull(),
  description: text('description').notNull(),
  productId: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
