import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentError } from '@src/shared/errors/environment.error';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DatabaseError } from '@src/shared/errors/database.error';
import { Pool } from 'pg';

@Module({})
export class DrizzleModule {
  static connect(): DynamicModule {
    config({
      path: '.env.development',
    });

    const host = process.env.POSTGRES_HOST;
    const port = process.env.POSTGRES_PORT;
    const user = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const database = process.env.POSTGRES_DB;
    const ssl = process.env.POSTGRES_SSL;

    if (!host || !port || !user || !password || !database || !ssl) {
      throw new EnvironmentError(
        'Some of the environment variables are not defined,',
      );
    }

    try {
      const pool = new Pool({
        host,
        port: Number(port),
        user,
        password,
        database,
        ssl: Boolean(ssl),
      });

      const db = drizzle(pool);

      return {
        module: DrizzleModule,
        providers: [
          {
            provide: 'DRIZZLE_DB',
            useValue: db,
          },
        ],
      };
    } catch (error) {
      throw new DatabaseError({
        message: 'Error when trying to create a database connection',
        cause: error,
      });
    }
  }
}
