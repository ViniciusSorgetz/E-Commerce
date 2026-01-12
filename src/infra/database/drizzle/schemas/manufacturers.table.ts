import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const manufacturersTable = pgTable('manufacturers', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 15 }).unique().notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
