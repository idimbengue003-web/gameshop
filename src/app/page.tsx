"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ProductsSection } from "@/components/site/products";
import { OrderGuide } from "@/components/site/order-guide";
import { WhyUs } from "@/components/site/why-us";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { OrderModal } from "@/components/site/order-modal";
import { OrderTracking } from "@/components/site/order-tracking";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminPanel } from "@/components/admin/admin-panel";
import { Product } from "@/data/products";

type View = "site" | "tracking" | "admin-login" | "admin";

export default function Home() {
  const [view, setView] = useState<View>("site");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Gestion des hashes: #admin, #suivi
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      const isAdminAuthed = sessionStorage.getItem("gs221_admin") === "1";

      if (hash.startsWith("#admin")) {
        setView(isAdminAuthed ? "admin" : "admin-login");
      } else if (hash.startsWith("#suivi")) {
        setView("tracking");
      } else {
        setView("site");
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const goToAdmin = () => {
    window.location.hash = "#admin";
  };

  const goToTracking = () => {
    window.location.hash = "#suivi";
  };

  const exitToSite = () => {
    window.location.hash = "";
    setView("site");
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("gs221_admin");
    exitToSite();
  };

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const scrollToProducts = () => {
    const el = document.getElementById("produits");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ========== VUE SUIVI COMMANDE ==========
  if (view === "tracking") {
    return <OrderTracking onBack={exitToSite} />;
  }

  // ========== VUE ADMIN LOGIN ==========
  if (view === "admin-login") {
    return <AdminLogin onSuccess={() => setView("admin")} onBack={exitToSite} />;
  }

  // ========== VUE ADMIN PANEL ==========
  if (view === "admin") {
    return <AdminPanel onLogout={handleAdminLogout} onExitToSite={exitToSite} />;
  }

  // ========== VUE SITE CLIENT ==========
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onOrderClick={scrollToProducts} />

      <main className="flex-1">
        <Hero onExplore={scrollToProducts} />

        <div ref={productsRef}>
          <ProductsSection onOrder={handleOrder} />
        </div>

        <OrderGuide />
        <WhyUs />

        {/* Bandeau suivi commande */}
        <section className="py-8 bg-gradient-to-r from-sky-50 to-cyan-50 border-t border-sky-100">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <p className="text-sm text-slate-600 mb-3">
              🔍 Vous avez déjà commandé ? Suivez l'état de votre commande et
              récupérez votre contenu livré.
            </p>
            <button
              onClick={goToTracking}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-medium transition-colors"
            >
              Suivre ma commande →
            </button>
          </div>
        </section>

        <Contact />
      </main>

      <Footer onAdminClick={goToAdmin} />

      <OrderModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
