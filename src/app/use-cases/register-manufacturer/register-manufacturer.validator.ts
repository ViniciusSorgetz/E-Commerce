import { ManufacturerRepository } from '@src/app/repositories/manufacturer.repository';
import { ValidationError } from '@src/shared';

export class RegisterManufacturerValidator {
  constructor(
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}

  public async validateEmail(email: string) {
    const foundManufacturer =
      await this.manufacturerRepository.findOneByEmail(email);

    if (foundManufacturer) {
      throw new ValidationError(
        'The given manufacturer e-mail is already being used.',
      );
    }
  }

  public async validatePhone(phone: string) {
    const foundManufacturer =
      await this.manufacturerRepository.findOneByPhone(phone);

    if (foundManufacturer) {
      throw new ValidationError(
        'The given manufacturer phone is already being used.',
      );
    }
  }
}
