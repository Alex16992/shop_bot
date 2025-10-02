import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // --- Категории ---
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
    categories.push(category);
  }

  // --- Продукты ---
  for (let i = 0; i < 20; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 1, max: 500, dec: 2 })), // decimal
        categoryId: randomCategory.id,
      },
    });
  }

  // --- Пользователи ---
//   for (let i = 0; i < 10; i++) {
//     await prisma.user.create({
//       data: {
//         telegramId: faker.number.int({ min: 100000, max: 999999 }),
//         username: faker.internet.username(),
//       },
//     });
//   }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
