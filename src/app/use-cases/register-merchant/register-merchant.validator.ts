import { MerchantRepository } from '@src/app/repositories/merchant.repository';
import { ValidationError } from '@src/shared';

export class RegisterMerchantValidator {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  public async validateEmail(email: string) {
    const foundMerchant = await this.merchantRepository.findOneByEmail(email);

    if (foundMerchant) {
      throw new ValidationError(
        'The given merchant e-mail is already being used.',
      );
    }
  }

  public async validatePhone(phone: string) {
    const foundMerchant = await this.merchantRepository.findOneByPhone(phone);

    if (foundMerchant) {
      throw new ValidationError(
        'The given merchant phone is already being used.',
      );
    }
  }
}
