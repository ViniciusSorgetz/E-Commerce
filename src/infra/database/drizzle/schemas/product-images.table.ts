import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { productsTable } from './products.table';

export const productImagesTable = pgTable('product_images', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  url: varchar('url', { length: 255 }),
  product_id: integer('product_id').references(() => productsTable.id),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
