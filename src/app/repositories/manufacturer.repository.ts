import { Manufacturer } from '../entities/manufacturer/manufacturer';

export abstract class ManufacturerRepository {
  findOneById: (id: string) => Promise<Manufacturer | null>;
}
