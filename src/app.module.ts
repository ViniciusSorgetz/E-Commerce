import { Module } from '@nestjs/common';
import { ProductsController } from './infra/http/controlers/products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
})
export class AppModule {}
