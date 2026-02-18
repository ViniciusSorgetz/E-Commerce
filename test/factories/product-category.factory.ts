import { ProductCategory, ProductCategoryCategory } from '@app/entities';
import { ProductCategoryRepository } from '@app/repositories/product-category.repository';
import { faker } from '@faker-js/faker';

export class ProductCategoryFactory {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  public async make(): Promise<ProductCategory> {
    const createdCategory = ProductCategory.create({
      category: new ProductCategoryCategory(faker.lorem.slug()),
    });

    await this.productCategoryRepository.saveOne(createdCategory);

    return createdCategory;
  }
}
