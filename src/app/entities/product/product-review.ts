import { Replace } from '@src/shared/utils/replace';
import { DateProp } from '../shared/date-prop';
import { Uuid } from '../shared/uuid';
import { ProductReviewRate } from './product-review-rate';

interface ProductReviewProps {
  rate: ProductReviewRate;
  description: string;
  userId: Uuid;
  productId: number;
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

  public get rate(): ProductReviewRate {
    return this.props.rate;
  }

  public get description(): string {
    return this.description;
  }

  public get user_id(): string {
    return this.user_id;
  }

  public get product_id(): string {
    return this.product_id;
  }
}
