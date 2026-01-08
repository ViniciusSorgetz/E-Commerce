import { Controller, Get } from '@nestjs/common';
import { db } from 'src/infra/database/db';
import { productsTable } from 'src/infra/database/schema';

@Controller()
export class ProductsController {
  constructor() {}

  @Get('/products')
  async getAllProducts() {
    const products = await db.select().from(productsTable);
    return products;
  }
}
