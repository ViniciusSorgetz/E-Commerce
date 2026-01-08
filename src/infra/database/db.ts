import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';

config({
  path: '.env.development',
});

const url = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}?ssl_mode=false`;

export const db = drizzle(url);
