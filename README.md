# 🎮 GAME SHOP 221

Boutique e-commerce gaming au Sénégal — Comptes, UC, cartes cadeaux. Paiement Wave, livraison automatique.

## 🌐 Production

- **URL** : https://gameshop221.vercel.app
- **Repo** : https://github.com/idimbengue003-web/gameshop
- **Admin** : https://gameshop221.vercel.app/#admin (mdp: `admin221`)
- **Suivi commande** : https://gameshop221.vercel.app/#suivi

## 🚀 Stack technique

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + shadcn/ui
- **Prisma ORM** + PostgreSQL (Neon)
- **Vercel** (déploiement + auto-deploy GitHub)

## 📦 Fonctionnalités

- Catalogue de 23 produits (comptes gaming, recharges, cartes cadeaux)
- Stock de codes uniques (1 code consommé par vente)
- Paiement Wave via deep link
- Livraison automatique ⚡ pour les produits instantanés
- Panneau admin (#admin) avec CRUD produits + gestion des codes
- Page suivi commande (#suivi) par référence
- Tableau de bord admin : commandes, CA, stocks
- SEO + OpenGraph + favicon

## 🔧 Installation locale

```bash
# 1. Installer les dépendances
bun install

# 2. Configurer l'environnement (SQLite local ou Neon)
cp .env.example .env
# Éditer .env avec votre DATABASE_URL

# 3. Initialiser la base de données
bun run db:push
bun run seed

# 4. Lancer le dev
bun run dev
```

## 🔑 Configuration

Modifiez `src/config/site.ts` pour personnaliser :
- Numéro Wave
- Mot de passe admin (défaut : `admin221`)
- Lien Instagram

## 📁 Structure

```
src/
├── app/                    # Routes Next.js
│   ├── api/                # APIs (products, orders, admin)
│   ├── page.tsx            # Page principale (#admin, #suivi)
│   └── layout.tsx          # Layout + SEO
├── components/
│   ├── admin/              # Panneau admin
│   └── site/               # Composants publics
├── config/site.ts          # Configuration
└── data/products.ts        # Types partagés
```

## 📝 License

Propriétaire — © GAME SHOP 221

