import { faker } from "@faker-js/faker";
import Decimal from "decimal.js";
export function fakeUser() {
    return {
        telegramId: faker.lorem.words(5),
        username: undefined,
    };
}
export function fakeUserComplete() {
    return {
        id: faker.number.int({ max: 2147483647 }),
        telegramId: faker.lorem.words(5),
        username: undefined,
        createdAt: new Date(),
    };
}
export function fakeCategory() {
    return {
        name: faker.person.fullName(),
    };
}
export function fakeCategoryComplete() {
    return {
        id: faker.number.int({ max: 2147483647 }),
        name: faker.person.fullName(),
    };
}
export function fakeProduct() {
    return {
        name: faker.person.fullName(),
        description: undefined,
        price: new Decimal(faker.number.float()),
    };
}
export function fakeProductComplete() {
    return {
        id: faker.number.int({ max: 2147483647 }),
        name: faker.person.fullName(),
        description: undefined,
        price: new Decimal(faker.number.float()),
        categoryId: faker.number.int(),
        createdAt: new Date(),
    };
}
//# sourceMappingURL=fake-data.js.map