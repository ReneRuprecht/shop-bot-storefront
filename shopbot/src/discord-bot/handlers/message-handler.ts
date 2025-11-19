import type { Message, OmitPartialGroupDMChannel } from "discord.js";
import type { MessageCommand } from "../types/command-type.js";

export async function handleMessage(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  messageCommands: Map<string, MessageCommand>,
) {
  if (message.author.bot) return;

  const response = messageCommands.get(message.content);
  if (!response) return;

  message.reply(response.reply);
}
