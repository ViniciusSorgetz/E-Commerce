import { Product } from '../entities/product/product';
import { ProductSpecification } from '../entities/product/product-specification';

export interface CheckForEqualProps {
  name: string;
  description: string;
  specifications: ProductSpecification[];
}

export interface ProductRepository {
  checkForEqual: (props: CheckForEqualProps) => Promise<Product | undefined>;
  findOneById: (id: number) => Promise<Product>;
  saveOne: (product: Product) => Promise<{ id: number }>;
}
