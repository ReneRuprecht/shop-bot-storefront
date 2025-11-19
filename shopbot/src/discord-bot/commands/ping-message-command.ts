import type { MessageCommand } from "../types/command-type.js";

export const pingMessageCommand: MessageCommand = {
  trigger: "!Ping",
  reply: "Pong!",
};
