import { Manufacturer } from '../entities/manufacturer/manufacturer';

export interface ManufacturerRepository {
  findOneById: (id: number) => Promise<Manufacturer | null>;
}
