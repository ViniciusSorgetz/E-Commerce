import { ValidationError } from 'src/shared/errors/validation-error';

export class NumericId {
  constructor(private id: number) {
    if (id <= 0) {
      throw new ValidationError('Numeric id must be positive.');
    }
  }

  public get value(): number {
    return this.id;
  }
}
