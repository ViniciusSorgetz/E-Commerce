import { Merchant } from '@src/app/entities';
import {
  RegisterMerchantPresenterDto,
  registerMerchantPresenterSchema,
} from './register-merchant.dto';
import { FormatationError } from '@src/shared';

export class RegisterMerchantPresenter {
  public static present(merchant: Merchant): RegisterMerchantPresenterDto {
    const formattedResponse = {
      merchant: {
        id: merchant.id,
        email: merchant.email,
        name: merchant.name,
        phone: merchant.phone,
      },
    };

    return this.validate(formattedResponse);
  }

  static validate(formattedResponse: RegisterMerchantPresenterDto) {
    try {
      return registerMerchantPresenterSchema.parse(formattedResponse);
    } catch (error) {
      throw new FormatationError({
        message: 'Error while formatting data for response.',
        cause: error,
      });
    }
  }
}
