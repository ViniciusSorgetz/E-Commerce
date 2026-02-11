import { Module } from '@nestjs/common';
import { RegisterProductController } from './controlers/products/register-product/register-product.controller';
import { DrizzleModule } from '../database/drizzle/drizzle.module';
import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';
import { RegisterManufacturerController } from './controlers/manufacturers/register-manufacturer/register-manufacturer.controller';
import { RegisterManufacturerUseCase } from '@src/app/use-cases/register-manufacturer/register-manufacturer.usecase';

@Module({
  imports: [DrizzleModule.config()],
  controllers: [RegisterProductController, RegisterManufacturerController],
  providers: [RegisterProductUseCase, RegisterManufacturerUseCase],
})
export class HttpModule {}
