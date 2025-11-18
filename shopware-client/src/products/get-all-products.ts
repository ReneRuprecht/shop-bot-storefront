import { apiGet } from "../client/api.js";

export interface Product {
  name: string;
  unitPrice: string;
}

interface ProductShopwareResponse {
  name: string;
  calculatedPrice: CalculatedPrice;
}
interface CalculatedPrice {
  unitPrice: string;
}

export async function getAllProducts(): Promise<Product[]> {
  let products: Product[] = [];
  let data = await apiGet("product");

  data.elements
    .filter(
      (productResponse: ProductShopwareResponse) =>
        productResponse.name !== null,
    )
    .forEach((element: ProductShopwareResponse) => {
      products.push({
        name: element.name,
        unitPrice: element.calculatedPrice.unitPrice,
      });
    });

  return products;
}
