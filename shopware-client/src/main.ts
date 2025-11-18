import { ShopwareClient } from "./client/shopware-client.js";

async function main() {
  const client = new ShopwareClient();

  const products = await client.getAllProducts();
  products.forEach((p) => console.log(p));

  const categories = await client.getAllCategories();
  categories.forEach((c) => console.log(c));
}

main();
