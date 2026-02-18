import { Merchant } from '../entities/merchant/merchant';

export abstract class MerchantRepository {
  findOneById: (id: string) => Promise<Merchant | null>;
  findOneByEmail: (email: string) => Promise<Merchant | null>;
  findOneByPhone: (phone: string) => Promise<Merchant | null>;
  saveOne: (merchant: Merchant) => Promise<void>;
}
