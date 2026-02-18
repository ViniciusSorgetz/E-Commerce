import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { DrizzleConnection } from '@src/infra/database/drizzle/drizzle.connection';
import {
  manufacturersTable,
  productCategoriesTable,
  productsTable,
} from '@src/infra/database/drizzle/schemas';

let testModule: TestingModule;

export class Orchestrator {
  public static async clearDatabase() {
    const db = DrizzleConnection.getConnection();
    await db.delete(productsTable);
    await db.delete(manufacturersTable);
    await db.delete(productCategoriesTable);
  }

  public static async getTestModule() {
    if (testModule) {
      return testModule;
    }

    testModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    return testModule;
  }
}
