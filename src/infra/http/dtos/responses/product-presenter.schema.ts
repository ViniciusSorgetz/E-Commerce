import z from 'zod';

export const productPresenterSchema = z.object({
  product: z.object({
    id: z.number().positive(),
    name: z.string().nonempty(),
    price: z.int().positive(),
  }),
});

export type productPresenterSchema = z.infer<typeof productPresenterSchema>;
