import { Email, Merchant, MerchantName, Phone } from '@app/entities';
import { MerchantRepository } from '@app/repositories/merchant.repository';
import { faker } from '@faker-js/faker';

export class MerchantFactory {
  constructor(private readonly manufactorerRepository: MerchantRepository) {}

  public async make(): Promise<Merchant> {
    const createdMerchant = Merchant.create({
      name: new MerchantName(faker.person.firstName()),
      email: new Email(faker.internet.email()),
      phone: new Phone(faker.string.numeric({ length: 13 })),
    });

    await this.manufactorerRepository.saveOne(createdMerchant);
    return createdMerchant;
  }
}
