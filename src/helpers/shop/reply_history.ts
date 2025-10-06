import { InputFile } from "grammy";
import type { Prisma } from "../../../generated/prisma";
import { historyMenu } from "../../menu/history_menu";
import type { MyContext } from "../../types";

type HistoryWithProduct = Prisma.HistoryGetPayload<{
  include: { product: true };
}>;

export async function replyHistory(
  ctx: MyContext,
  page: number,
  history: HistoryWithProduct[] | null
) {
  if (!history) return ctx.reply("Ошибка получения истории.");

  ctx.session.historyPage = page;

  if (!history[0]) return ctx.reply("Ошибка получения истории.");

  const text = `Ваша история покупок:`;

  if (!ctx.callbackQuery) {
    await ctx.replyWithPhoto(new InputFile(`src/images/without_image.jpg`), {
      caption: text,
      reply_markup: historyMenu(ctx, history),
    });

    return;
  }

  await ctx.editMessageMedia(
    {
      type: "photo",
      media: new InputFile(`src/images/without_image.jpg`),
      caption: text,
    },
    {
      reply_markup: historyMenu(ctx, history),
    }
  );

  await ctx.answerCallbackQuery();
}
