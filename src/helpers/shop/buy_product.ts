import { InputFile } from "grammy";
import prisma from "../../prisma";
import type { MyContext } from "../../types";
import { getProduct } from "./get_product";

export const buyProduct = async (ctx: MyContext, productId: number) => {
  if (!ctx.from) {
    ctx.reply("Ошибка получения данных пользователя телеграм.");
    return;
  }
  if (!productId) {
    ctx.reply("Ошибка получения ID товара.");
    return;
  }

  const product = await getProduct(ctx, productId);

  if (!product) return ctx.reply("Ошибка получения товара.");

  const user = await prisma.user.findUnique({
    where: { telegramId: ctx.from.id.toString() },
  });

  if (!user) return ctx.reply("Пользователь не найден.");

  if (user.balance.lessThan(product.price))
    return ctx.reply("Недостаточно средств.");

  try {
    await prisma.user.update({
      where: { telegramId: ctx.from.id.toString() },
      data: { balance: { decrement: product.price } },
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await prisma.history.create({
      data: {
        userId: user.id,
        productId: product.id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  await ctx.replyWithSticker(
    "CAACAgIAAxkBAAE8BdNo4SMhiBvI6tViedOOqsZrAAFsW6YAAmcEAALMVEkJb7qTfYIKNUU2BA"
  );

  await ctx.replyWithDocument(new InputFile("src/product.txt"), {
    caption: `Вы купили ${product.name} за ${product.price} руб.`,
  });
};
