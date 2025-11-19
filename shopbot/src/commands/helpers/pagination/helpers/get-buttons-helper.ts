import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

function getButtons(
  index: number,
  embedsLength: number,
): [ButtonBuilder, ButtonBuilder, ButtonBuilder, ButtonBuilder, ButtonBuilder] {
  const first = new ButtonBuilder()
    .setCustomId("first")
    .setLabel("<<")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(index === 0);

  const prev = new ButtonBuilder()
    .setCustomId("prev")
    .setLabel("<")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(index === 0);

  const pageCount = new ButtonBuilder()
    .setCustomId("pagecount")
    .setLabel(`${index + 1}/${embedsLength}`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  const next = new ButtonBuilder()
    .setCustomId("next")
    .setLabel(">")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(index === embedsLength - 1);

  const last = new ButtonBuilder()
    .setCustomId("last")
    .setLabel(">>")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(index === embedsLength - 1);

  return [first, prev, pageCount, next, last];
}

export function getButtonRow(
  index: number,
  embedsLength: number,
): ActionRowBuilder<ButtonBuilder> {
  const [first, prev, pageCount, next, last] = getButtons(index, embedsLength);

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents([
    first,
    prev,
    pageCount,
    next,
    last,
  ]);

  return buttonRow;
}
