import { Module } from '@nestjs/common';
import { RegisterProductController } from './controlers/products/register-product/register-product.controller';
import { DrizzleModule } from '../database/drizzle/drizzle.module';
import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';

@Module({
  imports: [DrizzleModule.config()],
  controllers: [RegisterProductController],
  providers: [RegisterProductUseCase],
})
export class HttpModule {}
