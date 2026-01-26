import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ValidationError } from '@src/shared';
import { ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (_error) {
      throw new ValidationError('Validation failed');
    }
  }
}
