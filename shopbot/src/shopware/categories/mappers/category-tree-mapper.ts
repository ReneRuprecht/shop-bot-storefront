import type { Category } from "../get-all-categories.js";

export interface CategoryNode {
  id: string;
  name: string;
  parentId: string | null;
  children: CategoryNode[];
}

export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const categoryMap = new Map<string, CategoryNode>();
  const categoryTree: CategoryNode[] = [];

  categories.forEach((cat: Category) => {
    categoryMap.set(cat.id, {
      id: cat.id,
      name: cat.categoryName,
      parentId: cat.parentId,
      children: [],
    });
  });

  categoryMap.forEach((node) => {
    if (node.parentId === null) {
      categoryTree.push(node);
      return;
    }

    const parent = categoryMap.get(node.parentId);
    if (!parent) {
      console.warn(`Foud unknown parentId: ${node.parentId} for ${node.name}`);
      return;
    }

    parent.children.push(node);
  });

  return categoryTree;
}
