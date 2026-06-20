"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Waves,
  Instagram,
  Phone,
  Copy,
  Check,
  Clock,
  MapPin,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyWaveNumber = () => {
    navigator.clipboard.writeText(siteConfig.waveNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            Pour payer, copiez le numéro Wave et envoyez le montant exact. Pour
            toute question, contactez-nous sur Instagram.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Wave */}
          <Card className="bg-white/95 backdrop-blur border-0 p-6 text-slate-900 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-md">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Paiement Wave
              </span>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between gap-2">
                <code className="font-mono font-bold text-lg text-slate-900">
                  {siteConfig.waveNumberDisplay}
                </code>
                <button
                  onClick={copyWaveNumber}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Copier le numéro Wave"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Disponible {siteConfig.supportHours}
              </p>
            </div>

            <a href="wave://" className="block mt-3">
              <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <Waves className="mr-2 h-4 w-4" />
                Ouvrir Wave
              </Button>
            </a>
          </Card>

          {/* Instagram */}
          <Card className="bg-white/95 backdrop-blur border-0 p-6 text-slate-900 hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                <Instagram className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Réseau social
              </span>
            </div>

            <div className="mt-2">
              <code className="font-mono font-bold text-lg text-slate-900">
                {siteConfig.instagramHandle}
              </code>
              <p className="text-xs text-slate-500 mt-1">
                Suivez-nous, nouveautés & promos chaque semaine
              </p>
            </div>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3"
            >
              <Button
                variant="outline"
                className="w-full border-pink-500 text-pink-700 hover:bg-pink-50"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Voir le profil Instagram
              </Button>
            </a>
          </Card>
        </div>

        {/* Bandeau info */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 text-sky-100">
            <Clock className="h-4 w-4" />
            <span>Livraison auto : 0-5 min ⚡</span>
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
