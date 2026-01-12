import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product-repository';
import {
  Product,
  ProductCategory,
  ProductSpecification,
} from '../entities/product/product';
import { ValidationError } from 'src/shared/errors/validation-error';

interface RegisterProductBody {
  name: string;
  price: number;
  description: string;
  mainImageId: string;
  specifications: ProductSpecification[];
  categories: ProductCategory[];
}

type RegisterProductResponse = Promise<Product>;

@Injectable()
export class RegisterProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async register(body: RegisterProductBody): RegisterProductResponse {
    // checks for duplicated product
    const checkProduct = await this.productRepository.checkForEqual({
      name: body.name,
      description: body.description,
      specifications: body.specifications,
    });

    if (checkProduct) {
      throw new ValidationError('This product is already registered.');
    }

    // checks if all the categories exist

    // { ... }

    const registeredProduct = new Product({
      name: body.name,
      description: body.description,
      categories: body.categories,
      price: body.price,
      specifications: body.specifications,
      mainImageId: body.mainImageId,
      images: [],
      reviews: [],
    });

    const savedProduct =
      await this.productRepository.saveOne(registeredProduct);

    registeredProduct.id = savedProduct.id;

    return registeredProduct;
  }
}
