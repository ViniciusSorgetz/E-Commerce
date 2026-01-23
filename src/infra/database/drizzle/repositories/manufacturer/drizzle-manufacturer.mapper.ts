import {
  DateProp,
  Email,
  Manufacturer,
  ManufacturerName,
  Phone,
  Uuid,
} from '@src/app/entities';
import { manufacturersTable } from '../../schemas';

export class DrizzleManufacturerMapper {
  public static toEntity(
    manufacturer: typeof manufacturersTable.$inferSelect,
  ): Manufacturer {
    return Manufacturer.with({
      id: new Uuid(manufacturer.id),
      name: new ManufacturerName(manufacturer.name),
      email: new Email(manufacturer.email),
      phone: new Phone(manufacturer.phone),
      updatedAt: new DateProp(manufacturer.updatedAt),
      createdAt: new DateProp(manufacturer.createdAt),
    });
  }
}
