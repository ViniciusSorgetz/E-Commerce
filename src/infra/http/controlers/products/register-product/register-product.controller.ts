import { Body, Controller, Post } from '@nestjs/common';
import { RegisterProductPresenter } from './register-product.presenter';
import { registerProductBodySchema } from './register-product.dto';
import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';
import { validateRequest } from '@src/shared/.';

@Controller()
export class RegisterProductController {
  constructor(private registerProductUseCase: RegisterProductUseCase) {}

  @Post('/products')
  async registerProduct(@Body() body: registerProductBodySchema) {
    const {
      name,
      price,
      categories,
      description,
      specifications,
      manufacturerId,
    } = validateRequest(registerProductBodySchema, body);
    const registeredProduct = await this.registerProductUseCase.execute({
      name,
      price,
      categories,
      description,
      manufacturerId,
      specifications,
    });

    return RegisterProductPresenter.present(registeredProduct);
  }
}
