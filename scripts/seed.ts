// Seed du catalogue produits GAME SHOP 221
// Exécuter : bun run scripts/seed.ts

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type SeedProduct = {
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  category: string;
  game?: string | null;
  emoji: string;
  badge?: string | null;
  popular?: boolean;
  instantDelivery: boolean;
  useUniqueCodes?: boolean;
  deliveryContent?: string | null;
  deliveryTime?: string | null;
  // Codes uniques à insérer (si useUniqueCodes=true)
  codes?: string[];
};

const products: SeedProduct[] = [
  // ========== COMPTES GAMING ==========
  {
    name: "Compte Fortnite OG",
    description: "Compte Fortnite avec skins rares (Renégat, Skull Trooper), 30+ skins, 1500 V-Bucks.",
    price: 25000,
    oldPrice: 32000,
    category: "comptes",
    game: "Fortnite",
    badge: "POPULAIRE",
    emoji: "🎯",
    popular: true,
    instantDelivery: true,
    useUniqueCodes: true,
    deliveryContent: null,
    codes: [
      "Email: fortnite.gs221.1@gmail.com\nMDP: Fn@221Shop\n2FA: 482-915",
      "Email: fortnite.gs221.2@gmail.com\nMDP: Fn@221Shop\n2FA: 736-204",
      "Email: fortnite.gs221.3@gmail.com\nMDP: Fn@221Shop\n2FA: 918-567",
    ],
  },
  {
    name: "Compte Valorant",
    description: "Compte Valorant avec 5 skins armes premium (Reaver, Prime), tous agents débloqués, rank Or.",
    price: 30000,
    category: "comptes",
    game: "Valorant",
    emoji: "🔫",
    instantDelivery: false,
    deliveryTime: "10-30 min",
  },
  {
    name: "Compte GTA V Online",
    description: "Compte GTA Online moddé : 500M$, rank 200, toutes les voitures, armes débloquées.",
    price: 15000,
    oldPrice: 20000,
    category: "comptes",
    game: "GTA V",
    badge: "PROMO",
    emoji: "🚗",
    popular: true,
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "Plateforme: PC Steam\nEmail: gtashop221.1@gmail.com\nMDP: GTA@Shop221",
      "Plateforme: PC Steam\nEmail: gtashop221.2@gmail.com\nMDP: GTA@Shop221",
      "Plateforme: PC Epic\nEmail: gtashop221.3@gmail.com\nMDP: GTA@Shop221",
    ],
  },
  {
    name: "Compte PUBG Mobile",
    description: "Compte PUBG Mobile : 10 000 UC, skins M416 Mythique, Conqueror S25, 80+ skins.",
    price: 22000,
    category: "comptes",
    game: "PUBG Mobile",
    emoji: "🎯",
    instantDelivery: false,
    deliveryTime: "15-45 min",
  },
  {
    name: "Compte Free Fire",
    description: "Compte Free Fire : 5000 diamants, 15 personnages, AWM Élite, passe de saison max.",
    price: 12000,
    category: "comptes",
    game: "Free Fire",
    emoji: "🔥",
    instantDelivery: false,
    deliveryTime: "10-30 min",
  },
  {
    name: "Compte Call of Duty Mobile",
    description: "Compte CODM : 2000 CP, 30 skins épiques, BP Mythique, rank Légendaire.",
    price: 18000,
    category: "comptes",
    game: "COD Mobile",
    emoji: "🎖️",
    instantDelivery: false,
    deliveryTime: "15-30 min",
  },

  // ========== RECHARGES ==========
  {
    name: "325 UC PUBG Mobile",
    description: "Recharge instantanée 325 UC PUBG Mobile. Livraison automatique après paiement.",
    price: 5000,
    category: "recharges",
    game: "PUBG Mobile",
    badge: "TOP VENTE",
    emoji: "💎",
    popular: true,
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 325 UC est en cours de traitement automatique.\n\nConnectez-vous à PUBG Mobile avec votre ID joueur, les UC seront créditées sous 2-5 minutes.\n\nSi rien n'apparaît après 10 min, contactez-nous sur Instagram @game_shop221 avec votre référence de commande.",
  },
  {
    name: "660 UC PUBG Mobile",
    description: "Recharge 660 UC PUBG Mobile. Bonus 60 UC inclus. Livraison automatique.",
    price: 9500,
    category: "recharges",
    game: "PUBG Mobile",
    emoji: "💎",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 660 UC (+60 bonus) est en cours de traitement automatique.\n\nLes UC seront créditées sur votre compte PUBG sous 2-5 minutes.",
  },
  {
    name: "1800 UC PUBG Mobile",
    description: "Recharge 1800 UC PUBG Mobile + bonus. Idéal pour Royale Pass et chests.",
    price: 23000,
    oldPrice: 25000,
    category: "recharges",
    game: "PUBG Mobile",
    badge: "ÉCONOMIE",
    emoji: "💎",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 1800 UC (+bonus) est en cours de traitement automatique.\n\nLes UC seront créditées sous 2-5 minutes.",
  },
  {
    name: "310 Diamants Free Fire",
    description: "Recharge 310 diamants Free Fire. Livraison automatique après paiement.",
    price: 4000,
    category: "recharges",
    game: "Free Fire",
    emoji: "🔥",
    popular: true,
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 310 diamants Free Fire est en cours de traitement automatique.\n\nLes diamants seront crédités sous 2-5 minutes.",
  },
  {
    name: "520 Diamants Free Fire",
    description: "Recharge 520 diamants Free Fire. Bonus inclus, livraison automatique.",
    price: 6500,
    category: "recharges",
    game: "Free Fire",
    emoji: "🔥",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 520 diamants Free Fire est en cours de traitement automatique.\n\nLes diamants seront crédités sous 2-5 minutes.",
  },
  {
    name: "1060 Diamants Free Fire",
    description: "Recharge 1060 diamants Free Fire + bonus. Pour passe Elite et boîtes premium.",
    price: 12000,
    category: "recharges",
    game: "Free Fire",
    emoji: "🔥",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 1060 diamants Free Fire est en cours de traitement automatique.\n\nLes diamants seront crédités sous 2-5 minutes.",
  },
  {
    name: "1000 VP Valorant",
    description: "Recharge 1000 Points Vanguard Valorant. Achetez skins dans la boutique.",
    price: 8000,
    category: "recharges",
    game: "Valorant",
    emoji: "🔫",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 1000 VP Valorant est en cours de traitement automatique.\n\nLes VP seront crédités sur votre compte sous 5-10 minutes.",
  },
  {
    name: "400 CP Call of Duty Mobile",
    description: "Recharge 400 CP COD Mobile. Pour tirages et Battle Pass.",
    price: 5500,
    category: "recharges",
    game: "COD Mobile",
    emoji: "🎖️",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 400 CP COD Mobile est en cours de traitement automatique.\n\nLes CP seront crédités sous 5-10 minutes.",
  },
  {
    name: "1000 V-Bucks Fortnite",
    description: "Recharge 1000 V-Bucks Fortnite. Achetez skins, danses et Battle Pass.",
    price: 9000,
    category: "recharges",
    game: "Fortnite",
    emoji: "🎯",
    instantDelivery: true,
    useUniqueCodes: false,
    deliveryContent: "Votre recharge de 1000 V-Bucks Fortnite est en cours de traitement automatique.\n\nLes V-Bucks seront crédités sous 5-10 minutes.",
  },

  // ========== CARTES CADEAUX (codes uniques, 1 par vente) ==========
  {
    name: "Carte Steam 10€",
    description: "Carte cadeau Steam 10€. Code unique envoyé automatiquement après paiement.",
    price: 7500,
    category: "cartes",
    game: "Steam",
    emoji: "🎮",
    popular: true,
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "🎮 CODE STEAM 10€\n\nCode: 5X7Y-9PZK-3M2N",
      "🎮 CODE STEAM 10€\n\nCode: 7K3M-P9RZ-2QXN",
      "🎮 CODE STEAM 10€\n\nCode: 4F8J-N2RT-6K5P",
      "🎮 CODE STEAM 10€\n\nCode: 9PZQ-X3MR-7K2N",
      "🎮 CODE STEAM 10€\n\nCode: 2KRT-8M5N-9PZQ",
    ],
  },
  {
    name: "Carte Steam 25€",
    description: "Carte cadeau Steam 25€. Code digital livré automatiquement.",
    price: 17000,
    oldPrice: 18500,
    category: "cartes",
    game: "Steam",
    badge: "PROMO",
    emoji: "🎮",
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "🎮 CODE STEAM 25€\n\nCode: 8KQF-4RTY-6WZP",
      "🎮 CODE STEAM 25€\n\nCode: 3M9N-7K2P-X4RT",
      "🎮 CODE STEAM 25€\n\nCode: 5PZQ-9K2M-R4T8",
    ],
  },
  {
    name: "Carte Google Play 15€",
    description: "Carte Google Play 15€. Pour apps, jeux, abonnements Android. Code digital immédiat.",
    price: 10000,
    category: "cartes",
    game: "Google Play",
    emoji: "📱",
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "📱 CODE GOOGLE PLAY 15€\n\nCode: 4G7H-2J3K-8M9N-1PQR",
      "📱 CODE GOOGLE PLAY 15€\n\nCode: 7K2M-9P4Q-R6T8-V3WX",
      "📱 CODE GOOGLE PLAY 15€\n\nCode: 5N8Q-2K4M-9P7R-T1WX",
    ],
  },
  {
    name: "Carte Google Play 25€",
    description: "Carte Google Play 25€. Idéale pour achats in-app et abonnements premium.",
    price: 17500,
    category: "cartes",
    game: "Google Play",
    emoji: "📱",
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "📱 CODE GOOGLE PLAY 25€\n\nCode: 7K2M-9P4Q-R6T8-V3WX",
      "📱 CODE GOOGLE PLAY 25€\n\nCode: 4P7N-2K5M-9Q8R-T3WX",
    ],
  },
  {
    name: "Carte PSN 10€",
    description: "Carte PlayStation Network 10€. Pour achats jeux PS4/PS5, abonnement PS Plus.",
    price: 8000,
    category: "cartes",
    game: "PlayStation",
    emoji: "🎮",
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "🎮 CODE PSN 10€\n\nCode: 9F2K-4P7M-Q3R8",
      "🎮 CODE PSN 10€\n\nCode: 7K5P-2M9N-R4T8",
      "🎮 CODE PSN 10€\n\nCode: 3N8Q-5K2M-9P7R",
    ],
  },
  {
    name: "Carte iTunes 25$",
    description: "Carte iTunes/App Store 25$. Pour apps iOS, musique, abonnements iCloud.",
    price: 17000,
    category: "cartes",
    game: "Apple",
    emoji: "🍎",
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "🍎 CODE ITUNES 25$\n\nCode: X9K7M2P4Q8RTVW",
      "🍎 CODE ITUNES 25$\n\nCode: 4P9K7M2Q3R8T5V",
      "🍎 CODE ITUNES 25$\n\nCode: 7K2M9P4Q8R5T3V1",
    ],
  },
  {
    name: "Netflix 1 Mois Premium",
    description: "Compte Netflix 4K Ultra HD 1 mois. Profil personnel, accès partagé garanti.",
    price: 9000,
    category: "cartes",
    game: "Netflix",
    badge: "TOP VENTE",
    emoji: "🎬",
    popular: true,
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "🎬 NETFLIX PREMIUM 4K - 1 MOIS\n\nEmail: netflixgs221.1@gmail.com\nMDP: Netflix@221\nProfil: 'GS221-User1'",
      "🎬 NETFLIX PREMIUM 4K - 1 MOIS\n\nEmail: netflixgs221.2@gmail.com\nMDP: Netflix@221\nProfil: 'GS221-User2'",
      "🎬 NETFLIX PREMIUM 4K - 1 MOIS\n\nEmail: netflixgs221.3@gmail.com\nMDP: Netflix@221\nProfil: 'GS221-User3'",
    ],
  },
  {
    name: "Spotify Premium 3 Mois",
    description: "Abonnement Spotify Premium 3 mois. Musique sans pub, téléchargement offline.",
    price: 9500,
    category: "cartes",
    game: "Spotify",
    emoji: "🎵",
    instantDelivery: true,
    useUniqueCodes: true,
    codes: [
      "🎵 SPOTIFY PREMIUM - 3 MOIS\n\nEmail: spotifygs221.1@gmail.com\nMDP: Spotify@221",
      "🎵 SPOTIFY PREMIUM - 3 MOIS\n\nEmail: spotifygs221.2@gmail.com\nMDP: Spotify@221",
    ],
  },
];

async function main() {
  console.log(`Seed: ${products.length} produits a inserer...`);

  await db.product.deleteMany({});
  await db.codeItem.deleteMany({});
  await db.order.deleteMany({});
  console.log("Anciennes donnees supprimees (products, codes, orders)");

  let totalCodes = 0;

  for (const p of products) {
    const product = await db.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        category: p.category,
        game: p.game ?? null,
        emoji: p.emoji,
        badge: p.badge ?? null,
        popular: p.popular ?? false,
        instantDelivery: p.instantDelivery,
        useUniqueCodes: p.useUniqueCodes ?? false,
        deliveryContent: p.deliveryContent ?? null,
        deliveryTime: p.deliveryTime ?? null,
        stock: p.codes?.length ?? 99,
        active: true,
      },
    });

    if (p.useUniqueCodes && p.codes && p.codes.length > 0) {
      for (const content of p.codes) {
        await db.codeItem.create({
          data: {
            productId: product.id,
            content,
            status: "available",
          },
        });
        totalCodes++;
      }
    }
  }

  const count = await db.product.count();
  const codeCount = await db.codeItem.count();
  const instant = await db.product.count({ where: { instantDelivery: true } });
  const uniqueProducts = await db.product.count({ where: { useUniqueCodes: true } });

  console.log(`${count} produits inseres`);
  console.log(`${instant} produits en livraison instantanee`);
  console.log(`${uniqueProducts} produits utilisant des codes uniques`);
  console.log(`${codeCount} codes uniques en stock`);
}

main()
  .catch((e) => {
    console.error("Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
