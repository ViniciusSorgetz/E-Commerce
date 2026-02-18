import { DrizzleConnection } from '@src/infra/database/drizzle/drizzle.connection';
import {
  manufacturersTable,
  productCategoriesTable,
  productsTable,
} from '@src/infra/database/drizzle/schemas';

export class Orchestrator {
  public static async resetDadatabse() {
    const db = DrizzleConnection.getConnection();
    await db.delete(productsTable);
    await db.delete(manufacturersTable);
    await db.delete(productCategoriesTable);
  }
}
