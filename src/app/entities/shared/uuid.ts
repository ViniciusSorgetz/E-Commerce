import { ValidationError } from '@shared/.';

export class Uuid {
  constructor(private id: string) {
    this.validate(id);
    this.id = id;
  }

  validate(id: string) {
    const re = new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    );

    if (!id.match(re)) {
      throw new ValidationError('Invalid UUID format.');
    }
  }

  public get value(): string {
    return this.id;
  }
}
