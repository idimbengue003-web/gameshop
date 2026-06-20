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

const SITE_URL = "https://game-shop221.sn";
const SITE_DESCRIPTION =
  "Boutique gaming n°1 au Sénégal. Comptes Fortnite, Valorant, GTA, UC PUBG, diamants Free Fire, cartes Steam, Google Play, PSN, Netflix. Paiement Wave, livraison automatique ⚡ 24/7.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GAME SHOP 221 — Comptes gaming, UC & cartes cadeaux au Sénégal",
    template: "%s · GAME SHOP 221",
  },
  description: SITE_DESCRIPTION,
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
    "livraison automatique gaming",
  ],
  authors: [{ name: "GAME SHOP 221" }],
  creator: "GAME SHOP 221",
  publisher: "GAME SHOP 221",
  icons: {
    icon: [
      { url: "/logo/gameshop221.jpg", type: "image/jpeg" },
    ],
    apple: [{ url: "/logo/gameshop221.jpg" }],
    shortcut: ["/logo/gameshop221.jpg"],
  },
  manifest: undefined,
  openGraph: {
    title: "GAME SHOP 221 — Boutique gaming au Sénégal",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "GAME SHOP 221",
    type: "website",
    locale: "fr_SN",
    images: [
      {
        url: "/logo/gameshop221.jpg",
        width: 339,
        height: 232,
        alt: "GAME SHOP 221 logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GAME SHOP 221 — Boutique gaming au Sénégal",
    description: SITE_DESCRIPTION,
    images: ["/logo/gameshop221.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "shopping",
};

export const viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
