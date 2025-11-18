import { getAllProducts } from "../products/get-all-products.js";

export class ShopwareClient {
  public async getAllProduct() {
    return await getAllProducts();
  }
}
