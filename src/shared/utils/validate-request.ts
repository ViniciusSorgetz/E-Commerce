import { ValidationError } from '@src/shared/errors/validation.error';
import z, { ZodError, ZodObject } from 'zod';

export function validateRequest<T extends ZodObject>(
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
