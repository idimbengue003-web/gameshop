// Catalogue produits GAME SHOP 221
// ⚠️ Vous pouvez facilement modifier ces offres selon votre stock Instagram

export type ProductCategory = "comptes" | "recharges" | "cartes";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: ProductCategory;
  game?: string;
  badge?: string;
  emoji: string;
  popular?: boolean;
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

export const products: Product[] = [
  // ========== COMPTES GAMING ==========
  {
    id: "acc-fortnite",
    name: "Compte Fortnite OG",
    description: "Compte Fortnite avec skins rares (Renégat, Skull Trooper), 30+ skins, 1500 V-Bucks.",
    price: 25000,
    oldPrice: 32000,
    category: "comptes",
    game: "Fortnite",
    badge: "POPULAIRE",
    emoji: "🎯",
    popular: true,
  },
  {
    id: "acc-valorant",
    name: "Compte Valorant",
    description: "Compte Valorant avec 5 skins armes premium (Reaver, Prime), tous agents débloqués, rank Or.",
    price: 30000,
    category: "comptes",
    game: "Valorant",
    emoji: "🔫",
  },
  {
    id: "acc-gta5",
    name: "Compte GTA V Online",
    description: "Compte GTA Online moddé : 500M$, rank 200, toutes les voitures, armes débloquées.",
    price: 15000,
    oldPrice: 20000,
    category: "comptes",
    game: "GTA V",
    badge: "PROMO",
    emoji: "🚗",
    popular: true,
  },
  {
    id: "acc-pubg",
    name: "Compte PUBG Mobile",
    description: "Compte PUBG Mobile : 10 000 UC, skins M416 Mythique, Conqueror S25, 80+ skins.",
    price: 22000,
    category: "comptes",
    game: "PUBG Mobile",
    emoji: "🎯",
  },
  {
    id: "acc-freefire",
    name: "Compte Free Fire",
    description: "Compte Free Fire : 5000 diamants, 15 personnages, AWM Élite, passe de saison max.",
    price: 12000,
    category: "comptes",
    game: "Free Fire",
    emoji: "🔥",
  },
  {
    id: "acc-codm",
    name: "Compte Call of Duty Mobile",
    description: "Compte CODM : 2000 CP, 30 skins épiques, BP Mythique, rank Légendaire.",
    price: 18000,
    category: "comptes",
    game: "COD Mobile",
    emoji: "🎖️",
  },

  // ========== RECHARGES (UC, diamants, VP, CP) ==========
  {
    id: "uc-325",
    name: "325 UC PUBG Mobile",
    description: "Recharge instantanée 325 UC PUBG Mobile. Livraison en 5 minutes avec votre ID joueur.",
    price: 5000,
    category: "recharges",
    game: "PUBG Mobile",
    badge: "TOP VENTE",
    emoji: "💎",
    popular: true,
  },
  {
    id: "uc-660",
    name: "660 UC PUBG Mobile",
    description: "Recharge 660 UC PUBG Mobile. Bonus 60 UC inclus. Livraison instantanée.",
    price: 9500,
    category: "recharges",
    game: "PUBG Mobile",
    emoji: "💎",
  },
  {
    id: "uc-1800",
    name: "1800 UC PUBG Mobile",
    description: "Recharge 1800 UC PUBG Mobile + bonus. Idéal pour Royale Pass et chests.",
    price: 23000,
    oldPrice: 25000,
    category: "recharges",
    game: "PUBG Mobile",
    badge: "ÉCONOMIE",
    emoji: "💎",
  },
  {
    id: "ff-310",
    name: "310 Diamants Free Fire",
    description: "Recharge 310 diamants Free Fire. Livraison instantanée via ID joueur.",
    price: 4000,
    category: "recharges",
    game: "Free Fire",
    emoji: "🔥",
    popular: true,
  },
  {
    id: "ff-520",
    name: "520 Diamants Free Fire",
    description: "Recharge 520 diamants Free Fire. Bonus inclus, livraison en 5 minutes.",
    price: 6500,
    category: "recharges",
    game: "Free Fire",
    emoji: "🔥",
  },
  {
    id: "ff-1060",
    name: "1060 Diamants Free Fire",
    description: "Recharge 1060 diamants Free Fire + bonus. Pour passe Elite et boîtes premium.",
    price: 12000,
    category: "recharges",
    game: "Free Fire",
    emoji: "🔥",
  },
  {
    id: "vp-1000",
    name: "1000 VP Valorant",
    description: "Recharge 1000 Points Vanguard Valorant. Achetez skins dans la boutique.",
    price: 8000,
    category: "recharges",
    game: "Valorant",
    emoji: "🔫",
  },
  {
    id: "cp-400",
    name: "400 CP Call of Duty Mobile",
    description: "Recharge 400 CP COD Mobile. Pour tirages et Battle Pass.",
    price: 5500,
    category: "recharges",
    game: "COD Mobile",
    emoji: "🎖️",
  },
  {
    id: "vb-1000",
    name: "1000 V-Bucks Fortnite",
    description: "Recharge 1000 V-Bucks Fortnite. Achetez skins, danses et Battle Pass.",
    price: 9000,
    category: "recharges",
    game: "Fortnite",
    emoji: "🎯",
  },

  // ========== CARTES CADEAUX ==========
  {
    id: "steam-10",
    name: "Carte Steam 10€",
    description: "Carte cadeau Steam 10€. Code envoyé instantanément par WhatsApp. Pour achats jeux Steam.",
    price: 7500,
    category: "cartes",
    game: "Steam",
    emoji: "🎮",
    popular: true,
  },
  {
    id: "steam-25",
    name: "Carte Steam 25€",
    description: "Carte cadeau Steam 25€. Code digital envoyé en 5 minutes. Tout catalogue Steam débloqué.",
    price: 17000,
    oldPrice: 18500,
    category: "cartes",
    game: "Steam",
    badge: "PROMO",
    emoji: "🎮",
  },
  {
    id: "gplay-15",
    name: "Carte Google Play 15€",
    description: "Carte Google Play 15€. Pour apps, jeux, abonnements Android. Code digital immédiat.",
    price: 10000,
    category: "cartes",
    game: "Google Play",
    emoji: "📱",
  },
  {
    id: "gplay-25",
    name: "Carte Google Play 25€",
    description: "Carte Google Play 25€. Idéale pour achats in-app et abonnements premium.",
    price: 17500,
    category: "cartes",
    game: "Google Play",
    emoji: "📱",
  },
  {
    id: "psn-10",
    name: "Carte PSN 10€",
    description: "Carte PlayStation Network 10€. Pour achats jeux PS4/PS5, abonnement PS Plus.",
    price: 8000,
    category: "cartes",
    game: "PlayStation",
    emoji: "🎮",
  },
  {
    id: "itunes-25",
    name: "Carte iTunes 25$",
    description: "Carte iTunes/App Store 25$. Pour apps iOS, musique, abonnements iCloud.",
    price: 17000,
    category: "cartes",
    game: "Apple",
    emoji: "🍎",
  },
  {
    id: "netflix-1m",
    name: "Netflix 1 Mois Premium",
    description: "Compte Netflix 4K Ultra HD 1 mois. Profil personnel, accès partagé garanti.",
    price: 9000,
    category: "cartes",
    game: "Netflix",
    badge: "TOP VENTE",
    emoji: "🎬",
    popular: true,
  },
  {
    id: "spotify-3m",
    name: "Spotify Premium 3 Mois",
    description: "Abonnement Spotify Premium 3 mois. Musique sans pub, téléchargement offline.",
    price: 9500,
    category: "cartes",
    game: "Spotify",
    emoji: "🎵",
  },
];

// Produits filtrés par catégorie
export function getProductsByCategory(category: ProductCategory | "all"): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

// Produits populaires pour le hero
export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular);
}
