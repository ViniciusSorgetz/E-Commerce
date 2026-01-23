import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { NumericId } from '../shared/numeric-id';
import { ProductImageUrl } from './product-image-url';

interface ProductImageProps {
  id?: NumericId;
  url: ProductImageUrl;
  position: NumericId;
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

  public static with(props: ProductImageProps) {
    return new ProductImage(props);
  }

  public get id(): number | undefined {
    return this.props.id?.value;
  }

  public get position(): number {
    return this.props.position.value;
  }

  public get url(): string {
    return this.props.url.value;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt.value;
  }
}
