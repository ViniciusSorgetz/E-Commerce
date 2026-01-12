import {
  timestamp,
  integer,
  pgTable,
  varchar,
  text,
} from 'drizzle-orm/pg-core';
import { manufacturersTable } from './manufacturers.table';

export const productsTable = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  manufacturer_id: varchar('manufacturer_id', { length: 36 })
    .notNull()
    .references(() => manufacturersTable.id),
  mainImageId: integer('main_image_id').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
