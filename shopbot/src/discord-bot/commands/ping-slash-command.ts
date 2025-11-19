import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  type CacheType,
} from "discord.js";
import type { SlashCommand } from "../types/command-type.js";

export const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Answers with Pong!"),

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.reply("Pong!");
  },
};
