import { Product } from 'src/app/entities/product/product';
import { FormatationError } from 'src/shared/errors/formatation-error';
import { Replace } from 'src/shared/utils/replace';
import { registerProductPresenterSchema } from './register-product.dto';

export class RegisterProductPresenter {
  static present(product: Product): registerProductPresenterSchema {
    const formattedResponse = {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    };

    return this.validate(formattedResponse);
  }

  static validate(
    formattedResponse: Replace<
      registerProductPresenterSchema,
      { product: { id?: number } }
    >,
  ) {
    try {
      return registerProductPresenterSchema.parse(formattedResponse);
    } catch (error) {
      throw new FormatationError({
        message: 'Error while formatting data for response.',
        cause: error,
      });
    }
  }
}
