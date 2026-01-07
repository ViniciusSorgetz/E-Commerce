import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();
dotenv.configDotenv({
  path: '.env.development',
});

export default defineConfig({
  out: './src/infra/database/drizzle',
  schema: './src/infra/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    password: process.env.POSTGRES_PASSWORD!,
    user: process.env.POSTGRES_USER!,
    database: process.env.POSTGRES_DB!,
    host: process.env.POSTGRES_HOST!,
    port: Number(process.env.POSTGRES_PORT!),
    ssl: false,
  },
});
