import { Phone } from '@src/app/entities';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const registerManufacturerBodySchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().refine((arg) => {
    new Phone(arg);
  }),
});

export const registerManufacturerPresenterSchema = z.object({
  manufacturer: z.object({
    id: z.uuidv4(),
    name: z.string().min(3),
    email: z.email(),
    phone: z.string().max(15),
  }),
});

export class registerManufacturerBodyDto extends createZodDto(
  registerManufacturerBodySchema,
) {}

export class registerManufacturerPresenterDto extends createZodDto(
  registerManufacturerPresenterSchema,
) {}
