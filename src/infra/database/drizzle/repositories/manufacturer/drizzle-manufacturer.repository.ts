import { Inject, Injectable } from '@nestjs/common';
import { Manufacturer } from '@src/app/entities';
import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { ProvidersToken } from '@src/infra/http/providers/providers-token.enum';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { manufacturersTable } from '../../schemas';
import { eq } from 'drizzle-orm';
import { DrizzleManufacturerMapper } from './drizzle-manufacturer.mapper';

@Injectable()
export class DrizzleManufacturerRepository implements ManufacturerRepository {
  constructor(
    @Inject(ProvidersToken.DrizzleDb) private drizzle: NodePgDatabase,
  ) {}

  public async findOneById(id: string): Promise<Manufacturer | null> {
    const result = await this.getOneById(id);
    return result[0] ? DrizzleManufacturerMapper.toEntity(result[0]) : null;
  }

  private async getOneById(id: string) {
    return await this.drizzle
      .select()
      .from(manufacturersTable)
      .where(eq(manufacturersTable.id, id))
      .limit(1);
  }
}
