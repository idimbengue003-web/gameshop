"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, ProductCategory, categoryLabels } from "@/data/products";
import { Loader2, Save, Zap, Clock } from "lucide-react";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSaved: () => void;
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "recharges" as ProductCategory,
  game: "",
  emoji: "🎮",
  badge: "",
  popular: false,
  instantDelivery: true,
  deliveryContent: "",
  deliveryTime: "",
  stock: "99",
  active: true,
};

export function ProductForm({
  open,
  onOpenChange,
  product,
  onSaved,
}: ProductFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        oldPrice: product.oldPrice ? String(product.oldPrice) : "",
        category: product.category,
        game: product.game || "",
        emoji: product.emoji,
        badge: product.badge || "",
        popular: product.popular,
        instantDelivery: product.instantDelivery,
        deliveryContent: product.deliveryContent || "",
        deliveryTime: product.deliveryTime || "",
        stock: String(product.stock),
        active: product.active,
      });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [product, open]);

  const handleChange = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Le nom est requis");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError("Le prix doit être supérieur à 0");
      return;
    }
    if (form.instantDelivery && !form.deliveryContent.trim()) {
      setError(
        "Le contenu de livraison est requis pour les produits en livraison instantanée"
      );
      return;
    }
    if (!form.instantDelivery && !form.deliveryTime.trim()) {
      setError(
        "Le délai de livraison est requis pour les produits non instantanés"
      );
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        category: form.category,
        game: form.game.trim() || null,
        emoji: form.emoji.trim() || "🎮",
        badge: form.badge.trim() || null,
        popular: form.popular,
        instantDelivery: form.instantDelivery,
        deliveryContent: form.deliveryContent.trim() || null,
        deliveryTime: form.deliveryTime.trim() || null,
        stock: Number(form.stock) || 0,
        active: form.active,
      };

      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur serveur");
      }

      onSaved();
      onOpenChange(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-sky-900">
            {product ? "✏️ Modifier le produit" : "➕ Nouveau produit"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Modifiez les champs puis enregistrez."
              : "Remplissez les champs pour créer une nouvelle annonce."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom + emoji */}
          <div className="grid grid-cols-[80px_1fr] gap-3">
            <div>
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                value={form.emoji}
                onChange={(e) => handleChange("emoji", e.target.value)}
                className="text-center text-xl"
                maxLength={4}
              />
            </div>
            <div>
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex: 325 UC PUBG Mobile"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description affichée sur la carte produit"
              rows={2}
            />
          </div>

          {/* Prix + ancien prix */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Prix FCFA *</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="5000"
                required
                min={0}
              />
            </div>
            <div>
              <Label htmlFor="oldPrice">Ancien prix (optionnel)</Label>
              <Input
                id="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={(e) => handleChange("oldPrice", e.target.value)}
                placeholder="6000"
                min={0}
              />
            </div>
          </div>

          {/* Catégorie + jeu */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  handleChange("category", v as ProductCategory)
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comptes">
                    🎮 {categoryLabels.comptes}
                  </SelectItem>
                  <SelectItem value="recharges">
                    💎 {categoryLabels.recharges}
                  </SelectItem>
                  <SelectItem value="cartes">
                    🎁 {categoryLabels.cartes}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="game">Jeu / Plateforme</Label>
              <Input
                id="game"
                value={form.game}
                onChange={(e) => handleChange("game", e.target.value)}
                placeholder="Ex: PUBG Mobile, Steam"
              />
            </div>
          </div>

          {/* Badge */}
          <div>
            <Label htmlFor="badge">Badge (optionnel)</Label>
            <Input
              id="badge"
              value={form.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              placeholder="PROMO, POPULAIRE, TOP VENTE, ÉCONOMIE..."
              maxLength={20}
            />
          </div>

          {/* ⚡ Livraison instantanée */}
          <div className="rounded-xl border-2 border-sky-200 bg-sky-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="instantDelivery"
                  className="flex items-center gap-2 text-sky-900 font-semibold cursor-pointer"
                >
                  <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                  Livraison instantanée ⚡
                </Label>
                <p className="text-xs text-slate-600 mt-1">
                  Si activé, le contenu de livraison sera affiché automatiquement
                  après paiement.
                </p>
              </div>
              <Switch
                id="instantDelivery"
                checked={form.instantDelivery}
                onCheckedChange={(v) => handleChange("instantDelivery", v)}
              />
            </div>

            {form.instantDelivery ? (
              <div>
                <Label htmlFor="deliveryContent" className="text-sm">
                  Contenu livré automatiquement *
                </Label>
                <Textarea
                  id="deliveryContent"
                  value={form.deliveryContent}
                  onChange={(e) =>
                    handleChange("deliveryContent", e.target.value)
                  }
                  placeholder="Ex: Code Steam, identifiants compte, instructions de recharge..."
                  rows={5}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Ce texte sera révélé au client après qu'il ait cliqué sur
                  &laquo; J'ai payé &raquo;.
                </p>
              </div>
            ) : (
              <div>
                <Label
                  htmlFor="deliveryTime"
                  className="text-sm flex items-center gap-1.5"
                >
                  <Clock className="h-3.5 w-3.5" />
                  Délai de livraison affiché *
                </Label>
                <Input
                  id="deliveryTime"
                  value={form.deliveryTime}
                  onChange={(e) => handleChange("deliveryTime", e.target.value)}
                  placeholder="Ex: 10-30 min, 24-48h..."
                />
                <p className="text-xs text-slate-500 mt-1">
                  Le client verra &laquo; Traitement en cours &raquo; après
                  paiement.
                </p>
              </div>
            )}
          </div>

          {/* Options avancées */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="popular" className="text-xs cursor-pointer">
                ⭐ Populaire
              </Label>
              <Switch
                id="popular"
                checked={form.popular}
                onCheckedChange={(v) => handleChange("popular", v)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <Label htmlFor="active" className="text-xs cursor-pointer">
                👁️ Actif
              </Label>
              <Switch
                id="active"
                checked={form.active}
                onCheckedChange={(v) => handleChange("active", v)}
              />
            </div>
            <div>
              <Label htmlFor="stock" className="text-xs">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={form.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                min={0}
                className="h-9"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {product ? "Mettre à jour" : "Créer le produit"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
