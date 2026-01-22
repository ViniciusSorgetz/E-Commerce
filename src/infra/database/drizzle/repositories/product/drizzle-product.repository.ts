import { Inject, Injectable } from '@nestjs/common';
import {
  CheckForEqualProps,
  ProductRepository,
} from '@src/app/repositories/product.repository';
import {
  productsTable,
  productSpecificatonsTable,
  productTagsTable,
  productCategoriesTable,
  productReviewsTable,
  productImagesTable,
} from '@infra/database/drizzle/schemas';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
  productSpecificationsInput,
  NotFoundError,
  DatabaseError,
  compareLength,
} from '@src/shared';
import { DrizzleProductMapper } from './drizzle-product.mapper';
import { Product } from '@src/app/entities';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(@Inject('DRIZZLE_DB') private drizzle: NodePgDatabase) {}

  public async checkForEqual({
    name,
    description,
    specifications,
  }: CheckForEqualProps): Promise<boolean> {
    const foundProduct = await this.getProductByNameAndDescription(
      name,
      description,
    );

    if (!foundProduct) {
      return false;
    }

    const foundSpecifications = await this.getSpecificationsByInputAndProductId(
      specifications,
      foundProduct.id,
    );

    if (foundSpecifications.includes(undefined)) {
      return false;
    }

    return true;
  }

  public async findOneById(id: number): Promise<Product> {
    const foundProduct = await this.getProductById(id);

    if (!foundProduct) {
      throw new NotFoundError("Couldn't find product by the given id.");
    }

    const foundCategories = await this.getCategoriesByProductId(id);

    assertFoundCategories(foundCategories);

    const foundSpecifications = await this.getSpecificationsByProductId(id);
    const foundReviews = await this.getReviewsByProductId(id);
    const foundImages = await this.getImagesByProductId(id);
    const foundMainImage = await this.getMainImageById(
      foundProduct.mainImageId,
    );

    if (!foundMainImage) {
      throw new NotFoundError("Couldn't find product main image.");
    }

    return DrizzleProductMapper.toEntity({
      product: foundProduct,
      categories: foundCategories,
      images: foundImages,
      mainImage: foundMainImage,
      reviews: foundReviews,
      specifications: foundSpecifications,
    });

    function assertFoundCategories(
      foundCategories: (typeof productCategoriesTable.$inferSelect | null)[],
    ): asserts foundCategories is (typeof productCategoriesTable.$inferSelect)[] {
      if (foundCategories.includes(null)) {
        throw new NotFoundError("Couldn't find all of the product categories.");
      }
    }
  }

  public async saveOne(product: Product): Promise<{ id: number }> {
    const {
      product: drizzleProduct,
      categories,
      images,
      mainImage,
      specifications,
    } = DrizzleProductMapper.toDrizzle(product);

    const savedProduct = await this.saveProduct(drizzleProduct);
    await this.saveCategories(categories);
    await this.saveSpecifications(specifications);
    await this.saveImages(images);
    await this.saveMainImage(mainImage);

    return { id: savedProduct.id };
  }

  private async getProductByNameAndDescription(
    name: string,
    description: string,
  ) {
    const result = await this.drizzle
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.name, name),
          eq(productsTable.description, description),
        ),
      )
      .limit(1);

    return result[0] ?? null;
  }

  private async getSpecificationsByInputAndProductId(
    specifications: productSpecificationsInput,
    productId: number,
  ) {
    return await Promise.all(
      specifications.map(async (specification) => {
        const foundSpecification = await this.drizzle
          .select()
          .from(productSpecificatonsTable)
          .where(
            and(
              eq(productSpecificatonsTable.productId, productId),
              eq(productSpecificatonsTable.label, specification.label),
              eq(
                productSpecificatonsTable.information,
                specification.information,
              ),
            ),
          )
          .limit(1);

        return foundSpecification.length == 0
          ? undefined
          : foundSpecification[0];
      }),
    );
  }

  private async getProductById(productId: number) {
    const result = await this.drizzle
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))
      .limit(1);

    return result[0] ?? null;
  }

  private async getCategoriesByProductId(produtId: number) {
    const result = await this.drizzle
      .select()
      .from(productTagsTable)
      .where(eq(productTagsTable.productId, produtId))
      .leftJoin(
        productCategoriesTable,
        eq(productTagsTable.productCategoryId, productCategoriesTable.id),
      );

    return result.map((result) => {
      return result.product_categories;
    });
  }

  private async getSpecificationsByProductId(productId: number) {
    return await this.drizzle
      .select()
      .from(productSpecificatonsTable)
      .where(eq(productSpecificatonsTable.productId, productId));
  }

  private async getReviewsByProductId(productId: number) {
    return await this.drizzle
      .select()
      .from(productReviewsTable)
      .where(eq(productReviewsTable.productId, productId));
  }

  private async getImagesByProductId(productId: number) {
    return await this.drizzle
      .select()
      .from(productImagesTable)
      .where(eq(productImagesTable.productId, productId));
  }

  private async getMainImageById(mainImageId: number) {
    const result = await this.drizzle
      .select()
      .from(productImagesTable)
      .where(eq(productCategoriesTable.id, mainImageId))
      .limit(1);

    return result[0] ?? null;
  }

  private async saveProduct(product: typeof productsTable.$inferInsert) {
    const result = await this.drizzle
      .insert(productsTable)
      .values(product)
      .returning();

    if (!result[0]) {
      throw new DatabaseError({
        message: 'Could insert a product in the database.',
      });
    }

    return result[0];
  }

  private async saveCategories(
    categories: (typeof productCategoriesTable.$inferInsert)[],
  ) {
    const result = await this.drizzle
      .insert(productCategoriesTable)
      .values(categories)
      .returning();

    compareLength(result.length, categories.length, 'product categories');

    return result;
  }

  private async saveSpecifications(
    specifications: (typeof productSpecificatonsTable.$inferInsert)[],
  ) {
    const result = await this.drizzle
      .insert(productSpecificatonsTable)
      .values(specifications)
      .returning();

    compareLength(
      result.length,
      specifications.length,
      'product specifications',
    );

    return result;
  }

  private async saveImages(images: (typeof productImagesTable.$inferInsert)[]) {
    const result = await this.drizzle
      .insert(productImagesTable)
      .values(images)
      .returning();

    compareLength(result.length, images.length, 'product images');

    return result;
  }

  private async saveMainImage(
    mainImage: typeof productImagesTable.$inferInsert,
  ) {
    const result = await this.drizzle
      .insert(productImagesTable)
      .values(mainImage)
      .returning();

    if (!result[0]) {
      throw new DatabaseError({
        message: "Couldn't save product main image into the database.",
      });
    }

    return result[0];
  }
}
