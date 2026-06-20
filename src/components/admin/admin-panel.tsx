"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Product,
  ProductCategory,
  categoryLabels,
  fetchProducts,
} from "@/data/products";
import { ProductForm } from "./product-form";
import { CodesManager } from "./codes-manager";
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
  KeyRound,
  TrendingUp,
  ShoppingCart,
  CircleDollarSign,
  AlertTriangle,
  LayoutGrid,
  Receipt,
  BarChart3,
} from "lucide-react";

interface AdminPanelProps {
  onLogout: () => void;
  onExitToSite: () => void;
}

type Tab = "products" | "orders" | "stats";

interface OrderRow {
  id: string;
  ref: string;
  status: string;
  amount: number;
  customerName: string | null;
  playerId: string | null;
  waveTxId: string | null;
  createdAt: string;
  product: { name: string; emoji: string; game: string | null };
}

interface Stats {
  products: { total: number; active: number };
  codes: { total: number; available: number; sold: number };
  orders: {
    total: number;
    delivered: number;
    pending: number;
    revenue: number;
  };
  recentOrders: Array<{
    ref: string;
    amount: number;
    status: string;
    createdAt: string;
    productName: string;
    productEmoji: string;
    customerName: string | null;
  }>;
  lowStock: Array<{
    id: string;
    name: string;
    emoji: string;
    available: number;
  }>;
}

export function AdminPanel({ onLogout, onExitToSite }: AdminPanelProps) {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [codesProduct, setCodesProduct] = useState<Product | null>(null);
  const [codesOpen, setCodesOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<ProductCategory | "all">(
    "all"
  );
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(true);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders?limit=100", {
        cache: "no-store",
      });
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([loadProducts(), loadOrders(), loadStats()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat =
      filterCategory === "all" || p.category === filterCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.game || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await fetch(`/api/products/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      await loadAll();
    } catch (err) {
      console.error(err);
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
      await loadAll();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
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
                Gestion de la boutique
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

        {/* Tabs */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-1">
            <TabButton
              active={tab === "products"}
              onClick={() => setTab("products")}
              icon={LayoutGrid}
              label="Produits"
              count={products.length}
            />
            <TabButton
              active={tab === "orders"}
              onClick={() => setTab("orders")}
              icon={Receipt}
              label="Commandes"
              count={orders.length}
            />
            <TabButton
              active={tab === "stats"}
              onClick={() => setTab("stats")}
              icon={BarChart3}
              label="Statistiques"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        ) : (
          <>
            {/* ============================== TAB PRODUITS ============================== */}
            {tab === "products" && (
              <>
                {/* Stats rapides */}
                {stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <StatCard
                      label="Produits"
                      value={stats.products.total}
                      sub={`${stats.products.active} actifs`}
                      icon={Package}
                      color="bg-sky-100 text-sky-700"
                    />
                    <StatCard
                      label="Codes dispo"
                      value={stats.codes.available}
                      sub={`${stats.codes.sold} vendus`}
                      icon={KeyRound}
                      color="bg-green-100 text-green-700"
                    />
                    <StatCard
                      label="Commandes"
                      value={stats.orders.total}
                      sub={`${stats.orders.delivered} livrées`}
                      icon={ShoppingCart}
                      color="bg-purple-100 text-purple-700"
                    />
                    <StatCard
                      label="CA total"
                      value={formatPrice(stats.orders.revenue)}
                      sub="Toutes ventes"
                      icon={CircleDollarSign}
                      color="bg-amber-100 text-amber-700"
                      small
                    />
                  </div>
                )}

                {/* Alerte stock faible */}
                {stats && stats.lowStock.length > 0 && (
                  <div className="mb-6 rounded-xl bg-amber-50 border-2 border-amber-300 p-4">
                    <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      Stock faible ({stats.lowStock.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stats.lowStock.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            const prod = products.find((x) => x.id === p.id);
                            if (prod) {
                              setCodesProduct(prod);
                              setCodesOpen(true);
                            }
                          }}
                          className="flex items-center gap-2 bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-sm hover:bg-amber-100 transition-colors"
                        >
                          <span>{p.emoji}</span>
                          <span className="font-medium">{p.name}</span>
                          <Badge className="text-[10px] py-0 bg-amber-500 text-white">
                            {p.available} restant
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex flex-wrap gap-2 items-center">
                    {(
                      ["all", "comptes", "recharges", "cartes"] as const
                    ).map((cat) => (
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
                      </button>
                    ))}
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="🔍 Rechercher..."
                      className="w-44 h-9"
                    />
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

                {/* Liste */}
                {filtered.length === 0 ? (
                  <Card className="p-10 text-center text-slate-500">
                    <Package className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">Aucun produit trouvé</p>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {filtered.map((p) => (
                      <Card
                        key={p.id}
                        className={`p-4 ${!p.active ? "opacity-60" : ""}`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="text-3xl flex-shrink-0 w-12 text-center">
                            {p.emoji}
                          </div>

                          <div className="flex-1 min-w-[200px]">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-slate-900">
                                {p.name}
                              </h3>
                              {p.badge && (
                                <Badge variant="secondary" className="text-[10px] py-0">
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
                              {p.useUniqueCodes ? (
                                <span className="flex items-center gap-0.5 text-purple-600 font-medium">
                                  <KeyRound className="h-3 w-3" />
                                  Codes: {p.stock} dispo
                                </span>
                              ) : (
                                <span>· Stock: {p.stock}</span>
                              )}
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

                          <div className="flex gap-1">
                            {p.useUniqueCodes && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setCodesProduct(p);
                                  setCodesOpen(true);
                                }}
                                title="Gérer les codes"
                                className="h-8 px-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                              >
                                <KeyRound className="h-3.5 w-3.5 mr-1" />
                                Codes
                              </Button>
                            )}
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
              </>
            )}

            {/* ============================== TAB COMMANDES ============================== */}
            {tab === "orders" && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Toutes les commandes ({orders.length})
                </h2>
                {orders.length === 0 ? (
                  <Card className="p-10 text-center text-slate-500">
                    <Receipt className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">Aucune commande pour l'instant</p>
                    <p className="text-sm mt-1">
                      Les commandes apparaîtront ici dès qu'un client paie.
                    </p>
                  </Card>
                ) : (
                  <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-100 text-slate-700">
                          <tr>
                            <th className="text-left px-4 py-2 font-semibold">Réf</th>
                            <th className="text-left px-4 py-2 font-semibold">Produit</th>
                            <th className="text-left px-4 py-2 font-semibold">Client</th>
                            <th className="text-left px-4 py-2 font-semibold">ID joueur</th>
                            <th className="text-left px-4 py-2 font-semibold">Wave TX</th>
                            <th className="text-right px-4 py-2 font-semibold">Montant</th>
                            <th className="text-center px-4 py-2 font-semibold">Statut</th>
                            <th className="text-left px-4 py-2 font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((o) => (
                            <tr
                              key={o.id}
                              className="border-t border-slate-100 hover:bg-slate-50"
                            >
                              <td className="px-4 py-2 font-mono text-xs text-slate-700">
                                {o.ref}
                              </td>
                              <td className="px-4 py-2">
                                <span className="mr-1">{o.product.emoji}</span>
                                {o.product.name}
                              </td>
                              <td className="px-4 py-2 text-slate-600">
                                {o.customerName || "—"}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs text-slate-600">
                                {o.playerId || "—"}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs text-slate-600">
                                {o.waveTxId || "—"}
                              </td>
                              <td className="px-4 py-2 text-right font-bold text-sky-700">
                                {formatPrice(o.amount)}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {o.status === "delivered" ? (
                                  <Badge className="bg-green-500 hover:bg-green-500 text-white text-[10px]">
                                    Livrée
                                  </Badge>
                                ) : o.status === "pending" ? (
                                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-[10px]">
                                    En cours
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive" className="text-[10px]">
                                    Échec
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-2 text-xs text-slate-500">
                                {new Date(o.createdAt).toLocaleString("fr-FR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* ============================== TAB STATS ============================== */}
            {tab === "stats" && stats && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  📊 Statistiques
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <BigStat
                    label="Chiffre d'affaires"
                    value={formatPrice(stats.orders.revenue)}
                    icon={CircleDollarSign}
                    color="from-emerald-500 to-green-600"
                  />
                  <BigStat
                    label="Commandes totales"
                    value={String(stats.orders.total)}
                    sub={`${stats.orders.delivered} livrées · ${stats.orders.pending} en cours`}
                    icon={ShoppingCart}
                    color="from-sky-500 to-cyan-600"
                  />
                  <BigStat
                    label="Codes en stock"
                    value={String(stats.codes.available)}
                    sub={`${stats.codes.sold} vendus au total`}
                    icon={KeyRound}
                    color="from-purple-500 to-pink-600"
                  />
                  <BigStat
                    label="Produits actifs"
                    value={`${stats.products.active}/${stats.products.total}`}
                    icon={Package}
                    color="from-amber-500 to-orange-600"
                  />
                </div>

                {/* Commandes récentes */}
                <Card className="p-5 mb-6">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-sky-600" />
                    5 dernières commandes
                  </h3>
                  {stats.recentOrders.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">
                      Aucune commande pour l'instant.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {stats.recentOrders.map((o) => (
                        <div
                          key={o.ref}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50"
                        >
                          <div className="text-xl">{o.productEmoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-900 text-sm">
                              {o.productName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {o.customerName || "Client"} ·{" "}
                              {new Date(o.createdAt).toLocaleString("fr-FR", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sky-700">
                              {formatPrice(o.amount)}
                            </div>
                            <div className="text-xs">
                              {o.status === "delivered" ? (
                                <span className="text-green-600">Livrée ✓</span>
                              ) : (
                                <span className="text-amber-600">En cours</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Stock faible détaillé */}
                {stats.lowStock.length > 0 && (
                  <Card className="p-5">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Produits en stock faible (&lt; 3 codes)
                    </h3>
                    <div className="space-y-2">
                      {stats.lowStock.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-amber-50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{p.emoji}</span>
                            <span className="font-medium text-slate-900">
                              {p.name}
                            </span>
                          </div>
                          <Badge className="bg-amber-500 hover:bg-amber-500 text-white">
                            {p.available} restant
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>
            💡 Modifiez le mot de passe admin dans{" "}
            <code className="bg-slate-200 px-1 rounded text-slate-700">
              src/config/site.ts
            </code>{" "}
            (actuel : {siteConfig.adminPassword})
          </p>
        </div>
      </main>

      {/* Modals */}
      <ProductForm
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
        onSaved={loadAll}
      />
      <CodesManager
        open={codesOpen}
        onOpenChange={setCodesOpen}
        product={codesProduct}
        onChanged={loadAll}
      />

      {/* Delete confirm */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <Card
            className="p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-slate-900 mb-2">
              Confirmer la suppression
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Voulez-vous vraiment supprimer{" "}
              <strong>{deleteTarget.name}</strong> ? Cette action est
              irréversible.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-1" />
                )}
                Supprimer
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
        active
          ? "border-sky-400 text-white"
          : "border-transparent text-slate-400 hover:text-slate-200"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 rounded-full ${
            active ? "bg-sky-500 text-white" : "bg-slate-700 text-slate-300"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  small,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  small?: boolean;
}) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div
          className={`font-black text-slate-900 ${
            small ? "text-base" : "text-2xl"
          } truncate`}
        >
          {value}
        </div>
        <div className="text-xs text-slate-500">
          {label}
          {sub && <span className="block text-[10px] text-slate-400">{sub}</span>}
        </div>
      </div>
    </Card>
  );
}

function BigStat({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Card className="p-5">
      <div
        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-md`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="text-2xl font-black text-slate-900">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </Card>
  );
}
