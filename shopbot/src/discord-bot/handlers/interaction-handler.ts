import { MessageFlags, type CacheType, type Interaction } from "discord.js";

export async function handleInteraction(
  interaction: Interaction<CacheType>,
  commands: Map<string, any>,
) {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Failed to execute command",
      flags: MessageFlags.Ephemeral,
    });
  }
}
