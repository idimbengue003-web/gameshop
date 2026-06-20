// Types partagés pour les produits
// Les produits sont stockés en base de données (Prisma + SQLite)

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
  useUniqueCodes: boolean;
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

export async function fetchProducts(admin = false): Promise<Product[]> {
  const url = admin ? "/api/products?admin=true" : "/api/products";
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Erreur lors du chargement des produits");
  const data = await res.json();
  return data.products as Product[];
}

// Statut commande (snapshot pour l'UI)
export type OrderStatus = "delivered" | "pending" | "failed";

export interface OrderSnapshot {
  ref: string;
  status: OrderStatus;
  amount: number;
  customerName?: string | null;
  playerId?: string | null;
  waveTxId?: string | null;
  createdAt: string;
  deliveredContent?: string | null;
  product: {
    name: string;
    emoji: string;
    game?: string | null;
    category: string;
    instantDelivery: boolean;
    deliveryTime?: string | null;
  };
}

export async function fetchOrder(ref: string): Promise<OrderSnapshot> {
  const res = await fetch(`/api/orders/${encodeURIComponent(ref)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Commande introuvable");
  }
  const data = await res.json();
  return data.order as OrderSnapshot;
}
