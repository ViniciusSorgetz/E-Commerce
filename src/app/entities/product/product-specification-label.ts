import { ValidationError } from 'src/shared/errors/validation-error';

export class ProductSpecificationLabel {
  constructor(private label: string) {
    this.validate(label);
    this.label = label;
  }

  private validate(label: string) {
    if (label.length < 3) {
      throw new ValidationError(
        'Produt specification label must be at least 3 characters long.',
      );
    }
  }

  public get value(): string {
    return this.label;
  }
}
