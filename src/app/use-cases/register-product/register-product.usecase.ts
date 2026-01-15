import { Injectable } from '@nestjs/common';
import { Product } from '@app/entities/product/product';
import { ProductRepository } from '@app/repositories/product-repository';
import { ProductPrice } from '@src/app/entities/product/product-price';
import { ProductImage } from '@src/app/entities/product/product-image';
import { ProductImageUrl } from '@src/app/entities/product/product-image-url';
import { ProductDescription } from '@src/app/entities/product/product-description';
import { ProductName } from '@src/app/entities/product/product-name';
import { DateProp } from '@src/app/entities/shared/date-prop';
import { NumericId } from '@src/app/entities/shared/numeric-id';
import { RegisterProductValidator } from './register-product.validator';
import { ProductSpecification } from '@src/app/entities/product/product-specification';

interface RegisterProductBody {
  name: string;
  price: number;
  description: string;
  specifications: ProductSpecification[];
  categories: { id: number }[];
  manufacturerId: number;
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
    const registeredProduct = new Product({
      name: new ProductName(name),
      description: new ProductDescription(description),
      categories: foundCategories,
      price: new ProductPrice(price),
      specifications: specifications,
      mainImage: new ProductImage({
        url: new ProductImageUrl('https://templateurl.com.br'),
        id: new NumericId(10),
        created_at: new DateProp(),
        updated_at: new DateProp(),
      }),
      manufacturerId: new NumericId(manufacturerId),
      images: [],
      reviews: [],
      created_at: new DateProp(),
      updated_at: new DateProp(),
    });

    const savedProduct =
      await this.productRepository.saveOne(registeredProduct);

    registeredProduct.id = new NumericId(savedProduct.id);

    return registeredProduct;
  }
}
