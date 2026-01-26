import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
  action: z.string(),
  status_code: z.number(),
});

export class errorDto extends createZodDto(errorSchema) {}
