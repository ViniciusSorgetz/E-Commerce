import { Phone } from '@src/app/entities';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const registerMerchantBodySchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().refine((arg) => {
    new Phone(arg);
  }),
});

export const registerMerchantPresenterSchema = z.object({
  merchant: z.object({
    id: z.uuidv4(),
    name: z.string().min(3),
    email: z.email(),
    phone: z.string().max(15),
  }),
});

export class RegisterMerchantBodyDto extends createZodDto(
  registerMerchantBodySchema,
) {}

export class RegisterMerchantPresenterDto extends createZodDto(
  registerMerchantPresenterSchema,
) {}
