import { ValidationError } from 'src/shared/errors/validation-error';

export class Phone {
  constructor(private phone: string) {
    this.validate(phone);
    this.phone = phone;
  }

  private validate(phone: string) {
    const re = new RegExp('^[0-9]{7,15}$');

    if (!phone.match(re)) {
      throw new ValidationError('Invalid phone format.');
    }
  }

  public get value(): string {
    return this.phone;
  }
}
