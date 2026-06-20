"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product } from "@/data/products";
import { formatPrice } from "@/config/site";
import {
  Plus,
  Trash2,
  Loader2,
  KeyRound,
  Check,
  X,
  Package,
} from "lucide-react";

interface CodesManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onChanged: () => void;
}

interface CodeItem {
  id: string;
  content: string;
  status: string;
  orderId: string | null;
  order: { ref: string; createdAt: string; customerName: string | null } | null;
  createdAt: string;
}

export function CodesManager({
  open,
  onOpenChange,
  product,
  onChanged,
}: CodesManagerProps) {
  const [codes, setCodes] = useState<CodeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCodes, setNewCodes] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    if (!product) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/products/${product.id}/codes?admin=true`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      setCodes(data.codes);
    } catch {
      setError("Erreur lors du chargement des codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && product) {
      load();
      setNewCodes("");
    }
  }, [open, product]);

  if (!product) return null;

  const available = codes.filter((c) => c.status === "available").length;
  const sold = codes.filter((c) => c.status === "sold").length;

  const handleAdd = async () => {
    if (!newCodes.trim()) return;
    setAdding(true);
    setError("");
    try {
      const codesList = newCodes
        .split(/\n\s*---\s*\n|\n{2,}/) // séparateur --- ou ligne vide
        .map((c) => c.trim())
        .filter(Boolean);

      const res = await fetch(`/api/products/${product.id}/codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes: codesList }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur");
      }
      setNewCodes("");
      await load();
      onChanged();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (codeId: string) => {
    setDeletingId(codeId);
    try {
      const res = await fetch(
        `/api/products/${product.id}/codes?codeId=${codeId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur");
      }
      await load();
      onChanged();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-sky-900 flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Codes uniques — {product.emoji} {product.name}
          </DialogTitle>
          <DialogDescription>
            Chaque vente consomme automatiquement 1 code disponible. Prix :{" "}
            {formatPrice(product.price)}
          </DialogDescription>
        </DialogHeader>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 text-center">
            <div className="text-2xl font-black text-green-600">{available}</div>
            <div className="text-xs text-slate-500">Disponibles</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-black text-slate-700">{sold}</div>
            <div className="text-xs text-slate-500">Vendus</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-black text-sky-700">
              {available + sold}
            </div>
            <div className="text-xs text-slate-500">Total</div>
          </Card>
        </div>

        {/* Ajouter codes */}
        <div className="rounded-xl border-2 border-sky-200 bg-sky-50 p-4">
          <Label htmlFor="new-codes" className="font-semibold text-sky-900">
            ➕ Ajouter des codes
          </Label>
          <p className="text-xs text-slate-600 mt-1 mb-2">
            Séparez chaque code par une ligne vide ou <code>---</code>. Chaque
            bloc = 1 code à livrer.
          </p>
          <Textarea
            id="new-codes"
            value={newCodes}
            onChange={(e) => setNewCodes(e.target.value)}
            placeholder={`🎮 CODE STEAM 10€\n\nCode: ABCD-EFGH-IJKL\n\n---\n\n🎮 CODE STEAM 10€\n\nCode: MNOP-QRST-UVWX`}
            rows={5}
            className="font-mono text-sm"
          />
          <Button
            onClick={handleAdd}
            disabled={adding || !newCodes.trim()}
            className="w-full mt-2 bg-sky-600 hover:bg-sky-700 text-white"
          >
            {adding ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
            ) : (
              <Plus className="h-4 w-4 mr-1.5" />
            )}
            Ajouter au stock
          </Button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        {/* Liste codes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-slate-900 text-sm">
              Stock actuel
            </h4>
            <Badge variant="secondary">{codes.length} code(s)</Badge>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
            </div>
          ) : codes.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">
              <Package className="h-10 w-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">Aucun code en stock.</p>
              <p className="text-xs mt-1">
                Ajoutez des codes ci-dessus pour activer les ventes.
              </p>
            </Card>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {codes.map((c) => (
                <Card
                  key={c.id}
                  className={`p-3 ${
                    c.status === "sold" ? "opacity-70 bg-slate-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        {c.status === "available" ? (
                          <Badge className="text-[10px] py-0 bg-green-500 hover:bg-green-500">
                            <Check className="h-2.5 w-2.5 mr-0.5" />
                            Dispo
                          </Badge>
                        ) : (
                          <Badge className="text-[10px] py-0 bg-slate-500 hover:bg-slate-500">
                            <X className="h-2.5 w-2.5 mr-0.5" />
                            Vendu
                          </Badge>
                        )}
                        {c.order && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            → {c.order.ref}
                          </span>
                        )}
                      </div>
                      <pre className="text-xs text-slate-700 font-mono whitespace-pre-wrap break-words line-clamp-3">
                        {c.content}
                      </pre>
                    </div>
                    {c.status === "available" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(c.id)}
                        disabled={deletingId === c.id}
                        className="h-7 w-7 p-0 border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
                      >
                        {deletingId === c.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
