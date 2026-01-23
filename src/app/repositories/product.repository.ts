import { productSpecificationsInput } from '@src/shared';
import { Product } from '../entities/product/product';

export interface CheckForEqualProps {
  name: string;
  description: string;
  specifications: productSpecificationsInput;
}

export abstract class ProductRepository {
  checkForEqual: (props: CheckForEqualProps) => Promise<boolean>;
  findOneById: (id: number) => Promise<Product>;
  saveOne: (product: Product) => Promise<Product>;
}
