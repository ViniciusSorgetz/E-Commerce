import { Inject, Injectable } from '@nestjs/common';
import {
  CheckForEqualProps,
  ProductRepository,
} from '@src/app/repositories/product.repository';
import { productsTable } from '../../schemas/products.table';
import { and, eq } from 'drizzle-orm';
import { productSpecificatonsTable } from '../../schemas/product-specifications.table';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(@Inject('DRIZZLE_DB') private drizzle: NodePgDatabase) {}

  public async checkForEqual({
    name,
    description,
    specifications,
  }: CheckForEqualProps) {
    const results = await this.drizzle
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
      return false;
    }

    const foundProduct = results[0];

    const foundSpecifications = await Promise.all(
      specifications.map(async (specification) => {
        const foundSpecification = await this.drizzle
          .select()
          .from(productSpecificatonsTable)
          .where(
            and(
              eq(productSpecificatonsTable.product_id, foundProduct.id),
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

    if (foundSpecifications.includes(undefined)) {
      return false;
    }

    return true;
  }
}
