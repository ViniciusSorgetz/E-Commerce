import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { ValidationError } from '@src/shared';

export class RegisterProductCategoryValidator {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  public async validate(category: string) {
    const foundCategory =
      await this.productCategoryRepository.findOneByCategory(category);

    if (foundCategory) {
      throw new ValidationError('The given category already exists.');
    }
  }
}
