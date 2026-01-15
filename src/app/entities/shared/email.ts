import { ValidationError } from 'src/shared/errors/validation-error';

export class Email {
  constructor(private email: string) {
    this.validate(email);
    this.email = email;
  }

  private validate(email: string) {
    const re = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

    if (!email.match(re)) {
      throw new ValidationError('Invalid e-mail format.');
    }
  }

  public get value(): string {
    return this.email;
  }
}
