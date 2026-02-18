import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@app/repositories/product.repository';
import { RegisterProductValidator } from './register-product.validator';
import {
  Product,
  ProductDescription,
  ProductName,
  ProductPrice,
  ProductSpecification,
  ProductSpecificationInformation,
  ProductSpecificationLabel,
  Uuid,
} from '@src/app/entities';
import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { MerchantRepository } from '@src/app/repositories/merchant.repository';
import {
  productCategoriesInput,
  productSpecificationsInput,
} from '@src/shared/types/product-inputs.type';

interface RegisterProductBody {
  name: string;
  price: number;
  description: string;
  specifications: productSpecificationsInput;
  categories: productCategoriesInput;
  merchantId: string;
}

type RegisterProductResponse = Promise<Product>;

@Injectable()
export class RegisterProductUseCase {
  private registerProductValidator: RegisterProductValidator;

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryRepository: ProductCategoryRepository,
    private readonly merchantRepository: MerchantRepository,
  ) {
    this.registerProductValidator = new RegisterProductValidator(
      this.productRepository,
      this.merchantRepository,
    );
  }

  public async execute(body: RegisterProductBody): RegisterProductResponse {
    const { name, description, price, categories, specifications, merchantId } =
      body;

    // validations
    await this.registerProductValidator.checkDuplicatedProduct({
      name,
      description,
      specifications,
    });
    await this.registerProductValidator.checkMerchant(merchantId);
    const foundCategories =
      await this.productCategoryRepository.findAllById(categories);

    // register product
    const registeredProduct = Product.create({
      name: new ProductName(name),
      description: new ProductDescription(description),
      categories: foundCategories,
      price: new ProductPrice(price),
      specifications: specifications.map((specification) => {
        return ProductSpecification.create({
          information: new ProductSpecificationInformation(
            specification.information,
          ),
          label: new ProductSpecificationLabel(specification.label),
        });
      }),
      merchantId: new Uuid(merchantId),
      images: [],
      reviews: [],
    });

    return await this.productRepository.saveOne(registeredProduct);
  }
}
