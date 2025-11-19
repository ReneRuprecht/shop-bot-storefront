import {
  ComponentType,
  type APIEmbed,
  type CacheType,
  type ChatInputCommandInteraction,
  type JSONEncodable,
} from "discord.js";
import { handleInvalidUser } from "./handlers/invalid-user-handler.js";
import { handlePageCount } from "./handlers/page-count-handler.js";
import { getButtonRow } from "./helpers/get-buttons-helper.js";

export async function getPagination(
  interaction: ChatInputCommandInteraction<CacheType>,
  embeds: (APIEmbed | JSONEncodable<APIEmbed>)[],
  fetchNewEmbeds?: (
    index: number,
    embeds: (APIEmbed | JSONEncodable<APIEmbed>)[],
  ) => Promise<void> | void,
  timeout = 10 * 1000,
) {
  try {
    await interaction.deferReply();

    if (embeds.length === 1) {
      return await interaction.editReply({ embeds: embeds });
    }

    let index = 0;

    const buttonRow = getButtonRow(index, embeds.length);

    const embed = embeds?.[index];

    const msg = await interaction.editReply({
      embeds: embed ? [embed] : [],
      components: [buttonRow],
    });

    const collector = await msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: timeout,
    });

    collector.on("collect", async (collectInteraction) => {
      await handleInvalidUser(collectInteraction, interaction);

      await collectInteraction.deferUpdate();

      index = handlePageCount(collectInteraction, index, embeds.length);

      if (fetchNewEmbeds) {
        await fetchNewEmbeds(index, embeds);
      }

      const buttonRow = getButtonRow(index, embeds.length);

      const embed = embeds?.[index];

      await msg.edit({
        embeds: embed ? [embed] : [],
        components: [buttonRow],
      });

      collector.resetTimer();
    });

    collector.on("end", async () => {
      // delete buttons
      await msg.edit({ components: [] });
    });
    return msg;
  } catch (error) {
    console.log(error);
  }
}
