import {
  MessageFlags,
  type ButtonInteraction,
  type CacheType,
  type ChatInputCommandInteraction,
} from "discord.js";

export async function handleInvalidUser(
  collectInteraction: ButtonInteraction<CacheType>,
  interaction: ChatInputCommandInteraction<CacheType>,
) {
  if (collectInteraction.user.id !== interaction.user.id) {
    return await collectInteraction.reply({
      content: "You are not allwed to use these buttons",
      flags: MessageFlags.Ephemeral,
    });
  }
}
