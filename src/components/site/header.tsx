"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves, Instagram, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

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
          {/* Logo stylé */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <img
                src="/logo/gameshop221.jpg"
                alt="GAME SHOP 221"
                className="relative h-11 w-11 md:h-14 md:w-14 rounded-xl object-cover shadow-md ring-2 ring-sky-200"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-black bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                GAME SHOP
              </span>
              <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-[0.3em] mt-0.5">
                2 2 1
              </span>
            </div>
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
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full border-pink-500 text-pink-700 hover:bg-pink-50"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
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
