import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductCategoryCategory } from './product-category-category';

interface ProductCategoryProps {
  id: NumericId;
  category: ProductCategoryCategory;
  createdAt: DateProp;
  updatedAt: DateProp;
}

export class ProductCategory {
  private props: ProductCategoryProps;

  private constructor(props: ProductCategoryProps) {
    this.props = props;
  }

  public static create(
    props: Replace<
      ProductCategoryProps,
      { createdAt?: undefined; updatedAt?: undefined }
    >,
  ) {
    return new ProductCategory({
      ...props,
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public static with(props: ProductCategoryProps) {
    return new ProductCategory(props);
  }

  public get id(): number {
    return this.props.id.value;
  }

  public get category(): string {
    return this.props.category.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt.value;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt.value;
  }
}
