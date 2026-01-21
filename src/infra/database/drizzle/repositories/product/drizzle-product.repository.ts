import { Inject, Injectable } from '@nestjs/common';
import {
  CheckForEqualProps,
  ProductRepository,
} from '@src/app/repositories/product.repository';
import { productsTable } from '../../schemas/products.table';
import { and, eq } from 'drizzle-orm';
import { productSpecificatonsTable } from '../../schemas/product-specifications.table';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { productSpecificationsInput } from '@src/shared/types/product-specifications-input';
@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(@Inject('DRIZZLE_DB') private drizzle: NodePgDatabase) {}

  public async checkForEqual({
    name,
    description,
    specifications,
  }: CheckForEqualProps) {
    const foundProduct = await getProductByNameAndDescription(
      name,
      description,
      this.drizzle,
    );

    if (!foundProduct) {
      return false;
    }

    const foundSpecifications = await getProductSpecifications(
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
      const results = await drizzle
        .select()
        .from(productsTable)
        .where(
          and(
            eq(productsTable.name, name),
            eq(productsTable.description, description),
          ),
        )
        .limit(1);

      if (results.length == 0) {
        return null;
      }

      return results[0];
    }

    async function getProductSpecifications(
      specifications: productSpecificationsInput,
      product_id: number,
      drizzle: NodePgDatabase,
    ) {
      return await Promise.all(
        specifications.map(async (specification) => {
          const foundSpecification = await drizzle
            .select()
            .from(productSpecificatonsTable)
            .where(
              and(
                eq(productSpecificatonsTable.product_id, product_id),
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
}
