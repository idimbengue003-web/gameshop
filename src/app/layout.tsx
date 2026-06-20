import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GAME SHOP 221 — Comptes gaming, UC & cartes cadeaux au Sénégal",
  description:
    "Boutique gaming n°1 au Sénégal. Comptes Fortnite, Valorant, GTA, UC PUBG, diamants Free Fire, cartes Steam, Google Play, PSN, Netflix. Paiement Wave, livraison 5-30 min.",
  keywords: [
    "game shop sénégal",
    "compte fortnite sénégal",
    "UC PUBG mobile sénégal",
    "diamants free fire",
    "cartes cadeaux steam",
    "wave paiement",
    "boutique gaming dakar",
    "VP valorant",
    "cartes google play",
  ],
  authors: [{ name: "GAME SHOP 221" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "GAME SHOP 221 — Boutique gaming au Sénégal",
    description:
      "Comptes, UC, diamants et cartes cadeaux. Paiement Wave, livraison instantanée 24/7.",
    url: "https://game-shop221.sn",
    siteName: "GAME SHOP 221",
    type: "website",
    locale: "fr_SN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAME SHOP 221 — Boutique gaming au Sénégal",
    description:
      "Comptes, UC, diamants et cartes cadeaux. Paiement Wave, livraison instantanée 24/7.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
