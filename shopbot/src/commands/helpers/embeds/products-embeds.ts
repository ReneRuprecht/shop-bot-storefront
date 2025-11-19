import { EmbedBuilder } from "discord.js";
import type { Product } from "../../../shopware/products/get-all-products.js";

export function getProductsEmbeds(products: Product[]): EmbedBuilder[] {
  const MAX_EMBED_WIDTH = 200;

  const embeds = products.map((product) => {
    return new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(product.name)
      .setURL(product.url)
      .setDescription("Test description")
      .setThumbnail(product.coverUrl)
      .setFields([
        {
          name: "price",
          value: product.unitPrice.toString(),
          inline: true,
        },
        {
          name: "product-number",
          value: product.productNumber.toString(),
          inline: true,
        },
      ])
      .setFooter({ text: "Products".padEnd(MAX_EMBED_WIDTH) + "\u200B" });
  });
  return embeds;
}
