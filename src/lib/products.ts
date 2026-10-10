import type { Category, Product } from "./types";
const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_URL = "https://api.abcz.workers.dev/api/bazardor";
async function request<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    const res = await fetch(`${FALLBACK_URL}${path}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("দামের তথ্য পাওয়া যায়নি");
    return res.json();
  }
}
export const getProducts = () => request<Product[]>("/products");
export const getCategories = () => request<Category[]>("/categories");
export async function getProduct(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug);
}
export async function getCategory(slug: string) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  return {
    category: categories.find((c) => c.slug === slug),
    products: products.filter((p) => p.category === slug),
  };
}
