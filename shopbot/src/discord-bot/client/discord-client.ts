import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { env } from "../../config/env.js";
import { handleInteraction } from "../handlers/interaction-handler.js";
import { handleMessage } from "../handlers/message-handler.js";
import { pingCommand } from "../commands/ping-slash-command.js";
import type { MessageCommand, SlashCommand } from "../types/command-type.js";
import { pingMessageCommand } from "../commands/ping-message-command.js";

export class DiscordClient {
  slashCommands = new Map();
  messageCommands: Map<string, MessageCommand> = new Map();
  client: Client | null = null;

  constructor(
    slashCommands: Map<string, SlashCommand>,
    messageCommands: Map<string, MessageCommand> | null,
  ) {
    this.slashCommands = new Map<string, SlashCommand>([
      ...slashCommands,
      [pingCommand.data.name, pingCommand],
    ]);

    this.messageCommands = new Map<string, MessageCommand>([
      [pingMessageCommand.trigger, pingMessageCommand],
      ...(messageCommands ? [...messageCommands] : []),
    ]);
  }

  public async init() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
    });

    this.client.login(env.discordBotToken);

    this.client.once(Events.ClientReady, (readyClient) => {
      console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    this.client.on(Events.MessageCreate, async (message) =>
      handleMessage(message, this.messageCommands),
    );

    this.client.on(Events.InteractionCreate, async (interaction) =>
      handleInteraction(interaction, this.slashCommands),
    );

    this.setupCommands();
  }

  async setupCommands() {
    const commandData = [...this.slashCommands.values()].map((cmd) =>
      cmd.data.toJSON(),
    );
    const rest = new REST({ version: "10" }).setToken(env.discordBotToken);

    try {
      console.log("Registering commands");
      await rest.put(
        Routes.applicationGuildCommands(
          env.discordClientId,
          env.discordGuildId,
        ),
        { body: commandData },
      );
      console.log("Commands registered!");
    } catch (error) {
      console.error(error);
    }
  }
}
