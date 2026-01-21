import { ValidationError } from 'src/shared/errors/validation.error';

export class DateProp {
  private date: Date;

  constructor(date?: Date) {
    if (date) {
      this.validate(date);
      this.date = date;
    } else {
      this.date = new Date();
    }
  }

  private validate(date: Date) {
    if (date > new Date()) {
      throw new ValidationError(
        'Passed date cannot be greater than the present date.',
      );
    }
  }

  public get value(): Date {
    return this.date;
  }
}
