"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Check,
  Waves,
  MessageCircle,
  Instagram,
  Phone,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Product } from "@/data/products";
import {
  siteConfig,
  getWavePaymentLink,
  getWhatsAppLink,
  formatPrice,
} from "@/config/site";

interface OrderModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderModal({ product, open, onOpenChange }: OrderModalProps) {
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setCustomerName("");
      setPlayerId("");
    }
  }, [open]);

  if (!product) return null;

  const waveLink = getWavePaymentLink(product.price);
  const orderRef = `CMD-${product.id.toUpperCase()}-${Date.now().toString().slice(-6)}`;

  const whatsappMessage = `Bonjour GAME SHOP 221 👋

Je viens de payer ma commande via Wave :

📦 Produit : ${product.name}
💰 Montant : ${formatPrice(product.price)}
🔑 Réf : ${orderRef}
${playerId ? `🎮 ID Joueur : ${playerId}` : ""}
${customerName ? `👤 Nom : ${customerName}` : ""}

Voici la capture de la transaction Wave. Merci de me livrer 🙏`;

  const whatsappUrl = getWhatsAppLink(whatsappMessage);

  const copyNumber = () => {
    navigator.clipboard.writeText(siteConfig.waveNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{product.emoji}</div>
            <div>
              <DialogTitle className="text-lg text-sky-900">
                Commander : {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm">
                Réf : {orderRef}
              </DialogDescription>
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
          <div>
            <Label htmlFor="customer-name" className="text-sm font-medium">
              Votre nom <span className="text-slate-400">(optionnel)</span>
            </Label>
            <Input
              id="customer-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ex : Mamadou Diop"
              className="mt-1"
            />
          </div>

          {(product.category === "recharges" || product.category === "comptes") && (
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
              <p className="text-xs text-slate-500 mt-1">
                {product.category === "recharges"
                  ? "Indispensable pour la recharge automatique."
                  : "Pour les comptes, on vous contactera pour le transfert sécurisé."}
              </p>
            </div>
          )}
        </div>

        {/* Étapes de paiement Wave */}
        <div className="space-y-3 rounded-xl border-2 border-sky-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sky-900 font-semibold">
            <Waves className="h-5 w-5" />
            Paiement Wave — 3 étapes
          </div>

          <ol className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>
                Cliquez sur <strong>&laquo; Ouvrir Wave &raquo;</strong> ci-dessous
                pour lancer l'app Wave.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>
                Envoyez <strong>{formatPrice(product.price)}</strong> au numéro :
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
                3
              </span>
              <span>
                Faites une capture d'écran du paiement et envoyez-la sur
                WhatsApp en cliquant sur <strong>&laquo; Confirmer sur WhatsApp &raquo;</strong>.
              </span>
            </li>
          </ol>
        </div>

        {/* Garanties */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-sky-600" />
            Livraison : {siteConfig.deliveryTime}
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
            Paiement 100% sécurisé
          </div>
        </div>

        {/* Boutons d'action */}
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <a href={waveLink} className="w-full">
            <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold h-12">
              <Waves className="mr-2 h-5 w-5" />
              Ouvrir Wave — {formatPrice(product.price)}
            </Button>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button
              variant="outline"
              className="w-full border-green-500 text-green-700 hover:bg-green-50 font-semibold h-12"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Confirmer sur WhatsApp
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
