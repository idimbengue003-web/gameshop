"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves, MessageCircle, Instagram } from "lucide-react";
import { siteConfig, getWhatsAppLink } from "@/config/site";

interface HeaderProps {
  onOrderClick?: () => void;
}

export function Header({ onOrderClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Produits", href: "#produits" },
    { label: "Comment commander", href: "#guide" },
    { label: "Pourquoi nous", href: "#pourquoi" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-sky-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.svg"
              alt="GAME SHOP 221"
              className="h-9 md:h-11 w-auto"
            />
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-sky-700 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-pink-50 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-slate-700 hover:text-pink-600" />
            </a>
            <a
              href={getWhatsAppLink("Bonjour GAME SHOP 221 👋")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-green-500 text-green-700 hover:bg-green-50"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <a href="#produits">
              <Button
                size="sm"
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                <Waves className="mr-1.5 h-4 w-4" />
                Commander
              </Button>
            </a>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-sky-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-sky-100 pt-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-sky-700 font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 px-4 flex flex-col gap-2">
              <a
                href={getWhatsAppLink("Bonjour GAME SHOP 221 👋")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-700 hover:bg-green-50"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
              <a href="#produits" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                  <Waves className="mr-2 h-4 w-4" />
                  Commander
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
