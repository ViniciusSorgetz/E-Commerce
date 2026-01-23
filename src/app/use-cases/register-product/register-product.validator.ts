import { Injectable } from '@nestjs/common';
import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { ProductRepository } from '@src/app/repositories/product.repository';
import { ValidationError } from '@src/shared/errors/validation.error';
import { productSpecificationsInput } from '@src/shared/types/product-inputs.type';

@Injectable()
export class RegisterProductValidator {
  constructor(
    private readonly productRepository: ProductRepository,
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

  public async checkManufacturer(manufacturerId: string) {
    const foundManufacturer =
      await this.manufacturerRepository.findOneById(manufacturerId);

    if (!foundManufacturer) {
      throw new ValidationError("Product manufacturer doesn't exist.");
    }
  }
}
