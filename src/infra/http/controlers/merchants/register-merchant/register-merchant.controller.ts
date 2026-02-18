import { Controller, Post, UsePipes } from '@nestjs/common';
import { RegisterMerchantUseCase } from '@src/app/use-cases/register-merchant/register-merchant.usecase';
import {
  RegisterMerchantBodyDto,
  registerMerchantBodySchema,
  RegisterMerchantPresenterDto,
} from './register-merchant.dto';
import { RegisterMerchantPresenter } from './register-merchant.presenter';
import { ZodValidationPipe } from 'nestjs-zod';
import { errorDto } from '@src/infra/http/dtos/error.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller()
export class RegisterMerchantController {
  constructor(
    private readonly registerMerchantUseCase: RegisterMerchantUseCase,
  ) {}

  @Post('/merchants')
  @ApiBody({ type: RegisterMerchantBodyDto })
  @ApiResponse({ status: 201, type: RegisterMerchantPresenterDto })
  @ApiResponse({ status: 400, type: errorDto })
  @UsePipes(new ZodValidationPipe(registerMerchantBodySchema))
  public async registerMerchant(body: RegisterMerchantBodyDto) {
    const registeredMerchant = await this.registerMerchantUseCase.execute(body);
    return RegisterMerchantPresenter.present(registeredMerchant);
  }
}
