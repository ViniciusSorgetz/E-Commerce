import { ValidationError } from 'src/shared/errors/validation.error';
import { ZodError, ZodObject, z } from 'zod';

export class RequestValidator {
  static validate<T extends ZodObject>(
    schema: T,
    request: unknown,
  ): z.infer<T> {
    try {
      return schema.parse(request) as z.infer<T>;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.message);
      }
      throw error;
    }
  }
}
