import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { RegisterProductPresenter } from './register-product.presenter';
import {
  RegisterProductBodyDto,
  registerProductBodySchema,
  RegisterProductPresenterDto,
} from './register-product.dto';
import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';
import { ZodValidationPipe } from '@src/infra/http/pipes/zod-validation.pipe';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { errorDto } from '@src/infra/http/dtos/error.dto';

@Controller()
export class RegisterProductController {
  constructor(private registerProductUseCase: RegisterProductUseCase) {}

  @Post('/products')
  @ApiBody({ type: RegisterProductBodyDto })
  @ApiResponse({ status: 201, type: RegisterProductPresenterDto })
  @ApiResponse({ status: 400, type: errorDto })
  @UsePipes(new ZodValidationPipe(registerProductBodySchema))
  async registerProduct(@Body() body: RegisterProductBodyDto) {
    const registeredProduct = await this.registerProductUseCase.execute(body);
    return RegisterProductPresenter.present(registeredProduct);
  }
}
