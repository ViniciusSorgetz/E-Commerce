import { Module } from '@nestjs/common';
import { RegisterProductController } from './controlers/products/register-product/register-product.controller';
import { DrizzleModule } from '../database/drizzle/drizzle.module';
import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';
import { RegisterMerchantController } from './controlers/merchants/register-merchant/register-merchant.controller';
import { RegisterMerchantUseCase } from '@src/app/use-cases/register-merchant/register-merchant.usecase';
import { RegisterProductCategoryController } from './controlers/product-categories/register-product-category/register-product-category.controller';
import { RegisterProductCategoryUseCase } from '@src/app/use-cases/register-product-category/register-product-category.usecase';

@Module({
  imports: [DrizzleModule.config()],
  controllers: [
    RegisterProductController,
    RegisterMerchantController,
    RegisterProductCategoryController,
  ],
  providers: [
    RegisterProductUseCase,
    RegisterMerchantUseCase,
    RegisterProductCategoryUseCase,
  ],
})
export class HttpModule {}
