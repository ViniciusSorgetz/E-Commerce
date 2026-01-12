import { Product, ProductSpecification } from '../entities/product/product';

export interface ProductRepository {
  checkForEqual: (props: {
    name: string;
    description: string;
    specifications: ProductSpecification[];
  }) => Promise<Product | undefined>;
  findOneById: (productId: string) => Promise<Product>;
  saveOne: (product: Product) => Promise<{ id: number }>;
}
