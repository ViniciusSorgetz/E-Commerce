import { Email, Merchant, MerchantName, Phone } from '@src/app/entities';
import { MerchantRepository } from '@src/app/repositories/merchant.repository';
import { RegisterMerchantValidator } from './register-merchant.validator';
import { Injectable } from '@nestjs/common';

interface registerMerchantBody {
  name: string;
  email: string;
  phone: string;
}

type registerMerchantResponse = Promise<Merchant>;

@Injectable()
export class RegisterMerchantUseCase {
  private registerMerchantValidator: RegisterMerchantValidator;

  constructor(private readonly merchantRepository: MerchantRepository) {
    this.registerMerchantValidator = new RegisterMerchantValidator(
      this.merchantRepository,
    );
  }

  public async execute(body: registerMerchantBody): registerMerchantResponse {
    const { name, email, phone } = body;

    await this.registerMerchantValidator.validateEmail(email);
    await this.registerMerchantValidator.validateEmail(phone);

    const registeredMerchant = Merchant.create({
      name: new MerchantName(name),
      email: new Email(email),
      phone: new Phone(phone),
    });

    await this.merchantRepository.saveOne(registeredMerchant);

    return registeredMerchant;
  }
}
