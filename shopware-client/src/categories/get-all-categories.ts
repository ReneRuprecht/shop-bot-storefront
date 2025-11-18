import { apiGet } from "../client/api.js";

export interface Category {
  id: string;
  categoryName: string;
  parentId: string | null;
}

interface CategoryShopwareResponse {
  id: string;
  name: string;
  parentId: string | null;
}

export async function getAllCategories(): Promise<Category[]> {
  let categories: Category[] = [];
  let data = await apiGet("category");

  data.elements
    .filter((category: CategoryShopwareResponse) => category.id !== undefined)
    .forEach((category: CategoryShopwareResponse) => {
      categories.push({
        id: category.id,
        categoryName: category.name,
        parentId: category.parentId,
      });
    });

  return categories;
}
