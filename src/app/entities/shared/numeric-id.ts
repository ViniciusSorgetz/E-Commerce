import { ValidationError } from '@shared/.';

export class NumericId {
  constructor(private id: number) {
    if (id <= 0) {
      throw new ValidationError('Numeric id must be positive.');
    }
    if (!Number.isInteger(id)) {
      throw new ValidationError('Numeric id must be an integer.');
    }
  }

  public get value(): number {
    return this.id;
  }
}
