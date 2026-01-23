import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { productsTable } from './products.table';

export const productSpecificatonsTable = pgTable('product_specifications', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  label: varchar('label', { length: 255 }).notNull(),
  information: varchar('information', { length: 255 }).notNull(),
  productId: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
