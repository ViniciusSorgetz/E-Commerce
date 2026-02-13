import { Manufacturer } from '@src/app/entities';
import {
  RegisterManufacturerPresenterDto,
  registerManufacturerPresenterSchema,
} from './register-manufacturer.dto';
import { FormatationError } from '@src/shared';

export class RegisterManufacturerPresenter {
  public static present(
    manufacturer: Manufacturer,
  ): RegisterManufacturerPresenterDto {
    const formattedResponse = {
      manufacturer: {
        id: manufacturer.id,
        email: manufacturer.email,
        name: manufacturer.name,
        phone: manufacturer.phone,
      },
    };

    return this.validate(formattedResponse);
  }

  static validate(formattedResponse: RegisterManufacturerPresenterDto) {
    try {
      return registerManufacturerPresenterSchema.parse(formattedResponse);
    } catch (error) {
      throw new FormatationError({
        message: 'Error while formatting data for response.',
        cause: error,
      });
    }
  }
}
