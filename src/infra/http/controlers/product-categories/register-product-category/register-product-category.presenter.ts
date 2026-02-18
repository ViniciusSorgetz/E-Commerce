import { ProductCategory } from '@src/app/entities';
import {
  RegisterProductCategoryPresenterDto,
  registerProductCategoryPresenterSchema,
} from './register-product-category.dto';
import { FormatationError } from '@src/shared';

export class RegisterProductCategoryPresenter {
  public static present(productCategory: ProductCategory) {
    const formattedResponse: RegisterProductCategoryPresenterDto = {
      category: {
        id: productCategory.id!,
        category: productCategory.category,
      },
    };

    return this.validate(formattedResponse);
  }

  public static validate(
    formattedResponse: RegisterProductCategoryPresenterDto,
  ) {
    try {
      return registerProductCategoryPresenterSchema.parse(formattedResponse);
    } catch (error) {
      throw new FormatationError({
        message: 'Error while formatting data for response.',
        cause: error,
      });
    }
  }
}
