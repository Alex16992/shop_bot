import { InlineKeyboard } from "grammy";
import type { Prisma } from "../../generated/prisma";
import type { MyContext } from "../types";

type HistoryWithProduct = Prisma.HistoryGetPayload<{
  include: { product: true };
}>;

export function historyMenu(ctx: MyContext, history: HistoryWithProduct[]) {
  const page = ctx.session.historyPage ?? 1;
  const keyboard = new InlineKeyboard();

  history.forEach((item, i) => {
    keyboard
      .text(
        `${item.product.name} (${item.createdAt.toLocaleString()})`,
        `click-product-history-${item.product.id}`
      )
      .row();
  });

  keyboard
    .text(
      "<",
      page !== 1 ? `click-history-${page > 1 ? page - 1 : 1}` : "click-empty"
    )
    .text(`${page}`, "click-empty")
    .text(">", `click-history-${page + 1}`);

  return keyboard;
}
