import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductImageUrl } from './product-image-url';

interface ProductImageProps {
  url: ProductImageUrl;
  id: NumericId;
  created_at: DateProp;
  updated_at: DateProp;
}

export class ProductImage {
  private props: ProductImageProps;

  constructor(props: ProductImageProps) {
    this.props = props;
  }

  public get id(): number {
    return this.props.id.value;
  }
}
