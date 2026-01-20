import { ValidationError } from 'src/shared/errors/validation.error';

export class ProductPrice {
  constructor(private price: number) {
    this.validate(price);
    this.price = price;
  }

  private validate(price: number) {
    if (price <= 0) {
      throw new ValidationError('Product prices cannot be negative.');
    }
  }

  public get value(): number {
    return this.price;
  }
}
