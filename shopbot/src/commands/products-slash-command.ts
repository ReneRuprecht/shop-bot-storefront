import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
  type CacheType,
} from "discord.js";
import { getAllProducts } from "../shopware/products/get-all-products.js";
import type { SlashCommand } from "../discord-bot/types/command-type.js";
import { getProductsEmbeds } from "./helpers/embeds/products-embeds.js";

export const productsCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("products")
    .setDescription("Answers with shopware products"),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const products = await getAllProducts();
    const productEmbeds = getProductsEmbeds(products);

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await interaction.editReply({ embeds: productEmbeds });
  },
};
