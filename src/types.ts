import type { AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import type { ConversationFlavor } from "@grammyjs/conversations";
import type { HydrateFlavor } from "@grammyjs/hydrate";
import type { Context, SessionFlavor } from "grammy";

export type MyContext = Context &
  SessionFlavor<SessionData> &
  HydrateFlavor<Context> &
  AutoChatActionFlavor &
  ConversationFlavor<Context>;

export interface SessionData {
  data: Record<string, any>;
  accessLevel: number;
  productsPage: number;
  categoriesPage: number;
  categoryId: number;
}
