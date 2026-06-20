"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Check,
  Waves,
  Phone,
  ShieldCheck,
  Clock,
  Zap,
  PartyPopper,
  Loader2,
  Lock,
  AlertCircle,
  PackageX,
  Search,
} from "lucide-react";
import { Product } from "@/data/products";
import { siteConfig, getWavePaymentLink, formatPrice } from "@/config/site";

interface OrderModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "instructions" | "confirming" | "delivered" | "error";

export function OrderModal({ product, open, onOpenChange }: OrderModalProps) {
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [waveTxId, setWaveTxId] = useState("");
  const [step, setStep] = useState<Step>("instructions");
  const [confirming, setConfirming] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [deliveredContent, setDeliveredContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setCustomerName("");
      setCustomerPhone("");
      setPlayerId("");
      setWaveTxId("");
      setStep("instructions");
      setConfirming(false);
      setOrderRef("");
      setDeliveredContent("");
      setErrorMsg("");
    }
  }, [open]);

  if (!product) return null;

  const waveLink = getWavePaymentLink(product.price);

  const copyNumber = () => {
    navigator.clipboard.writeText(siteConfig.waveNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyDelivery = () => {
    if (deliveredContent) {
      navigator.clipboard.writeText(deliveredContent);
    }
  };

  const handleConfirmPayment = async () => {
    setConfirming(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          customerName: customerName.trim() || null,
          customerPhone: customerPhone.trim() || null,
          playerId: playerId.trim() || null,
          waveTxId: waveTxId.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "stock_empty") {
          setStep("error");
          setErrorMsg(
            data.message ||
              "Stock épuisé pour ce produit. Contactez-nous sur Instagram."
          );
          return;
        }
        throw new Error(data.error || "Erreur lors de la création");
      }

      setOrderRef(data.order.ref);
      if (data.order.deliveredContent) {
        setDeliveredContent(data.order.deliveredContent);
      }
      setStep("delivered");
    } catch (err: unknown) {
      setStep("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création de la commande"
      );
    } finally {
      setConfirming(false);
    }
  };

  // ========== ÉTAPE LIVRAISON / ERREUR ==========
  if (step === "delivered") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-col items-center text-center pb-2">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <PartyPopper className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-xl text-green-800">
                Paiement confirmé !
              </DialogTitle>
              <DialogDescription className="mt-1">
                Réf commande : <strong>{orderRef}</strong>
              </DialogDescription>
            </div>
          </DialogHeader>

          {product.instantDelivery && deliveredContent ? (
            <>
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 mb-4">
                <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <Zap className="h-4 w-4 fill-current" />
                  Livraison instantanée ⚡
                </div>
                <p className="text-sm text-slate-700 mb-3">
                  Voici votre commande. Conservez précieusement ces
                  informations :
                </p>

                <div className="rounded-lg bg-white border border-green-200 p-3 font-mono text-sm whitespace-pre-wrap break-words text-slate-800">
                  {deliveredContent}
                </div>

                <Button
                  onClick={copyDelivery}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-green-300 text-green-700 hover:bg-green-100"
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copier le contenu
                </Button>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 mb-4">
                ⚠️ <strong>Important :</strong> Ne partagez jamais ces
                informations. Gardez la référence{" "}
                <code className="bg-amber-100 px-1 rounded">{orderRef}</code>{" "}
                pour suivre votre commande.
              </div>
            </>
          ) : (
            <div className="rounded-xl border-2 border-sky-200 bg-sky-50 p-4 mb-4">
              <div className="flex items-center gap-2 text-sky-800 font-semibold mb-2">
                <Clock className="h-4 w-4" />
                Traitement en cours
              </div>
              <p className="text-sm text-slate-700">
                Votre paiement a bien été enregistré. Votre commande sera livrée
                dans un délai de{" "}
                <strong>{product.deliveryTime || "24 à 48h"}</strong>.
              </p>
              <p className="text-sm text-slate-700 mt-2">
                Vous pouvez suivre l'état avec votre référence :{" "}
                <code className="bg-white px-1.5 py-0.5 rounded text-sky-700">
                  {orderRef}
                </code>
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <a
              href={`#suivi?ref=${orderRef}`}
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                <Search className="h-4 w-4 mr-1.5" />
                Suivre ma commande
              </Button>
            </a>
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white"
            >
              Terminer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === "error") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <div className="flex flex-col items-center text-center pb-2">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <PackageX className="h-8 w-8 text-red-600" />
              </div>
              <DialogTitle className="text-xl text-red-800">
                Commande impossible
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 mb-4">
            {errorMsg}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep("instructions")}
              className="flex-1"
            >
              Retour
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white"
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ========== ÉTAPE INSTRUCTIONS + PAIEMENT ==========
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{product.emoji}</div>
            <div className="flex-1">
              <DialogTitle className="text-lg text-sky-900">
                {product.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <DialogDescription className="text-xs">
                  Paiement Wave sécurisé
                </DialogDescription>
                {product.instantDelivery && (
                  <Badge className="text-[10px] py-0 bg-amber-500 hover:bg-amber-500">
                    <Zap className="h-2.5 w-2.5 mr-0.5 fill-current" />
                    Instantané ⚡
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Récap commande */}
        <div className="rounded-xl bg-sky-50 border border-sky-100 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Produit</span>
            <span className="font-medium text-slate-900">{product.name}</span>
          </div>
          {product.game && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Jeu</span>
              <span className="font-medium text-slate-900">{product.game}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Livraison</span>
            {product.instantDelivery ? (
              <span className="font-medium text-amber-600 flex items-center gap-1">
                <Zap className="h-3 w-3 fill-current" />
                Automatique ⚡
              </span>
            ) : (
              <span className="font-medium text-slate-700">
                {product.deliveryTime}
              </span>
            )}
          </div>
          <Separator className="my-2 bg-sky-200" />
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Total à payer</span>
            <span className="font-bold text-xl text-sky-700">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Infos client */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="customer-name" className="text-sm font-medium">
                Votre nom <span className="text-slate-400">(optionnel)</span>
              </Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ex : Mamadou"
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="customer-phone"
                className="text-sm font-medium"
              >
                Téléphone <span className="text-slate-400">(optionnel)</span>
              </Label>
              <Input
                id="customer-phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Ex : 77 000 00 00"
                className="mt-1"
              />
            </div>
          </div>

          {(product.category === "recharges" ||
            product.category === "comptes") && (
            <div>
              <Label htmlFor="player-id" className="text-sm font-medium">
                {product.category === "recharges"
                  ? "ID Joueur / Numéro de compte"
                  : "Email du compte de réception (optionnel)"}
              </Label>
              <Input
                id="player-id"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder={
                  product.category === "recharges"
                    ? "Ex : 5123456789"
                    : "Ex : monemail@gmail.com"
                }
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Étapes de paiement Wave */}
        <div className="space-y-3 rounded-xl border-2 border-sky-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sky-900 font-semibold">
            <Waves className="h-5 w-5" />
            Paiement Wave — 2 étapes
          </div>

          <ol className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>
                Cliquez sur <strong>&laquo; Ouvrir Wave &raquo;</strong> pour
                lancer l'app Wave et envoyez{" "}
                <strong>{formatPrice(product.price)}</strong> au numéro :
                <div className="mt-1 flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2">
                  <Phone className="h-4 w-4 text-sky-600" />
                  <code className="font-mono font-bold text-sky-900 text-sm">
                    {siteConfig.waveNumberDisplay}
                  </code>
                  <button
                    onClick={copyNumber}
                    className="ml-auto p-1 rounded hover:bg-sky-100 transition-colors"
                    aria-label="Copier le numéro"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-sky-600" />
                    )}
                  </button>
                </div>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span className="flex-1">
                Revenez ici et collez l'ID de transaction Wave, puis cliquez
                sur <strong>&laquo; J'ai payé &raquo;</strong>.
                <Input
                  value={waveTxId}
                  onChange={(e) => setWaveTxId(e.target.value)}
                  placeholder="Ex : TID-XXXXXXXXXX (optionnel)"
                  className="mt-1.5 h-9 text-sm"
                />
              </span>
            </li>
          </ol>
        </div>

        {/* Garanties */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-sky-600" />
            {product.instantDelivery
              ? "Livraison immédiate"
              : `Livraison ${product.deliveryTime}`}
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
            Paiement 100% sécurisé
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col gap-2">
          <a href={waveLink} className="w-full">
            <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold h-12">
              <Waves className="mr-2 h-5 w-5" />
              Ouvrir Wave — {formatPrice(product.price)}
            </Button>
          </a>
          <Button
            onClick={handleConfirmPayment}
            disabled={confirming}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12"
          >
            {confirming ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Traitement de votre commande...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-5 w-5" />
                J'ai payé — Confirmer
              </>
            )}
          </Button>
          <p className="text-xs text-center text-slate-500 flex items-center justify-center gap-1">
            <AlertCircle className="h-3 w-3" />
            La confirmation crée votre commande et déclenche la livraison
            {product.instantDelivery ? " ⚡" : ""}.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
