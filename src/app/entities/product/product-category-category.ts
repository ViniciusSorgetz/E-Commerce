import { ValidationError } from 'src/shared/errors/validation.error';

export class ProductCategoryCategory {
  constructor(private category: string) {
    this.validate(category);
    this.category = category;
  }

  private validate(category: string) {
    if (category.length < 3) {
      throw new ValidationError(
        'Product category must be at least 5 characters long.',
      );
    }
  }

  public get value(): string {
    return this.category;
  }
}
