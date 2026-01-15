import { DateProp } from '../shared/date-prop';
import { Uuid } from '../shared/uuid';
import { ProductReviewRate } from './product-review-rate';

interface ProductReviewProps {
  rate: ProductReviewRate;
  description: string;
  user_id: Uuid;
  product_id: number;
  created_at: DateProp;
  updated_at: DateProp;
}

export class ProductReview {
  private props: ProductReviewProps;

  constructor(props: ProductReviewProps) {
    this.props = props;
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
