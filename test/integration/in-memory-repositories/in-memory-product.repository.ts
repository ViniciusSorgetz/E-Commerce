import { NumericId, Product } from '@src/app/entities';
import {
  CheckForEqualProps,
  ProductRepository,
} from '@src/app/repositories/product.repository';
import { NotFoundError } from '@src/shared';

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[];
  private productsId: 0;
  private specificationsId: 0;

  async checkForEqual({
    name,
    description,
    specifications,
  }: CheckForEqualProps) {
    const foundProduct = this.products.find(
      (product) => product.name == name && product.description == description,
    );
    if (!foundProduct) {
      return false;
    }
    return foundProduct;
  }

  async saveOne(product: Product) {
    product.id = new NumericId(this.productsId++);
    product.specifications.forEach((specification) => {
      specification.id = new NumericId(this.specificationsId++);
    });
    this.products.push(product);
    return product;
  }

  async findOneById(id: number) {
    const foundProduct = this.products.find((product) => product.id == id);
    if (!foundProduct) {
      throw new NotFoundError("Couldn't find product by the given id.");
    }
    return foundProduct;
  }
}
