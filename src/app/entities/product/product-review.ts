import { ValidationError } from 'src/shared/errors/validation-error';
import { reviewRate } from 'src/shared/types/review-rate';
import { validateUUID } from 'src/shared/utils/validate-uuid';

interface ProductReviewProps {
  rate: reviewRate;
  description: string;
  user_id: string;
  product_id: number;
}

export class ProductReview {
  private props: ProductReviewProps;

  constructor(props: ProductReviewProps) {
    if (props.rate >= 1 && props.rate <= 5 && props.rate % 0.5 == 0) {
      throw new ValidationError('Invalid rate. Rate must be between 1/5.');
    }

    validateUUID(props.user_id);

    this.props = props;
  }

  public get rate(): reviewRate {
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
