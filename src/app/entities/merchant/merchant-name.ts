import { ValidationError } from '@shared/.';

export class MerchantName {
  constructor(private name: string) {
    this.validate(name);
    this.name = name;
  }

  private validate(name: string) {
    if (name.length < 3) {
      throw new ValidationError(
        'MerchantName must be at least 3 characters long.',
      );
    }
  }

  public get value(): string {
    return this.name;
  }
}
