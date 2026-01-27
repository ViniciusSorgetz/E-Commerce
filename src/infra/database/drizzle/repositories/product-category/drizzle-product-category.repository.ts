import { Inject, Injectable } from '@nestjs/common';
import { ProductCategory } from '@src/app/entities';
import { ProductCategoryRepository } from '@src/app/repositories/product-category.repository';
import { productCategoriesInput } from '@src/shared/types/product-inputs.type';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { productCategoriesTable } from '../../schemas';
import { inArray } from 'drizzle-orm';
import { DrizzleProductCategoryMapper } from './drizzle-product-category.mapper';
import { ProvidersToken } from '@src/infra/http/providers/providers-token.enum';
import { DatabaseError, ValidationError } from '@src/shared';

@Injectable()
export class DrizzleProductCategoryRepository implements ProductCategoryRepository {
  constructor(
    @Inject(ProvidersToken.DrizzleDb) private drizzle: NodePgDatabase,
  ) {}

  public async findAllById(
    ids: productCategoriesInput,
  ): Promise<ProductCategory[]> {
    const foundCategories = await this.getCategoriesByIds(ids);

    if (foundCategories.length != ids.length) {
      throw new ValidationError(
        "Couldn't find all the given product gategory ids on the database.",
      );
    }

    return foundCategories.map(DrizzleProductCategoryMapper.toEntity);
  }

  public async saveOne(category: ProductCategory) {
    const savedCategory = await this.saveCategory(category);
    return { id: savedCategory.id };
  }

  private async getCategoriesByIds(ids: productCategoriesInput) {
    return await this.drizzle
      .select()
      .from(productCategoriesTable)
      .where(inArray(productCategoriesTable.id, ids));
  }

  private async saveCategory(category: ProductCategory) {
    const result = await this.drizzle
      .insert(productCategoriesTable)
      .values(DrizzleProductCategoryMapper.toDrizzle(category))
      .returning();

    if (result.length == 0) {
      throw new DatabaseError({
        message: 'Error while saving product category.',
      });
    }

    return result[0];
  }
}
