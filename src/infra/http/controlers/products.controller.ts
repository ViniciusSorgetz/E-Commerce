import { Body, Controller, Get, Post } from '@nestjs/common';
import { db } from 'src/infra/database/db';
import { productsTable } from 'src/infra/database/schema';
import { registerProductBodySchema } from '../dtos/requests/register-product-body.schema';
import { RequestValidator } from '../dtos/requests/request.validator';

@Controller()
export class ProductsController {
  @Get('/products')
  async getAllProducts() {
    const products = await db.select().from(productsTable);
    return products;
  }

  @Post('/products')
  registerProduct(@Body() body: registerProductBodySchema) {
    const { name, price } = RequestValidator.validate(
      registerProductBodySchema,
      body,
    );
    // const registeredProduct = await this.registerProductUseCase({ name, price })
    // return ProductPresenter.present(registeredProduct)
    return name + price;
  }
}
