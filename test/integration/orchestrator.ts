import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';
import { DrizzleConnection } from '@src/infra/database/drizzle/drizzle.connection';
import { DrizzleModule } from '@src/infra/database/drizzle/drizzle.module';
import {
  manufacturersTable,
  productCategoriesTable,
  productsTable,
} from '@src/infra/database/drizzle/schemas';
import { RegisterProductController } from '@src/infra/http/controlers/products/register-product/register-product.controller';
import { Test } from '@nestjs/testing';

export class Orchestrator {
  public static async resetDadatabse() {
    const db = DrizzleConnection.getConnection();
    await db.delete(productsTable);
    await db.delete(manufacturersTable);
    await db.delete(productCategoriesTable);
  }

  public static async getTestModule() {
    return await Test.createTestingModule({
      imports: [DrizzleModule.config()],
      controllers: [RegisterProductController],
      providers: [RegisterProductUseCase],
    }).compile();
  }
}
