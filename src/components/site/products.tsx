"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Product,
  ProductCategory,
  categoryLabels,
  categoryEmojis,
  products,
} from "@/data/products";
import { formatPrice } from "@/config/site";
import { Waves, Check, Flame, Tag } from "lucide-react";

interface ProductsSectionProps {
  onOrder: (product: Product) => void;
}

export function ProductsSection({ onOrder }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    "all"
  );

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const categories: Array<{ key: ProductCategory | "all"; label: string; emoji: string }> = [
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
            cadeaux. Prix en FCFA, paiement Wave, livraison instantanée.
          </p>
        </div>

        {/* Filtres catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
                    activeCategory === cat.key
                      ? "text-sky-100"
                      : "text-slate-400"
                  }`}
                >
                  {products.filter((p) => p.category === cat.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onOrder={onOrder} />
          ))}
        </div>

        {/* Note bas de section */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            🔒 Tous les produits sont garantis. En cas de problème, remboursement
            ou échange sous 24h.
          </p>
        </div>
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
      {/* Badge promo / popularité */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-10">
          <Badge
            className={`${
              product.badge === "PROMO" || product.badge === "ÉCONOMIE"
                ? "bg-red-500 text-white"
                : product.badge === "POPULAIRE" || product.badge === "TOP VENTE"
                  ? "bg-amber-500 text-white"
                  : "bg-sky-600 text-white"
            } shadow-md text-xs`}
          >
            {product.badge === "PROMO" && <Tag className="h-3 w-3 mr-1" />}
            {(product.badge === "POPULAIRE" || product.badge === "TOP VENTE") && (
              <Flame className="h-3 w-3 mr-1" />
            )}
            {product.badge}
          </Badge>
        </div>
      )}

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
            Livraison 5-30 min
          </span>
        </div>
      </div>
    </Card>
  );
}
