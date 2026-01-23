import {
  DateProp,
  NumericId,
  ProductCategory,
  ProductCategoryCategory,
} from '@src/app/entities';
import { productCategoriesTable } from '../../schemas';

export class DrizzleProductCategoryMapper {
  public static toEntity(
    category: typeof productCategoriesTable.$inferSelect,
  ): ProductCategory {
    return ProductCategory.with({
      id: new NumericId(category.id),
      category: new ProductCategoryCategory(category.category),
      updatedAt: new DateProp(category.updatedAt),
      createdAt: new DateProp(category.createdAt),
    });
  }
}
