import z from 'zod';

export const registerProductBodySchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
});

export type registerProductBodySchema = z.infer<
  typeof registerProductBodySchema
>;
