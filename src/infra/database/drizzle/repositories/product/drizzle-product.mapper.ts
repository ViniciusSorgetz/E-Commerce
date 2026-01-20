import { Product } from '@src/app/entities/product/product';
import { productsTable } from '../../schemas/products.table';
import { ProductDescription } from '@src/app/entities/product/product-description';
import { ProductName } from '@src/app/entities/product/product-name';
import { NumericId } from '@src/app/entities/shared/numeric-id';
import { Uuid } from '@src/app/entities/shared/uuid';
import { ProductPrice } from '@src/app/entities/product/product-price';
import { DateProp } from '@src/app/entities/shared/date-prop';

export class DrizzleProductMapper {
  public static toEntity({
    id,
    name,
    description,
    price,
    updatedAt,
    createdAt,
    mainImageId,
    manufacturerId,
  }: typeof productsTable.$inferSelect): Product {
    return new Product({
      id: new NumericId(id),
      name: new ProductName(name),
      description: new ProductDescription(description),
      manufacturerId: new Uuid(manufacturerId),
      price: new ProductPrice(price),
      createdAt: new DateProp(createdAt),
      updatedAt: new DateProp(updatedAt),
      mainImage: {},
    });
  }
}
