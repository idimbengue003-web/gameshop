// Configuration globale du site GAME SHOP 221
// ⚠️ REMPLACEZ ces valeurs par vos informations réelles

export const siteConfig = {
  name: "GAME SHOP 221",
  tagline: "Comptes, UC & cartes cadeaux au meilleur prix",
  description:
    "Boutique gaming n°1 au Sénégal. Comptes Fortnite, Valorant, GTA, UC PUBG, diamants Free Fire, cartes cadeaux Steam, Google Play, PSN. Paiement Wave, livraison rapide 24/7.",
  url: "https://game-shop221.sn",

  // 👉 REMPLACEZ par votre numéro Wave (format international sans +)
  // Exemple Sénégal : 221770000000
  waveNumber: "221770000000",
  // Numéro d'affichage (format lisible)
  waveNumberDisplay: "+221 77 000 00 00",

  // 👉 REMPLACEZ par votre numéro WhatsApp (format international sans + ni espaces)
  whatsappNumber: "221770000000",
  whatsappDisplay: "+221 77 000 00 00",

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
};

// Génère le deep link Wave pour ouvrir l'app
// Wave supporte le schéma `wave://` qui ouvre l'app directement
export function getWaveDeepLink(): string {
  return "wave://";
}

// Génère le lien WhatsApp pré-rempli avec un message
export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

// Génère le lien Wave de paiement marchand si vous avez un compte Wave Business
// Format: https://pay.wave.com/m/<merchant_id>/money?amount=XXXX
// Si vous n'avez pas de compte marchand, on utilise le deep link simple
export function getWavePaymentLink(amount?: number): string {
  // 👉 Si vous avez un lien marchand Wave Business, remplacez par:
  // return `https://pay.wave.com/m/VOTRE_MERCHANT_ID/money?amount=${amount}`;
  return "wave://";
}

// Formate un prix en FCFA
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}
