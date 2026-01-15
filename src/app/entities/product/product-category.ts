import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductCategoryCategory } from './product-category-category';

interface ProductCategoryProps {
  id: NumericId;
  category: ProductCategoryCategory;
  created_at: DateProp;
  updated_at: DateProp;
}

export class ProductCategory {
  private props: ProductCategoryProps;

  constructor(props: ProductCategoryProps) {
    this.props = props;
  }

  public get value(): ProductCategoryProps {
    return this.props;
  }
}
