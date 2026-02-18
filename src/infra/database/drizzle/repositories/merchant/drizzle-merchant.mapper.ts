import {
  DateProp,
  Email,
  Merchant,
  MerchantName,
  Phone,
  Uuid,
} from '@src/app/entities';
import { merchantsTable } from '../../schemas';

export class DrizzleMerchantMapper {
  public static toEntity(
    merchant: typeof merchantsTable.$inferSelect,
  ): Merchant {
    return Merchant.with({
      id: new Uuid(merchant.id),
      name: new MerchantName(merchant.name),
      email: new Email(merchant.email),
      phone: new Phone(merchant.phone),
      updatedAt: new DateProp(merchant.updatedAt),
      createdAt: new DateProp(merchant.createdAt),
    });
  }

  public static toDrizzle(
    merchant: Merchant,
  ): typeof merchantsTable.$inferSelect {
    return {
      id: merchant.id,
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      updatedAt: merchant.updatedAt,
      createdAt: merchant.createdAt,
    };
  }
}
