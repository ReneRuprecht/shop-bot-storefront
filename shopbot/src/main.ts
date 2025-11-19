import { getSlashCommands } from "./config/commands/slash-commands-config.js";
import { DiscordClient } from "./discord-bot/client/discord-client.js";
import {
  buildCategoryTree,
  type CategoryNode,
} from "./shopware/categories/mappers/category-tree-mapper.js";
import { ShopwareClient } from "./shopware/client/shopware-client.js";

async function main() {
  shopware();
  discord();
}
async function discord() {
  const slashCommands = getSlashCommands();
  const dclient = new DiscordClient(slashCommands, null);
  dclient.init();
}

async function shopware() {
  const client = new ShopwareClient();

  let categories = await client.getAllCategories();

  function printTree(node: CategoryNode, indent = 0) {
    const pad = "  ".repeat(indent);

    console.log(`${pad}- ${node.name}`);
    node.children.forEach((child: any) => printTree(child, indent + 1));
  }

  const tree = buildCategoryTree(categories);
  tree.forEach((root) => printTree(root));
}

main();
