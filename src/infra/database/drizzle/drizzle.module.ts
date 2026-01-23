import { DynamicModule, Module } from '@nestjs/common';
import { ProductRepository } from '@app/repositories/product.repository';
import { DrizzleProductRepository } from './repositories/product/drizzle-product.repository';
import { DrizzleConnection } from './drizzle.connection';
import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { DrizzleProductCategoryRepository } from './repositories/product-category/drizzle-product-category.repository';
import { DrizzleManufacturerRepository } from './repositories/manufacturer/drizzle-manufacturer.repository';
import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { ProvidersToken } from '@src/infra/http/providers/providers-token.enum';

@Module({})
export class DrizzleModule {
  static config(): DynamicModule {
    const db = DrizzleConnection.getConnection();

    return {
      module: DrizzleModule,
      providers: [
        {
          provide: ProvidersToken.DrizzleDb,
          useValue: db,
        },
        {
          provide: ProductRepository,
          useClass: DrizzleProductRepository,
        },
        {
          provide: ProductCategoryRepository,
          useClass: DrizzleProductCategoryRepository,
        },
        {
          provide: ManufacturerRepository,
          useClass: DrizzleManufacturerRepository,
        },
      ],
      exports: [
        ProductRepository,
        ProductCategoryRepository,
        ManufacturerRepository,
      ],
    };
  }
}
