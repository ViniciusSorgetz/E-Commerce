import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RegisterProductUseCase } from 'src/app/use-cases/register-product.usecase';
import { RegisterProductPresenter } from './register-product.presenter';
import { RequestValidator } from 'src/infra/http/request.validator';
import { registerProductBodySchema } from './register-product.dto';
import {  FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class ProductsController {
  constructor(private registerProductUseCase: RegisterProductUseCase) {}

  @Post('/products')
  @UseInterceptors(FilesInterceptor('images'))
  async registerProduct(@Body() body: registerProductBodySchema, @UploadedFiles() files: Files) {
    const { name, price, tags, description, mainImageId, specifications } =
      RequestValidator.validate(registerProductBodySchema, body);
    const registeredProduct = await this.registerProductUseCase.execute({
      name,
      price,
      tags,
      description,
      mainImageId,
      specifications,
    });

    files.

    return RegisterProductPresenter.present(registeredProduct);
  }
}
