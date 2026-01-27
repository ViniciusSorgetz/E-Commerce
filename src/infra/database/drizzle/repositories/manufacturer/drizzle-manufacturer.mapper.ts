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

  public static toDrizzle(
    manufacturer: Manufacturer,
  ): typeof manufacturersTable.$inferSelect {
    return {
      id: manufacturer.id,
      name: manufacturer.name,
      email: manufacturer.email,
      phone: manufacturer.phone,
      updatedAt: manufacturer.updatedAt,
      createdAt: manufacturer.createdAt,
    };
  }
}
