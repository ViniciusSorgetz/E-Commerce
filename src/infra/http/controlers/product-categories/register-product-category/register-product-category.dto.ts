import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const registerProductCategoryBodySchema = z.object({
  category: z.string().min(2),
});

export const registerProductCategoryPresenterSchema = z.object({
  category: z.object({
    id: z.number().min(1),
    category: z.string().min(2),
  }),
});

export class RegisterProductCategoryBodyDto extends createZodDto(
  registerProductCategoryBodySchema,
) {}

export class RegisterProductCategoryPresenterDto extends createZodDto(
  registerProductCategoryPresenterSchema,
) {}
