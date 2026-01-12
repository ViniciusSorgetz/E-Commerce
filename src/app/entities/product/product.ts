import { Replace } from 'src/shared/utils/replace';
import { ProductReview } from './product-review';

interface ProductProps {
  id?: number;
  name: string;
  price: number;
  description: string;
  mainImageId: string;
  specifications: ProductSpecification[];
  categories: ProductCategory[];
  reviews: ProductReview[];
  images: ProductImages[];
  created_at: Date;
  updated_at: Date;
}

export interface ProductSpecification {
  id?: number;
  label: string;
  information: string;
}

export interface ProductCategory {
  category_id: string;
}

interface ProductImages {
  url: string;
}

export class Product {
  private props: ProductProps;

  constructor(
    props: Replace<ProductProps, { created_at?: Date; updated_at?: Date }>,
  ) {
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.created_at ?? new Date(),
    };
  }

  public get id(): number | undefined {
    return this.props.id;
  }

  public set id(id: number) {
    this.id = id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get price(): number {
    return this.props.price;
  }

  public get description(): string {
    return this.props.description;
  }

  public get specifications(): ProductSpecification[] {
    return this.props.specifications;
  }

  public get categories(): ProductCategory[] {
    return this.props.categories;
  }
}
