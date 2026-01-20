import { Product } from '../entities/product/product';

export interface CheckForEqualProps {
  name: string;
  description: string;
  specifications: { label: string; information: string }[];
}

export interface ProductRepository {
  checkForEqual: (props: CheckForEqualProps) => Promise<boolean>;
  findOneById: (id: number) => Promise<Product>;
  saveOne: (product: Product) => Promise<{ id: number }>;
}
