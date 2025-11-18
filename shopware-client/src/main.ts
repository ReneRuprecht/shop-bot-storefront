import { ShopwareClient } from "./client/shopware-client.js";

async function main() {
  const client = new ShopwareClient();

  const products = await client.getAllProduct();
  console.log(products);
}

main();
