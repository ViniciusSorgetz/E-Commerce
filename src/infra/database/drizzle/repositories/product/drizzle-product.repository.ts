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
} from '@src/shared';
import { DrizzleProductMapper } from './drizzle-product.mapper';
import { Product } from '@src/app/entities';
import { compareLength } from '../shared/repository.utils';

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(@Inject('DRIZZLE_DB') private drizzle: NodePgDatabase) {}

  public async checkForEqual({
    name,
    description,
    specifications,
  }: CheckForEqualProps): Promise<boolean> {
    const foundProduct = await getProductByNameAndDescription(
      name,
      description,
      this.drizzle,
    );

    if (!foundProduct) {
      return false;
    }

    const foundSpecifications = await getSpecifications(
      specifications,
      foundProduct.id,
      this.drizzle,
    );

    if (foundSpecifications.includes(undefined)) {
      return false;
    }

    return true;

    async function getProductByNameAndDescription(
      name: string,
      description: string,
      drizzle: NodePgDatabase,
    ) {
      const result = await drizzle
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

    async function getSpecifications(
      specifications: productSpecificationsInput,
      productId: number,
      drizzle: NodePgDatabase,
    ) {
      return await Promise.all(
        specifications.map(async (specification) => {
          const foundSpecification = await drizzle
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
  }

  public async findOneById(id: number): Promise<Product> {
    const foundProduct = await getProductById(id, this.drizzle);

    if (!foundProduct) {
      throw new NotFoundError("Couldn't find product by the given id.");
    }

    const foundCategories = await getCategories(id, this.drizzle);

    assertFoundCategories(foundCategories);

    const foundSpecifications = await this.drizzle
      .select()
      .from(productSpecificatonsTable)
      .where(eq(productSpecificatonsTable.productId, id));

    const foundReviews = await this.drizzle
      .select()
      .from(productReviewsTable)
      .where(eq(productReviewsTable.productId, id));

    const foundImages = await this.drizzle
      .select()
      .from(productImagesTable)
      .where(eq(productImagesTable.productId, id));

    const foundMainImage = await getMainImageById(
      foundProduct.mainImageId,
      this.drizzle,
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

    async function getProductById(id: number, drizzle: NodePgDatabase) {
      const result = await drizzle
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, id))
        .limit(1);

      return result[0] ?? null;
    }

    async function getCategories(produtId: number, drizzle: NodePgDatabase) {
      const result = await drizzle
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

    function assertFoundCategories(
      foundCategories: (typeof productCategoriesTable.$inferSelect | null)[],
    ): asserts foundCategories is (typeof productCategoriesTable.$inferSelect)[] {
      if (foundCategories.includes(null)) {
        throw new NotFoundError("Couldn't find all of the product categories.");
      }
    }

    async function getMainImageById(
      mainImageId: number,
      drizzle: NodePgDatabase,
    ) {
      const result = await drizzle
        .select()
        .from(productImagesTable)
        .where(eq(productCategoriesTable.id, mainImageId))
        .limit(1);

      return result[0] ?? null;
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
    const savedProduct = (
      await this.drizzle
        .insert(productsTable)
        .values(drizzleProduct)
        .returning()
    )[0];

    if (!savedProduct) {
      throw new DatabaseError({
        message: 'Could insert a product in the database.',
      });
    }

    const savedCategories = await this.drizzle
      .insert(productCategoriesTable)
      .values(categories)
      .returning();

    compareLength(
      product.categories.length,
      savedCategories.length,
      'product categories',
    );

    const savedSpecifications = await this.drizzle
      .insert(productSpecificatonsTable)
      .values(specifications)
      .returning();

    compareLength(
      product.specifications.length,
      savedSpecifications.length,
      'product specifications',
    );

    const savedImages = await this.drizzle
      .insert(productImagesTable)
      .values(images)
      .returning();

    compareLength(product.images.length, savedImages.length, 'product images');

    const savedMainImage = (
      await this.drizzle
        .insert(productImagesTable)
        .values(mainImage)
        .returning()
    )[0];

    if (!savedMainImage) {
      throw new DatabaseError({
        message: "Couldn't save product main image into the database.",
      });
    }

    return { id: savedProduct.id };
  }
}
