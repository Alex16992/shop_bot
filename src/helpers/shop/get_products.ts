import prisma from "../../prisma";
import type { MyContext } from "../../types";

export const getProducts = async (ctx: MyContext, page: number) => {
  if (!ctx.from) {
    ctx.reply("Ошибка получения данных пользователя телеграм.");
    return null;
  }

  const accessLevel = ctx.session.accessLevel;

  if (accessLevel >= 0) {
    return prisma.product.findMany({
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return null;
};
