import { faker } from '@faker-js/faker';

test('1 plus 1', () => {
  expect(faker.lorem.word()).toBeTruthy();
});
