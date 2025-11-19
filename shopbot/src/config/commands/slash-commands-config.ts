import { categoriesCommand } from "../../commands/categories-slash-command.js";

import { productsCommand } from "../../commands/products-slash-command.js";
import type { SlashCommand } from "../../discord-bot/types/command-type.js";

export function getSlashCommands() {
  const slashCommands = new Map<string, SlashCommand>([
    [categoriesCommand.data.name, categoriesCommand],
    [productsCommand.data.name, productsCommand],
  ]);
  return slashCommands;
}
