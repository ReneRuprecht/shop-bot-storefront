import type { ButtonInteraction, CacheType } from "discord.js";

export function handlePageCount(
  collectInteraction: ButtonInteraction<CacheType>,
  index: number,
  embedsLength: number,
) {
  switch (collectInteraction.customId) {
    case "first":
      return 0;
    case "prev":
      return Math.max(0, index - 1);
    case "next":
      return Math.min(embedsLength - 1, index + 1);
    case "last":
      return embedsLength - 1;
    default:
      return index;
  }
}
