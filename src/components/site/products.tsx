"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Product,
  ProductCategory,
  categoryLabels,
  categoryEmojis,
  fetchProducts,
} from "@/data/products";
import { formatPrice } from "@/config/site";
import {
  Waves,
  Check,
  Flame,
  Tag,
  Zap,
  Clock,
  Loader2,
  PackageOpen,
  Search,
  TrendingUp,
  ArrowDownWideNarrow,
} from "lucide-react";

interface ProductsSectionProps {
  onOrder: (product: Product) => void;
}

type SortMode = "popular" | "price-asc" | "price-desc" | "instant";

export function ProductsSection({ onOrder }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    "all"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("popular");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProducts();
        if (!cancelled) {
          setProducts(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Impossible de charger les produits. Réessayez plus tard.");
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Vérifier si la DB est configurée (réponse vide avec erreur spécifique)
  const dbNotConfigured = products.length === 0 && !loading && !error;

  const filteredRaw = products.filter((p) => {
    const matchCat =
      activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.game || "").toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Tri
  const filtered = [...filteredRaw].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "instant":
        // Instantanés d'abord, puis populaires
        if (a.instantDelivery !== b.instantDelivery)
          return a.instantDelivery ? -1 : 1;
        return Number(b.popular) - Number(a.popular);
      case "popular":
      default:
        return Number(b.popular) - Number(a.popular);
    }
  });

  const categories: Array<{
    key: ProductCategory | "all";
    label: string;
    emoji: string;
  }> = [
    { key: "all", label: "Tout voir", emoji: "✨" },
    { key: "comptes", label: categoryLabels.comptes, emoji: categoryEmojis.comptes },
    { key: "recharges", label: categoryLabels.recharges, emoji: categoryEmojis.recharges },
    { key: "cartes", label: categoryLabels.cartes, emoji: categoryEmojis.cartes },
  ];

  return (
    <section id="produits" className="py-16 md:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header section */}
        <div className="text-center mb-10">
          <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100 mb-3">
            Nos offres
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Choisissez votre produit
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Catalogue complet de comptes gaming, recharges UC/diamants/VP et cartes
            cadeaux. Prix en FCFA, paiement Wave, livraison automatique ⚡.
          </p>
        </div>

        {/* Filtres catégories + recherche + tri */}
        <div className="space-y-3 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all border-2 ${
                  activeCategory === cat.key
                    ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:text-sky-700"
                }`}
              >
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.label}
                {cat.key !== "all" && (
                  <span
                    className={`ml-2 text-xs ${
                      activeCategory === cat.key ? "text-sky-100" : "text-slate-400"
                    }`}
                  >
                    {products.filter((p) => p.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un jeu, un produit..."
                className="pl-9 h-10"
              />
            </div>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              <SortBtn
                active={sort === "popular"}
                onClick={() => setSort("popular")}
                icon={TrendingUp}
                label="Populaires"
              />
              <SortBtn
                active={sort === "instant"}
                onClick={() => setSort("instant")}
                icon={Zap}
                label="⚡ Instant"
              />
              <SortBtn
                active={sort === "price-asc"}
                onClick={() => setSort("price-asc")}
                icon={ArrowDownWideNarrow}
                label="Prix ↑"
              />
              <SortBtn
                active={sort === "price-desc"}
                onClick={() => setSort("price-desc")}
                icon={ArrowDownWideNarrow}
                label="Prix ↓"
              />
            </div>
          </div>

          {search && (
            <div className="text-center text-sm text-slate-500">
              {filtered.length} résultat(s) pour &laquo; {search} &raquo;
            </div>
          )}
        </div>

        {/* États */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-sky-600 mb-3" />
            <p className="text-slate-500 text-sm">Chargement des produits...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">
            <PackageOpen className="h-12 w-12 mx-auto mb-3 text-red-300" />
            <p className="font-medium">{error}</p>
          </div>
        ) : dbNotConfigured ? (
          <div className="text-center py-16 px-4 max-w-lg mx-auto">
            <div className="text-5xl mb-3">🔌</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Base de données à configurer
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Le site est en ligne mais la base de données n'est pas encore
              connectée. Les produits apparaîtront ici une fois la DB configurée
              côté Vercel.
            </p>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-left text-xs text-slate-600">
              <p className="font-semibold mb-1">📋 Étapes :</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Créer une DB Postgres (Neon, Supabase ou Vercel Postgres)</li>
                <li>
                  Ajouter <code className="bg-white px-1 rounded">DATABASE_URL</code> dans Vercel
                </li>
                <li>
                  Lancer <code className="bg-white px-1 rounded">bun run db:push &amp;&amp; bun run seed</code>
                </li>
                <li>Redéployer</li>
              </ol>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <PackageOpen className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">Aucun produit dans cette catégorie.</p>
          </div>
        ) : (
          <>
            {/* Grille produits */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrder={onOrder}
                />
              ))}
            </div>

            {/* Note bas de section */}
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                🔒 Tous les produits sont garantis. Les produits{" "}
                <span className="font-medium text-amber-600">
                  ⚡ Instantané
                </span>{" "}
                sont livrés automatiquement après paiement.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder: (product: Product) => void;
}) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Card
      className={`group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${
        product.popular ? "ring-2 ring-sky-400" : ""
      }`}
      onClick={() => onOrder(product)}
    >
      {/* Badges en haut */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end">
        {product.instantDelivery && (
          <Badge className="bg-amber-500 text-white shadow-md text-[10px] gap-0.5">
            <Zap className="h-2.5 w-2.5 fill-current" />
            Instantané
          </Badge>
        )}
        {product.badge && (
          <Badge
            className={`${
              product.badge === "PROMO" || product.badge === "ÉCONOMIE"
                ? "bg-red-500 text-white"
                : product.badge === "POPULAIRE" || product.badge === "TOP VENTE"
                  ? "bg-sky-600 text-white"
                  : "bg-sky-600 text-white"
            } shadow-md text-[10px]`}
          >
            {product.badge === "PROMO" && <Tag className="h-2.5 w-2.5 mr-0.5" />}
            {(product.badge === "POPULAIRE" ||
              product.badge === "TOP VENTE") && (
              <Flame className="h-2.5 w-2.5 mr-0.5" />
            )}
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="p-4 md:p-5">
        {/* Emoji + jeu */}
        <div className="flex items-center gap-2 mb-3">
          <div className="text-4xl">{product.emoji}</div>
          {product.game && (
            <span className="text-xs text-slate-500 font-medium">
              {product.game}
            </span>
          )}
        </div>

        {/* Nom */}
        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug min-h-[2.5rem] group-hover:text-sky-700 transition-colors">
          {product.name}
        </h3>

        {/* Description courte */}
        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>

        {/* Délai */}
        <div className="mt-2 text-xs">
          {product.instantDelivery ? (
            <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
              <Zap className="h-3 w-3 fill-current" />
              Livraison automatique ⚡
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Clock className="h-3 w-3" />
              Livraison {product.deliveryTime}
            </span>
          )}
        </div>

        {/* Prix */}
        <div className="mt-3 flex items-baseline gap-2 flex-wrap">
          <span className="text-lg md:text-xl font-black text-sky-700">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Bouton Commander */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onOrder(product);
          }}
          className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white text-sm h-9 group-hover:shadow-md transition-shadow"
        >
          <Waves className="mr-1.5 h-4 w-4" />
          Commander
        </Button>

        {/* Liste garanties */}
        <div className="mt-2.5 flex items-center justify-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-0.5">
            <Check className="h-3 w-3 text-green-600" />
            Wave
          </span>
          <span className="flex items-center gap-0.5">
            <Check className="h-3 w-3 text-green-600" />
            {product.instantDelivery ? "Auto ⚡" : "Garanti"}
          </span>
        </div>
      </div>
    </Card>
  );
}

function SortBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
        active
          ? "bg-white text-sky-700 shadow-sm"
          : "text-slate-600 hover:text-slate-900"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
