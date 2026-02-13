import { Controller, Post, UsePipes } from '@nestjs/common';
import { RegisterManufacturerUseCase } from '@src/app/use-cases/register-manufacturer/register-manufacturer.usecase';
import {
  RegisterManufacturerBodyDto,
  registerManufacturerBodySchema,
  RegisterManufacturerPresenterDto,
} from './register-manufacturer.dto';
import { RegisterManufacturerPresenter } from './register-manufacturer.presenter';
import { ZodValidationPipe } from 'nestjs-zod';
import { errorDto } from '@src/infra/http/dtos/error.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller()
export class RegisterManufacturerController {
  constructor(
    private readonly registerManufacturerUseCase: RegisterManufacturerUseCase,
  ) {}

  @Post('/manufacturers')
  @ApiBody({ type: RegisterManufacturerBodyDto })
  @ApiResponse({ status: 201, type: RegisterManufacturerPresenterDto })
  @ApiResponse({ status: 400, type: errorDto })
  @UsePipes(new ZodValidationPipe(registerManufacturerBodySchema))
  public async registerManufacturer(body: RegisterManufacturerBodyDto) {
    const registeredManufacturer =
      await this.registerManufacturerUseCase.execute(body);
    return RegisterManufacturerPresenter.present(registeredManufacturer);
  }
}
