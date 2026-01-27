import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const registerProductBodySchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  description: z.string().min(3),
  specifications: z.array(
    z.object({
      label: z.string().nonempty(),
      information: z.string().nonempty(),
    }),
  ),
  categories: z.array(z.number().min(1)),
  manufacturerId: z.uuidv4(),
});

export const registerProductPresenterSchema = z.object({
  product: z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    price: z.number().positive(),
    description: z.string().min(3),
    specifications: z.array(
      z.object({
        label: z.string().nonempty(),
        information: z.string().nonempty(),
      }),
    ),
    categories: z.array(
      z.object({
        id: z.number().positive(),
        category: z.string(),
      }),
    ),
    manufacturer_id: z.uuidv4(),
  }),
});

export class registerProductPresenterDto extends createZodDto(
  registerProductPresenterSchema,
) {}

export class registerProductBodyDto extends createZodDto(
  registerProductBodySchema,
) {}
