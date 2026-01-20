import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductImageUrl } from './product-image-url';

interface ProductImageProps {
  url: ProductImageUrl;
  id: NumericId;
  createdAt: DateProp;
  updatedAt: DateProp;
}

export class ProductImage {
  private props: ProductImageProps;

  private constructor(props: ProductImageProps) {
    this.props = props;
  }

  public static create(
    props: Replace<
      ProductImageProps,
      { createdAt?: undefined; updatedAt?: undefined }
    >,
  ) {
    return new ProductImage({
      ...props,
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public get id(): number {
    return this.props.id.value;
  }
}
