"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product, ProductCategory, categoryLabels, fetchProducts } from "@/data/products";
import { ProductForm } from "./product-form";
import { siteConfig, formatPrice } from "@/config/site";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Loader2,
  Zap,
  Clock,
  Eye,
  EyeOff,
  ExternalLink,
  Package,
  Star,
} from "lucide-react";

interface AdminPanelProps {
  onLogout: () => void;
  onExitToSite: () => void;
}

export function AdminPanel({ onLogout, onExitToSite }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<ProductCategory | "all">(
    "all"
  );

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(true);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered =
    filterCategory === "all"
      ? products
      : products.filter((p) => p.category === filterCategory);

  const stats = {
    total: products.length,
    instant: products.filter((p) => p.instantDelivery).length,
    active: products.filter((p) => p.active).length,
    popular: products.filter((p) => p.popular).length,
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  };

  const toggleActive = async (p: Product) => {
    try {
      await fetch(`/api/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, active: !p.active }),
      });
      await load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar admin */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-700">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo/gameshop221.jpg"
              alt="GAME SHOP 221"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <div>
              <div className="font-bold text-sm">Admin · GAME SHOP 221</div>
              <div className="text-[11px] text-slate-400">
                Gestion du catalogue
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExitToSite}
              className="border-slate-600 text-slate-200 hover:bg-slate-800"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Voir le site
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-red-500/50 text-red-300 hover:bg-red-950"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            label="Produits totaux"
            value={stats.total}
            icon={Package}
            color="bg-sky-100 text-sky-700"
          />
          <StatCard
            label="Livraison instantanée ⚡"
            value={stats.instant}
            icon={Zap}
            color="bg-amber-100 text-amber-700"
          />
          <StatCard
            label="Actifs"
            value={stats.active}
            icon={Eye}
            color="bg-green-100 text-green-700"
          />
          <StatCard
            label="Populaires"
            value={stats.popular}
            icon={Star}
            color="bg-purple-100 text-purple-700"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {(["all", "comptes", "recharges", "cartes"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === cat
                    ? "bg-sky-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat === "all" ? "Tous" : categoryLabels[cat]}
                <span className="ml-1.5 text-xs opacity-70">
                  {cat === "all"
                    ? products.length
                    : products.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setFormOpen(true);
            }}
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Nouveau produit
          </Button>
        </div>

        {/* Liste produits */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        ) : filtered.length === 0 ?(
          <Card className="p-10 text-center text-slate-500">
            <Package className="h-10 w-10 mx-auto mb-3 text-slate-300" />
            <p className="font-medium">Aucun produit dans cette catégorie</p>
            <p className="text-sm mt-1">
              Cliquez sur "Nouveau produit" pour en créer un.
            </p>
          </Card>
        ) : (
          <div className="grid gap-3">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className={`p-4 ${
                  !p.active ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  {/* Emoji */}
                  <div className="text-3xl flex-shrink-0 w-12 text-center">
                    {p.emoji}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900">{p.name}</h3>
                      {p.badge && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] py-0"
                        >
                          {p.badge}
                        </Badge>
                      )}
                      {p.popular && (
                        <Badge className="text-[10px] py-0 bg-amber-500 hover:bg-amber-500">
                          <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                          POPULAIRE
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
                      <span className="font-mono">
                        {categoryLabels[p.category]}
                      </span>
                      {p.game && <span>· {p.game}</span>}
                      <span>· Stock: {p.stock}</span>
                      {p.instantDelivery ? (
                        <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                          <Zap className="h-3 w-3 fill-current" />
                          Instantané ⚡
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-slate-500">
                          <Clock className="h-3 w-3" />
                          {p.deliveryTime}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prix */}
                  <div className="text-right">
                    <div className="font-black text-sky-700">
                      {formatPrice(p.price)}
                    </div>
                    {p.oldPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        {formatPrice(p.oldPrice)}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(p)}
                      title={p.active ? "Désactiver" : "Activer"}
                      className="h-8 w-8 p-0"
                    >
                      {p.active ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(p);
                        setFormOpen(true);
                      }}
                      className="h-8 px-2"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Éditer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteTarget(p)}
                      className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>
            💡 Les modifications sont sauvegardées dans la base de données et
            visibles immédiatement sur le site.
          </p>
          <p className="mt-1">
            Mot de passe admin actuel :{" "}
            <code className="bg-slate-200 px-1 rounded text-slate-700">
              {siteConfig.adminPassword}
            </code>{" "}
            — modifiable dans <code>src/config/site.ts</code>
          </p>
        </div>
      </main>

      {/* Form modal */}
      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
        onSaved={load}
      />

      {/* Delete confirm */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer{" "}
              <strong>{deleteTarget?.name}</strong> ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-1" />
              )}
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-black text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </Card>
  );
}
