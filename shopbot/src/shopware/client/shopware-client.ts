import {
  getAllCategories,
  type Category,
} from "../categories/get-all-categories.js";
import { getAllProducts, type Product } from "../products/get-all-products.js";

export class ShopwareClient {
  public async getAllProducts(): Promise<Product[]> {
    return await getAllProducts();
  }
  public async getAllCategories(): Promise<Category[]> {
    return await getAllCategories();
  }
}
