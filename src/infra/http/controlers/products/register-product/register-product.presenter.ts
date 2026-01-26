import { Product } from 'src/app/entities/product/product';
import { FormatationError } from '@shared/.';
import {
  registerProductPresenterDto,
  registerProductPresenterSchema,
} from './register-product.dto';

export class RegisterProductPresenter {
  static present(product: Product): registerProductPresenterDto {
    const formattedResponse: registerProductPresenterDto = {
      product: {
        id: product.id as number,
        name: product.name,
        price: product.price,
        description: product.description,
        specifications: product.specifications.map((specification) => {
          return {
            label: specification.label,
            information: specification.information,
          };
        }),
        categories: product.categories.map((category) => {
          return {
            id: category.id,
            category: category.category,
          };
        }),
        manufacturer_id: product.manufacturerId,
      },
    };

    return this.validate(formattedResponse);
  }

  static validate(formattedResponse: registerProductPresenterDto) {
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
