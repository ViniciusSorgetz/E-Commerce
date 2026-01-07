import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';

dotenv.config();
dotenv.configDotenv({
  path: '.env.development',
});

export const db = drizzle(process.env.DATABASE_URL!);
