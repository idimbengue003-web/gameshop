// Configuration globale du site GAME SHOP 221

export const siteConfig = {
  name: "GAME SHOP 221",
  tagline: "Comptes, UC & cartes cadeaux au meilleur prix",
  description:
    "Boutique gaming n°1 au Sénégal. Comptes Fortnite, Valorant, GTA, UC PUBG, diamants Free Fire, cartes cadeaux Steam, Google Play, PSN. Paiement Wave, livraison automatique 24/7.",
  url: "https://game-shop221.sn",

  // 👉 REMPLACEZ par votre numéro Wave (format international sans +)
  waveNumber: "221770000000",
  waveNumberDisplay: "+221 77 000 00 00",

  // Réseaux sociaux
  instagram: "https://www.instagram.com/game_shop221/",
  instagramHandle: "@game_shop221",

  // Email (optionnel)
  email: "contact@game-shop221.sn",

  // Devise
  currency: "XOF",
  currencySymbol: "FCFA",

  // Délais
  deliveryTime: "5 à 30 minutes",
  supportHours: "24h/24 - 7j/7",

  // 👉 Mot de passe admin (modifiez-le!)
  adminPassword: "admin221",
};

// Deep link Wave pour ouvrir l'app
export function getWaveDeepLink(): string {
  return "wave://";
}

// Génère le lien Wave de paiement marchand si vous avez un compte Wave Business
export function getWavePaymentLink(amount?: number): string {
  // 👉 Si vous avez un lien marchand Wave Business, remplacez par:
  // return `https://pay.wave.com/m/VOTRE_MERCHANT_ID/money?amount=${amount}`;
  return "wave://";
}

// Formate un prix en FCFA
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}
