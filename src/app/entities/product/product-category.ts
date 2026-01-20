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

  public get value(): ProductCategoryProps {
    return this.props;
  }
}
