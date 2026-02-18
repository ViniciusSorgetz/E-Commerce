import { Inject, Injectable } from '@nestjs/common';
import { Merchant } from '@src/app/entities';
import { MerchantRepository } from '@src/app/repositories/merchant.repository';
import { ProvidersToken } from '@src/infra/http/providers/providers-token.enum';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { merchantsTable } from '../../schemas';
import { eq } from 'drizzle-orm';
import { DrizzleMerchantMapper } from './drizzle-merchant.mapper';

@Injectable()
export class DrizzleMerchantRepository implements MerchantRepository {
  constructor(
    @Inject(ProvidersToken.DrizzleDb) private drizzle: NodePgDatabase,
  ) {}

  public async findOneById(id: string): Promise<Merchant | null> {
    const result = await this.drizzle
      .select()
      .from(merchantsTable)
      .where(eq(merchantsTable.id, id))
      .limit(1);

    return result[0] ? DrizzleMerchantMapper.toEntity(result[0]) : null;
  }

  public async findOneByEmail(email: string) {
    const result = await this.drizzle
      .select()
      .from(merchantsTable)
      .where(eq(merchantsTable.email, email))
      .limit(1);

    return result[0] ? DrizzleMerchantMapper.toEntity(result[0]) : null;
  }

  public async findOneByPhone(phone: string) {
    const result = await this.drizzle
      .select()
      .from(merchantsTable)
      .where(eq(merchantsTable.phone, phone))
      .limit(1);

    return result[0] ? DrizzleMerchantMapper.toEntity(result[0]) : null;
  }

  public async saveOne(merchant: Merchant): Promise<void> {
    await this.drizzle
      .insert(merchantsTable)
      .values(DrizzleMerchantMapper.toDrizzle(merchant));
  }
}
