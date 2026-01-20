import { Manufacturer } from '../entities/manufacturer/manufacturer';

export interface ManufacturerRepository {
  findOneById: (id: string) => Promise<Manufacturer | null>;
}
