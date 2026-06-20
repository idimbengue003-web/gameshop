"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Waves,
  ShieldCheck,
  Clock,
  Zap,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50 border-b border-sky-100">
      {/* Décor cercles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl py-12 md:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Colonne texte */}
          <div className="text-center lg:text-left">
            <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100 mb-4 px-3 py-1.5">
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Boutique gaming n°1 au Sénégal
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              Comptes, UC & cartes{" "}
              <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                cadeaux gaming
              </span>{" "}
              au meilleur prix
            </h1>

            <p className="mt-5 text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              Recharges PUBG, Free Fire, Valorant. Comptes Fortnite, GTA, COD.
              Cartes Steam, Google Play, PSN, Netflix. Paiement Wave,
              livraison en {siteConfig.deliveryTime}.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onExplore}
                className="bg-sky-600 hover:bg-sky-700 text-white h-13 px-7 text-base"
              >
                Voir les offres
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50 h-13 px-7 text-base w-full sm:w-auto"
                >
                  Commander sur WhatsApp
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sky-700">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-bold">5-30 min</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Livraison</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-sm font-bold">100%</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Sécurisé</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sky-700">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-bold">2 000+</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Clients satisfaits</p>
              </div>
            </div>
          </div>

          {/* Colonne visuelle */}
          <div className="relative">
            <div className="relative grid grid-cols-2 gap-3 max-w-md mx-auto">
              {/* Cards flottantes */}
              <div className="space-y-3">
                <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-4 transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-3xl mb-2">💎</div>
                  <div className="text-xs font-bold text-slate-900">325 UC</div>
                  <div className="text-xs text-slate-500">PUBG Mobile</div>
                  <div className="text-sm font-black text-sky-700 mt-1">5 000 FCFA</div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-4 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-3xl mb-2">🎮</div>
                  <div className="text-xs font-bold text-slate-900">Carte Steam</div>
                  <div className="text-xs text-slate-500">25€</div>
                  <div className="text-sm font-black text-sky-700 mt-1">17 000 FCFA</div>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-4 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-xs font-bold text-slate-900">310 Diamants</div>
                  <div className="text-xs text-slate-500">Free Fire</div>
                  <div className="text-sm font-black text-sky-700 mt-1">4 000 FCFA</div>
                </div>
                <div className="bg-gradient-to-br from-sky-600 to-cyan-600 rounded-2xl shadow-lg p-4 text-white transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-xs font-bold">Compte Fortnite</div>
                  <div className="text-xs text-sky-100">Skins rares</div>
                  <div className="text-sm font-black mt-1">25 000 FCFA</div>
                </div>
              </div>

              {/* Badge Wave flottant */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-full shadow-xl border border-sky-200 px-4 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center">
                  <Waves className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Paiement</div>
                  <div className="text-xs text-sky-700 font-black">Wave</div>
                </div>
              </div>

              {/* Badge best-seller flottant */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-xl px-3 py-2 flex items-center gap-1.5 text-white">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs font-bold">#1 Sénégal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
