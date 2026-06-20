"use client";

import { Waves, Instagram, Heart, Settings } from "lucide-react";
import { siteConfig } from "@/config/site";

interface FooterProps {
  onAdminClick?: () => void;
}

export function Footer({ onAdminClick }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo/gameshop221.jpg"
                alt="GAME SHOP 221"
                className="h-11 w-11 rounded-xl object-cover ring-2 ring-slate-700"
              />
              <div className="leading-none">
                <div className="text-lg font-black bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  GAME SHOP
                </div>
                <div className="text-[10px] font-bold text-slate-500 tracking-[0.3em] mt-1">
                  2 2 1
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-2 mt-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="wave://"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-600 flex items-center justify-center transition-colors"
                aria-label="Wave"
              >
                <Waves className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#produits" className="hover:text-sky-400 transition-colors">
                  Produits
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-sky-400 transition-colors">
                  Comment commander
                </a>
              </li>
              <li>
                <a href="#pourquoi" className="hover:text-sky-400 transition-colors">
                  Pourquoi nous choisir
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact rapide */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-sky-400" />
                <span>Wave : {siteConfig.waveNumberDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>{siteConfig.instagramHandle}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5">
              Fait avec <Heart className="h-3.5 w-3.5 text-red-500 fill-current" /> au Sénégal 🇸🇳
            </p>
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
              title="Accès admin"
            >
              <Settings className="h-3.5 w-3.5" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
