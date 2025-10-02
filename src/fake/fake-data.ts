import {  } from '../../generated/prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    telegramId: faker.number.int(),
    username: faker.lorem.word(),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    telegramId: faker.number.int(),
    username: faker.lorem.word(),
    createdAt: new Date(),
  };
}
export function fakeCategory() {
  return {
    name: faker.lorem.word(),
  };
}
export function fakeCategoryComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: faker.lorem.word(),
  };
}
export function fakeProduct() {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.number.float(),
  };
}
export function fakeProductComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    price: faker.number.float(),
    categoryId: faker.number.int(),
    createdAt: new Date(),
  };
}
