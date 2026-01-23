import { productCategoriesInput } from '@src/shared/types/product-inputs.type';
import { ProductCategory } from '../entities/product/product-category';

export abstract class ProductCategoryRepository {
  findAllById: (ids: productCategoriesInput) => Promise<ProductCategory[]>;
}
