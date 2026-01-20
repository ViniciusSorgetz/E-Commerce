import { Injectable } from '@nestjs/common';
import { Product } from '@app/entities/product/product';
import { ProductRepository } from '@app/repositories/product.repository';
import { ProductPrice } from '@src/app/entities/product/product-price';
import { ProductImage } from '@src/app/entities/product/product-image';
import { ProductImageUrl } from '@src/app/entities/product/product-image-url';
import { ProductDescription } from '@src/app/entities/product/product-description';
import { ProductName } from '@src/app/entities/product/product-name';
import { NumericId } from '@src/app/entities/shared/numeric-id';
import { RegisterProductValidator } from './register-product.validator';
import { Uuid } from '@src/app/entities/shared/uuid';
import { ProductSpecification } from '@src/app/entities/product/product-specification';
import { ProductSpecificationInformation } from '@src/app/entities/product/product-specification-information';
import { ProductSpecificationLabel } from '@src/app/entities/product/product-specification-label';
import { productSpecificationsInput } from '@src/shared/types/product-specifications-input';

interface RegisterProductBody {
  name: string;
  price: number;
  description: string;
  specifications: productSpecificationsInput;
  categories: { id: number }[];
  manufacturerId: string;
}

type RegisterProductResponse = Promise<Product>;

@Injectable()
export class RegisterProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly registerProductValidator: RegisterProductValidator,
  ) {}

  public async execute(body: RegisterProductBody): RegisterProductResponse {
    const {
      name,
      description,
      price,
      categories,
      specifications,
      manufacturerId,
    } = body;

    // validations
    await this.registerProductValidator.checkDuplicatedProduct({
      name,
      description,
      specifications,
    });
    await this.registerProductValidator.checkManufacturer(manufacturerId);
    const foundCategories =
      await this.registerProductValidator.getCheckedCategories(categories);

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
      mainImage: ProductImage.create({
        url: new ProductImageUrl('https://templateurl.com.br'),
        id: new NumericId(10),
      }),
      manufacturerId: new Uuid(manufacturerId),
      images: [],
      reviews: [],
    });

    const savedProduct =
      await this.productRepository.saveOne(registeredProduct);

    registeredProduct.id = new NumericId(savedProduct.id);

    return registeredProduct;
  }
}
