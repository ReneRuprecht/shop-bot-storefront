import { apiGet } from "../client/api.js";
import { buildProductUrl } from "./mappers/product-url-mapper.js";

export interface Product {
  name: string;
  productNumber: string;
  unitPrice: string;
  description: string;
  coverUrl: string;
  url: string;
}

interface ProductShopwareResponse {
  name: string;
  productNumber: string;
  calculatedPrice: CalculatedPrice;
  description: string;
  cover: Cover;
}
interface CalculatedPrice {
  unitPrice: string;
}
interface Cover {
  media: Media;
}
interface Media {
  url: string;
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
        productNumber: element.productNumber,
        unitPrice: element.calculatedPrice.unitPrice,
        description: element.description,
        coverUrl: element.cover.media.url,
        url: buildProductUrl(element.name, element.productNumber),
      });
    });

  return products;
}
