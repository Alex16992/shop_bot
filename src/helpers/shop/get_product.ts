import prisma from "../../prisma";
import type { MyContext } from "../../types";

export const getProduct = async (ctx: MyContext, productId: number) => {
  if (!ctx.from) {
    ctx.reply("Ошибка получения данных пользователя телеграм.");
    return null;
  }

  const accessLevel = ctx.session.accessLevel;

  if (accessLevel >= 0) {
    return prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
      },
    });
  }

  return null;
};
