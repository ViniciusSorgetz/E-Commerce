import { RegisterProductController } from '@src/infra/http/controlers/products/register-product/register-product.controller';
import { expect, it, beforeAll, describe } from 'vitest';
import { Orchestrator } from '@test/orchestrator';
import { ValidationError } from '@src/shared';
import { MerchantFactory } from '../../factories/merchant.factory';
import { ProductCategoryFactory } from '../../factories/product-category.factory';
import { MerchantRepository } from '@app/repositories/merchant.repository';
import { ProductCategoryRepository } from '@app/repositories/product-category.repository';

let registerProductController: RegisterProductController;
let merchantFactory: MerchantFactory;
let prouctCategoryFactory: ProductCategoryFactory;

beforeAll(async () => {
  await Orchestrator.clearDatabase();
  const testModule = await Orchestrator.getTestModule();
  registerProductController = testModule.get(RegisterProductController);

  merchantFactory = new MerchantFactory(testModule.get(MerchantRepository));

  prouctCategoryFactory = new ProductCategoryFactory(
    testModule.get(ProductCategoryRepository),
  );
});

describe('Register product', () => {
  it('should be able to register a valid product.', async () => {
    const merchant = await merchantFactory.make();
    const category1 = await prouctCategoryFactory.make();
    const category2 = await prouctCategoryFactory.make();

    const response = await registerProductController.registerProduct({
      name: 'My Valid Product',
      description:
        'My Valid Product Description. My Valid Product Description.My Valid Product Description. My Valid Product Description.',
      merchantId: merchant.id,
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

  it('should not be able to register a product without an exisisting merchant.', async () => {
    await expect(async () => {
      return await registerProductController.registerProduct({
        name: 'My Valid Product',
        description:
          'My Valid Product Description. My Valid Product Description.My Valid Product Description. My Valid Product Description.',
        merchantId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
