import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { RegisterProductCategoryUseCase } from '@src/app/use-cases/register-product-category/register-product-category.usecase';
import {
  RegisterProductCategoryBodyDto,
  registerProductCategoryBodySchema,
  RegisterProductCategoryPresenterDto,
} from './register-product-category.dto';
import { RegisterProductCategoryPresenter } from './register-product-category.presenter';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { errorDto } from '@src/infra/http/dtos/error.dto';

@Controller()
export class RegisterProductCategoryController {
  constructor(
    private readonly registerProductCategoryUseCase: RegisterProductCategoryUseCase,
  ) {}

  @Post('/product-categories')
  @ApiBody({ type: RegisterProductCategoryBodyDto })
  @ApiResponse({ status: 201, type: RegisterProductCategoryPresenterDto })
  @ApiResponse({ status: 400, type: errorDto })
  @UsePipes(new ZodValidationPipe(registerProductCategoryBodySchema))
  public async registerProductCategory(
    @Body() body: RegisterProductCategoryBodyDto,
  ) {
    const registeredProductCategory =
      await this.registerProductCategoryUseCase.execute(body);

    return RegisterProductCategoryPresenter.present(registeredProductCategory);
  }
}
