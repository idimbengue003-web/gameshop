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
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminPanel } from "@/components/admin/admin-panel";
import { Product } from "@/data/products";

type View = "site" | "admin-login" | "admin";

export default function Home() {
  const [view, setView] = useState<View>("site");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Gestion du hash #admin
  useEffect(() => {
    const checkHash = () => {
      const isHashAdmin = window.location.hash === "#admin";
      const isAdminAuthed = sessionStorage.getItem("gs221_admin") === "1";
      if (isHashAdmin) {
        setView(isAdminAuthed ? "admin" : "admin-login");
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

  const exitAdmin = () => {
    window.location.hash = "";
    setView("site");
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("gs221_admin");
    exitAdmin();
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

  // ========== VUE ADMIN LOGIN ==========
  if (view === "admin-login") {
    return (
      <AdminLogin
        onSuccess={() => setView("admin")}
        onBack={exitAdmin}
      />
    );
  }

  // ========== VUE ADMIN PANEL ==========
  if (view === "admin") {
    return (
      <AdminPanel onLogout={handleAdminLogout} onExitToSite={exitAdmin} />
    );
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
