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
    const limit = 12;

    const loadNextProductPage = createProductLoader(limit);

    const products = await loadNextProductPage();
    const productEmbeds = getProductsEmbeds(products);

    await getPagination(
      interaction,
      productEmbeds,
      async (
        currentIndex,
        currentProductsEmbeds: (APIEmbed | JSONEncodable<APIEmbed>)[],
      ) => {
        // fetch new products if the end is reached
        if (currentIndex === currentProductsEmbeds.length - 1) {
          const products = await loadNextProductPage();
          const productEmbeds = await getProductsEmbeds(products);

          if (
            productEmbeds.length + currentProductsEmbeds.length ===
            currentProductsEmbeds.length
          ) {
            return;
          }
          currentProductsEmbeds.push(...productEmbeds);
        }
      },
    );
  },
};

function createProductLoader(limit: number) {
  let page = 1;

  return async function loadNextPage() {
    const products = await getAllProducts({ limit, page });
    page++;
    return products;
  };
}
