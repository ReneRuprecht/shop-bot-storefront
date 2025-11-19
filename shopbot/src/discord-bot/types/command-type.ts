import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface MessageCommand {
  trigger: string;
  reply: string;
}
