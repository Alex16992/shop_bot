import prisma from "../../prisma";
import type { MyContext } from "../../types";

export const getProducts = async (
  ctx: MyContext,
  page: number,
  categoryId?: number
) => {
  if (!ctx.from) {
    ctx.reply("Ошибка получения данных пользователя телеграм.");
    return null;
  }

  const accessLevel = ctx.session.accessLevel;

  if (accessLevel >= 0) {
    if (categoryId) {
      return prisma.product.findMany({
        where: { categoryId: categoryId },
        skip: (page - 1) * 20,
        take: 20,
        orderBy: {
          name: "desc",
        },
        include: {
          category: true,
        },
      });
    } else {
      const categoryId = ctx.session.categoryId || 1;

      return prisma.product.findMany({
        where: { categoryId: categoryId },
        skip: (page - 1) * 20,
        take: 10,
        orderBy: {
          name: "desc",
        },
        include: {
          category: true,
        },
      });
    }
  }

  return null;
};
