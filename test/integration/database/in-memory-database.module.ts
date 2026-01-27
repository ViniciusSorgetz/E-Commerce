import { Module } from '@nestjs/common';
import { ProductRepository } from '@src/app/repositories/product.repository';
import { InMemoryProductRepository } from '../in-memory-repositories/in-memory-product.repository';
import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { InMemoryProductCategoryRepository } from '../in-memory-repositories/in-memory-product-category.repository';
import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { InMemoryManufacturerRepository } from '../in-memory-repositories/in-memory-manufacturer.repository';

@Module({
  providers: [
    {
      provide: ProductRepository,
      useClass: InMemoryProductRepository,
    },
    {
      provide: ProductCategoryRepository,
      useClass: InMemoryProductCategoryRepository,
    },
    {
      provide: ManufacturerRepository,
      useClass: InMemoryManufacturerRepository,
    },
  ],
  exports: [
    ProductRepository,
    ProductCategoryRepository,
    ManufacturerRepository,
  ],
})
export class InMemoryDatabaseModule {}
