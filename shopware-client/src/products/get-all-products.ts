import { apiGet } from "../client/api.js";

export async function getAllProducts() {
  let products = [];
  let data = await apiGet("product");

  for (let e in data.elements) {
    const product = data.elements[e];
    products.push({
      name: product.name,
      unitPrice: product.calculatedPrice.unitPrice,
    });
  }

  return products;
}
