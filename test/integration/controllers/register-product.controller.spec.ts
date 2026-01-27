import { RegisterProductController } from '@src/infra/http/controlers/products/register-product/register-product.controller';
import { Orchestrator } from '../orchestrator';
import { ValidationError } from '@src/shared';
import { ManufacturerFactory } from '../factories/manufacturer.factory';
import { ProductCategoryFactory } from '../factories/product-category.factory';
import { ManufacturerRepository } from '@app/repositories/manufacturer.repository';
import { ProductCategoryRepository } from '@app/repositories/product-category.repository';

let registerProductController: RegisterProductController;
let manufacturerFactory: ManufacturerFactory;
let prouctCategoryFactory: ProductCategoryFactory;

beforeAll(async () => {
  await Orchestrator.resetDadatabse();
  const testModule = await Orchestrator.getTestModule();
  registerProductController = testModule.get(RegisterProductController);
  manufacturerFactory = new ManufacturerFactory(
    testModule.get(ManufacturerRepository),
  );
  prouctCategoryFactory = new ProductCategoryFactory(
    testModule.get(ProductCategoryRepository),
  );
});

describe('Register product', () => {
  it('should be able to register a valid product.', async () => {
    const manufacturer = await manufacturerFactory.make();
    const category1 = await prouctCategoryFactory.make();
    const category2 = await prouctCategoryFactory.make();

    const response = await registerProductController.registerProduct({
      name: 'My Valid Product',
      description:
        'My Valid Product Description. My Valid Product Description.My Valid Product Description. My Valid Product Description.',
      manufacturerId: manufacturer.id,
      categories: [category1.id!, category2.id!],
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

    expect(response).toBeTruthy();
  });

  it('should not be able to register a product without an exisisting manufacturer.', async () => {
    await expect(async () => {
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
