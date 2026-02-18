import {
  timestamp,
  integer,
  pgTable,
  varchar,
  text,
} from 'drizzle-orm/pg-core';
import { merchantsTable } from './merchants.table';

export const productsTable = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  merchantId: varchar('merchant_id', { length: 36 })
    .notNull()
    .references(() => merchantsTable.id),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
