import {
  getAllCategories,
  type Category,
} from "../categories/get-all-categories.js";
import { getAllProducts, type Product } from "../products/get-all-products.js";

export class ShopwareClient {
  public async getAllProducts(params?: any): Promise<Product[]> {
    return await getAllProducts(params);
  }
  public async getAllCategories(): Promise<Category[]> {
    return await getAllCategories();
  }
}
