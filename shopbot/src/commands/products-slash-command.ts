import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  type CacheType,
} from "discord.js";
import { getAllProducts } from "../shopware/products/get-all-products.js";
import type { SlashCommand } from "../discord-bot/types/command-type.js";

export const productsCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("products")
    .setDescription("Answers with shopware products"),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const products = await getAllProducts();
    const text = products
      .map((product) => `${product.name} ${product.unitPrice}`)
      .join("\n");
    await interaction.reply(text);
  },
};
