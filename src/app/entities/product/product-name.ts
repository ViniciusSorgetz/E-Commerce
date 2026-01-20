import { ValidationError } from 'src/shared/errors/validation.error';

export class ProductName {
  constructor(private name: string) {
    this.validate(name);
    this.name = name;
  }

  private validate(name: string) {
    if (name.length < 3) {
      throw new ValidationError(
        'Product name must be at least 3 characters long.',
      );
    }
  }

  public get value(): string {
    return this.name;
  }
}
