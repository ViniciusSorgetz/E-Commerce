import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { Uuid } from '../shared/uuid';
import { ProductReviewRate } from './product-review-rate';
import { NumericId } from '../shared/numeric-id';

interface ProductReviewProps {
  id?: NumericId;
  rate: ProductReviewRate;
  description: string;
  userId: Uuid;
  productId: NumericId;
  createdAt: DateProp;
  updatedAt: DateProp;
}

export class ProductReview {
  private props: ProductReviewProps;

  private constructor(props: ProductReviewProps) {
    this.props = props;
  }

  public static create(
    props: Replace<
      ProductReviewProps,
      { createdAt?: undefined; updatedAt?: undefined }
    >,
  ) {
    return new ProductReview({
      ...props,
      createdAt: new DateProp(),
      updatedAt: new DateProp(),
    });
  }

  public static with(props: ProductReviewProps) {
    return new ProductReview(props);
  }

  public get id(): number | undefined {
    return this.props.id?.value;
  }

  public get rate(): number {
    return this.props.rate.value;
  }

  public get description(): string {
    return this.props.description;
  }

  public get user_id(): string {
    return this.props.userId.value;
  }

  public get product_id(): number {
    return this.props.productId.value;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt.value;
  }
}
