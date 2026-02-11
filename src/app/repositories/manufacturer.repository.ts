import { Manufacturer } from '../entities/manufacturer/manufacturer';

export abstract class ManufacturerRepository {
  findOneById: (id: string) => Promise<Manufacturer | null>;
  findOneByEmail: (email: string) => Promise<Manufacturer | null>;
  findOneByPhone: (phone: string) => Promise<Manufacturer | null>;
  saveOne: (manufacturer: Manufacturer) => Promise<void>;
}
