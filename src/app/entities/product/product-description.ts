import { ValidationError } from 'src/shared/errors/validation.error';

export class ProductDescription {
  constructor(private description: string) {
    this.validate(description);
    this.description = description;
  }

  private validate(description: string) {
    if (description.length < 20) {
      throw new ValidationError(
        'Product description length must be at least 20 characters.',
      );
    }
  }

  public get value() {
    return this.description;
  }
}
