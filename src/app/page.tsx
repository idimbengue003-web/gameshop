"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { ProductsSection } from "@/components/site/products";
import { OrderGuide } from "@/components/site/order-guide";
import { WhyUs } from "@/components/site/why-us";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { OrderModal } from "@/components/site/order-modal";
import { Product } from "@/data/products";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

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

      <Footer />

      <OrderModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
