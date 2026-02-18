import { Email, Manufacturer, ManufacturerName, Phone } from '@app/entities';
import { ManufacturerRepository } from '@app/repositories/manufacturer.repository';
import { faker } from '@faker-js/faker';

export class ManufacturerFactory {
  constructor(
    private readonly manufactorerRepository: ManufacturerRepository,
  ) {}

  public async make(): Promise<Manufacturer> {
    const createdManufacturer = Manufacturer.create({
      name: new ManufacturerName(faker.person.firstName()),
      email: new Email(faker.internet.email()),
      phone: new Phone(faker.string.numeric({ length: 13 })),
    });

    await this.manufactorerRepository.saveOne(createdManufacturer);
    return createdManufacturer;
  }
}
