import { ValidationError } from 'src/shared/errors/validation-error';

export class ProductReviewRate {
  constructor(private rate: number) {
    this.validate(rate);
    this.rate = rate;
  }

  private validate(rate: number) {
    if (rate >= 1 && rate <= 5 && rate % 0.5 == 0) {
      throw new ValidationError('Invalid rate. Rate must be between 1/5.');
    }
  }

  public get value(): number {
    return this.rate;
  }
}
