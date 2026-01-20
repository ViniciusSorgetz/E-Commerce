import { ProductCategory } from '@src/app/entities/product/product-category';
import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { ProductRepository } from '@src/app/repositories/product.repository';
import { ValidationError } from '@src/shared/errors/validation.error';
import { productSpecificationsInput } from '@src/shared/types/product-specifications-input';

export class RegisterProductValidator {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryRepository: ProductCategoryRepository,
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}

  public async checkDuplicatedProduct({
    name,
    description,
    specifications,
  }: {
    name: string;
    description: string;
    specifications: productSpecificationsInput;
  }) {
    const foundProduct = await this.productRepository.checkForEqual({
      name: name,
      description: description,
      specifications: specifications,
    });

    if (foundProduct) {
      throw new ValidationError('This product is already registered.');
    }
  }

  public async getCheckedCategories(
    categories: { id: number }[],
  ): Promise<ProductCategory[]> {
    // checks if all the categories exist
    const foundCategories =
      await this.productCategoryRepository.findAllById(categories);

    if (foundCategories.includes(null)) {
      throw new ValidationError("Some product categories doesn't exist.");
    }

    return foundCategories as ProductCategory[];
  }

  public async checkManufacturer(manufacturerId: string) {
    const foundManufacturer =
      await this.manufacturerRepository.findOneById(manufacturerId);

    if (!foundManufacturer) {
      throw new ValidationError("Product manufacturer doesn't exist.");
    }
  }
}
