import { ProductCategory } from '../entities/product/product-category';

export interface ProductCategoryRepository {
  findAllById(ids: { id: number }[]): Promise<(ProductCategory | null)[]>;
}
