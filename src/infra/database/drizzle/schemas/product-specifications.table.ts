import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { productsTable } from './products.table';

export const productSpecificatonsTable = pgTable('product_specifications', {
  label: varchar('label', { length: 255 }).notNull(),
  information: varchar('label', { length: 255 }).notNull(),
  product_id: integer('product_id').references(() => productsTable.id),
});
