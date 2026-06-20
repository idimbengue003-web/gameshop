"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Waves,
  MessageCircle,
  Instagram,
  Phone,
  Copy,
  Check,
  Clock,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { siteConfig, getWhatsAppLink } from "@/config/site";

export function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contacts = [
    {
      icon: Waves,
      label: "Numéro Wave",
      value: siteConfig.waveNumberDisplay,
      rawValue: siteConfig.waveNumber,
      action: (
        <a href="wave://">
          <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white mt-3">
            <Waves className="mr-2 h-4 w-4" />
            Ouvrir Wave
          </Button>
        </a>
      ),
      color: "from-sky-500 to-cyan-500",
      bgColor: "bg-sky-50",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.whatsappDisplay,
      action: (
        <a
          href={getWhatsAppLink("Bonjour GAME SHOP 221 👋, j'aimerais commander")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="w-full border-green-500 text-green-700 hover:bg-green-50 mt-3"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Discuter sur WhatsApp
          </Button>
        </a>
      ),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: siteConfig.instagramHandle,
      action: (
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="w-full border-pink-500 text-pink-700 hover:bg-pink-50 mt-3"
          >
            <Instagram className="mr-2 h-4 w-4" />
            Voir le profil
          </Button>
        </a>
      ),
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-gradient-to-br from-sky-900 via-sky-800 to-cyan-900 text-white scroll-mt-20 relative overflow-hidden"
    >
      {/* Décor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 backdrop-blur text-sky-100 text-sm font-medium px-3 py-1 rounded-full mb-3 border border-white/20">
            Contact & paiement
          </span>
          <h2 className="text-3xl md:text-4xl font-black">
            Une question ? On est là {siteConfig.supportHours}
          </h2>
          <p className="mt-3 text-sky-100 max-w-2xl mx-auto">
            Contactez-nous sur WhatsApp pour toute commande ou question. Pour
            payer, copiez le numéro Wave et envoyez le montant exact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {contacts.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <Card
                key={i}
                className="bg-white/95 backdrop-blur border-0 p-6 text-slate-900 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {contact.label}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-mono font-bold text-lg text-slate-900">
                      {contact.value}
                    </code>
                    {contact.rawValue && (
                      <button
                        onClick={() =>
                          copyToClipboard(contact.rawValue!, contact.label)
                        }
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Copier"
                      >
                        {copiedField === contact.label ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-slate-500" />
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Disponible {siteConfig.supportHours}
                  </p>
                </div>

                {contact.action}
              </Card>
            );
          })}
        </div>

        {/* Bandeau info */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 text-sky-100">
            <Clock className="h-4 w-4" />
            <span>Livraison : {siteConfig.deliveryTime}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sky-100">
            <Phone className="h-4 w-4" />
            <span>Support : {siteConfig.supportHours}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sky-100">
            <MapPin className="h-4 w-4" />
            <span>Dakar, Sénégal 🇸🇳 — Livraison partout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
