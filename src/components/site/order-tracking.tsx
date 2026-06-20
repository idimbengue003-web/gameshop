"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Loader2,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { OrderSnapshot, fetchOrder } from "@/data/products";
import { formatPrice } from "@/config/site";

interface OrderTrackingProps {
  onBack: () => void;
}

export function OrderTracking({ onBack }: OrderTrackingProps) {
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Si hash contient ?ref=XXX, pré-remplir
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/ref=([^&]+)/);
    if (match) {
      const ref = decodeURIComponent(match[1]);
      setRef(ref);
      // Auto-recherche
      searchOrder(ref);
    }
  }, []);

  const searchOrder = async (refToSearch?: string) => {
    const r = (refToSearch || ref).trim();
    if (!r) {
      setError("Veuillez saisir votre référence de commande");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const data = await fetchOrder(r);
      setOrder(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Commande introuvable. Vérifiez votre référence."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    if (order?.deliveredContent) {
      navigator.clipboard.writeText(order.deliveredContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100">
        <div className="container mx-auto px-4 max-w-3xl h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-sky-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/logo/gameshop221.jpg"
              alt="GAME SHOP 221"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="font-bold text-slate-900">Suivi commande</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-3xl py-8">
        {/* Recherche */}
        <Card className="p-6 mb-6">
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            🔍 Suivre ma commande
          </h1>
          <p className="text-sm text-slate-600 mb-4">
            Saisissez la référence reçue après votre paiement (ex:{" "}
            <code className="bg-slate-100 px-1 rounded">
              CMD-AB12-123456
            </code>
            ).
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchOrder()}
              placeholder="CMD-XXXX-XXXXXX"
              className="font-mono uppercase"
              autoFocus
            />
            <Button
              onClick={() => searchOrder()}
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-1.5" />
                  Suivre
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}
        </Card>

        {/* Résultat */}
        {order && (
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Référence
                </div>
                <div className="font-mono font-bold text-lg text-slate-900">
                  {order.ref}
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Produit */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 mb-4">
              <div className="text-3xl">{order.product.emoji}</div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">
                  {order.product.name}
                </div>
                {order.product.game && (
                  <div className="text-xs text-slate-500">
                    {order.product.game}
                  </div>
                )}
              </div>
              <div className="font-bold text-sky-700">
                {formatPrice(order.amount)}
              </div>
            </div>

            {/* Détails */}
            <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <span className="text-slate-500">Date : </span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleString("fr-FR")}
                </span>
              </div>
              {order.customerName && (
                <div>
                  <span className="text-slate-500">Client : </span>
                  <span className="font-medium">{order.customerName}</span>
                </div>
              )}
              {order.playerId && (
                <div>
                  <span className="text-slate-500">ID joueur : </span>
                  <span className="font-mono font-medium">{order.playerId}</span>
                </div>
              )}
              {order.waveTxId && (
                <div>
                  <span className="text-slate-500">Wave TX : </span>
                  <span className="font-mono font-medium">
                    {order.waveTxId}
                  </span>
                </div>
              )}
            </div>

            {/* Contenu livré */}
            {order.deliveredContent ? (
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <Zap className="h-4 w-4 fill-current" />
                  Contenu livré ⚡
                </div>
                <div className="rounded-lg bg-white border border-green-200 p-3 font-mono text-sm whitespace-pre-wrap break-words text-slate-800">
                  {order.deliveredContent}
                </div>
                <Button
                  onClick={copyContent}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-green-300 text-green-700 hover:bg-green-100"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                      Copier le contenu
                    </>
                  )}
                </Button>
              </div>
            ) : order.status === "pending" ? (
              <div className="rounded-xl border-2 border-sky-200 bg-sky-50 p-4">
                <div className="flex items-center gap-2 text-sky-800 font-semibold mb-1">
                  <Clock className="h-4 w-4 animate-pulse" />
                  En cours de traitement
                </div>
                <p className="text-sm text-slate-700">
                  Votre commande est en préparation. Délai estimé :{" "}
                  <strong>{order.product.deliveryTime || "24-48h"}</strong>.
                  Vous recevrez une notification dès qu'elle sera prête.
                </p>
              </div>
            ) : null}
          </Card>
        )}

        {/* Aide si pas de commande */}
        {!order && !loading && !error && (
          <div className="text-center py-10">
            <Package className="h-16 w-16 mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">
              Saisissez votre référence pour suivre votre commande
            </p>
            <p className="text-xs text-slate-400 mt-1">
              La référence est affichée après confirmation de votre paiement.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "delivered") {
    return (
      <Badge className="bg-green-500 hover:bg-green-500 text-white">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Livrée
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="bg-amber-500 hover:bg-amber-500 text-white">
        <Clock className="h-3 w-3 mr-1" />
        En cours
      </Badge>
    );
  }
  return (
    <Badge variant="destructive">
      <AlertCircle className="h-3 w-3 mr-1" />
      Échec
    </Badge>
  );
}
