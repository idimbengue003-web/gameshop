// Types partagés pour les produits
// Les produits sont maintenant stockés en base de données (Prisma + SQLite)
// et gérés via le panneau admin accessible sur /#admin

export type ProductCategory = "comptes" | "recharges" | "cartes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  category: ProductCategory;
  game?: string | null;
  emoji: string;
  badge?: string | null;
  popular: boolean;
  instantDelivery: boolean;
  deliveryContent?: string | null;
  deliveryTime?: string | null;
  stock: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  comptes: "Comptes & UC",
  recharges: "Recharges jeux",
  cartes: "Cartes cadeaux",
};

export const categoryEmojis: Record<ProductCategory, string> = {
  comptes: "🎮",
  recharges: "💎",
  cartes: "🎁",
};

// Helper pour fetch les produits depuis l'API
export async function fetchProducts(admin = false): Promise<Product[]> {
  const url = admin ? "/api/products?admin=true" : "/api/products";
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Erreur lors du chargement des produits");
  const data = await res.json();
  return data.products as Product[];
}
