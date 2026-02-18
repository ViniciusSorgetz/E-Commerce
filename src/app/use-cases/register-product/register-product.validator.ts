import { Injectable } from '@nestjs/common';
import { MerchantRepository } from '@src/app/repositories/merchant.repository';
import { ProductRepository } from '@src/app/repositories/product.repository';
import { ValidationError } from '@src/shared/errors/validation.error';
import { productSpecificationsInput } from '@src/shared/types/product-inputs.type';

@Injectable()
export class RegisterProductValidator {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly merchantRepository: MerchantRepository,
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

  public async checkMerchant(merchantId: string) {
    const foundMerchant = await this.merchantRepository.findOneById(merchantId);

    if (!foundMerchant) {
      throw new ValidationError("Product merchant doesn't exist.");
    }
  }
}
