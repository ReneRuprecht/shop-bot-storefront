import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  type CacheType,
} from "discord.js";
import { getAllCategories } from "../shopware/categories/get-all-categories.js";
import type { SlashCommand } from "../discord-bot/types/command-type.js";

export const categoriesCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("categories")
    .setDescription("Answers with shopware categories"),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const categories = await getAllCategories();
    const text = categories.map((category) => category.categoryName).join("\n");
    await interaction.reply(text);
  },
};
