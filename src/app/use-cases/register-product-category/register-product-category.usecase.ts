import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { RegisterProductCategoryValidator } from './register-product-category.validator';
import { ProductCategory, ProductCategoryCategory } from '@src/app/entities';
import { Injectable } from '@nestjs/common';

interface RegisterProductCategoryBody {
  category: string;
}

type RegisterProductCategoryResponse = Promise<ProductCategory>;

@Injectable()
export class RegisterProductCategoryUseCase {
  private registerProductCategoryValidator: RegisterProductCategoryValidator;

  constructor(
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {
    this.registerProductCategoryValidator =
      new RegisterProductCategoryValidator(this.productCategoryRepository);
  }

  public async execute(
    body: RegisterProductCategoryBody,
  ): RegisterProductCategoryResponse {
    const { category } = body;

    await this.registerProductCategoryValidator.validate(category);

    const registeredCategory = ProductCategory.create({
      category: new ProductCategoryCategory(category),
    });

    await this.productCategoryRepository.saveOne(registeredCategory);

    return registeredCategory;
  }
}
