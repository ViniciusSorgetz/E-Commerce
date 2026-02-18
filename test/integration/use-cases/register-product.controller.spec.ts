import { Test } from '@nestjs/testing';
import { RegisterProductUseCase } from '@src/app/use-cases/register-product/register-product.usecase';
import { RegisterProductController } from '@src/infra/http/controlers/products/register-product/register-product.controller';
import { DrizzleModule } from '@src/infra/database/drizzle/drizzle.module';
import { Orchestrator } from '../orchestrator';
import { ValidationError } from '@src/shared';

beforeAll(async () => {
  await Orchestrator.resetDadatabse();
});

let registerProductController: RegisterProductController;

beforeEach(async () => {
  const testModule = await Test.createTestingModule({
    imports: [DrizzleModule.config()],
    controllers: [RegisterProductController],
    providers: [RegisterProductUseCase],
  }).compile();

  registerProductController = testModule.get(RegisterProductController);
});

describe('Register product', () => {
  it('should not be able to register a product without a manufacturer.', async () => {
    expect(async () => {
      return await registerProductController.registerProduct({
        name: 'My Valid Product',
        description:
          'My Valid Product Description. My Valid Product Description.My Valid Product Description. My Valid Product Description.',
        manufacturerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        categories: [1, 2],
        specifications: [
          {
            information: 'Product Specification 1',
            label: 'Product Label 1',
          },
          {
            information: 'Product Specification 2',
            label: 'Product Label 2',
          },
        ],
        price: 5000,
      });
    }).rejects.toThrow(ValidationError);
  });
});
