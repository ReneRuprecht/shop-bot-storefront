import { buildCategoryTree } from "./categories/mappers/category-tree-mapper.js";
import type { CategoryNode } from "./categories/mappers/category-tree-mapper.js";
import { ShopwareClient } from "./client/shopware-client.js";

async function main() {
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
