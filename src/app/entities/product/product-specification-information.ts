import { ValidationError } from 'src/shared/errors/validation.error';

export class ProductSpecificationInformation {
  constructor(private information: string) {
    this.validate(information);
    this.information = information;
  }

  private validate(information: string) {
    if (information.length < 3) {
      throw new ValidationError(
        'Produt specification information must be at least 3 characters long.',
      );
    }
  }

  public get value(): string {
    return this.information;
  }
}
