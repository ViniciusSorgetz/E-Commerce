import { Product } from 'src/app/entities/product/product';
import { FormatationError } from 'src/shared/errors/formatation-error';
import { Replace } from 'src/shared/utils/replace';
import { productPresenterSchema } from '../dtos/responses/product-presenter.schema';

export class ProductPresenter {
  static present(product: Product): productPresenterSchema {
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
      productPresenterSchema,
      { product: { id?: number } }
    >,
  ) {
    try {
      return productPresenterSchema.parse(formattedResponse);
    } catch (error) {
      throw new FormatationError({
        message: 'Error while formatting data for response.',
        cause: error,
      });
    }
  }
}
