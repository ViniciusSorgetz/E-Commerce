import { productSpecificationsInput } from '@src/shared/types/product-specifications-input';
import { Product } from '../entities/product/product';

export interface CheckForEqualProps {
  name: string;
  description: string;
  specifications: productSpecificationsInput;
}

export interface ProductRepository {
  checkForEqual: (props: CheckForEqualProps) => Promise<boolean>;
  findOneById: (id: number) => Promise<Product>;
  saveOne: (product: Product) => Promise<{ id: number }>;
}
