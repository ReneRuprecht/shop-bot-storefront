import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  type APIEmbed,
  type CacheType,
  type JSONEncodable,
} from "discord.js";
import { getAllProducts } from "../shopware/products/get-all-products.js";
import type { SlashCommand } from "../discord-bot/types/command-type.js";
import { getProductsEmbeds } from "./helpers/embeds/products-embeds.js";
import { getPagination } from "./helpers/pagination/pagination.js";

export const productsCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("products")
    .setDescription("Answers with shopware products"),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const products = await getAllProducts();
    const productEmbeds = getProductsEmbeds(products);

    await getPagination(
      interaction,
      productEmbeds,
      async (index, embeds: (APIEmbed | JSONEncodable<APIEmbed>)[]) => {
        // fetch new products if the end is reached
        if (index === embeds.length - 1) {
          const newp = await getAllProducts();
          const newe = await getProductsEmbeds(newp);

          embeds.push(...newe);
        }
      },
    );
  },
};
