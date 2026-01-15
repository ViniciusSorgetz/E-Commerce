import z from 'zod';

export const registerProductBodySchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  description: z.string().min(3),
  mainImageId: z.string().nonempty(),
  specifications: z.array(
    z.object({
      label: z.string().nonempty(),
      information: z.string().nonempty(),
    }),
  ),
  tags: z.array(
    z.object({
      categoryId: z.number().positive(),
    }),
  ),
});

export const registerProductPresenterSchema = z.object({
  product: z.object({
    id: z.number().positive(),
    name: z.string().min(3),
    price: z.number().positive(),
    description: z.string().min(3),
    mainImageId: z.string().nonempty(),
    specifications: z.array(
      z.object({
        label: z.string().nonempty(),
        information: z.string().nonempty(),
      }),
    ),
    tags: z.array(
      z.object({
        categoryId: z.number().positive(),
      }),
    ),
  }),
});

export type registerProductPresenterSchema = z.infer<
  typeof registerProductPresenterSchema
>;

export type registerProductBodySchema = z.infer<
  typeof registerProductBodySchema
>;
