import { Injectable } from '@nestjs/common';
import {
  CheckForEqualProps,
  ProductRepository,
} from 'src/app/repositories/product-repository';
import { db } from '../db';
import { productsTable } from '../schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductDrizzleRepository implements ProductRepository {
  async checkForEqual({
    name,
    description,
    specifications,
  }: CheckForEqualProps) {
    const foundProduct = await db
      .select()
      .from(productsTable)
      .where(
        eq({
          name: props.name,
        }),
      );
  }
}
