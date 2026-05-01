"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, getCategories } from "@/lib/ecommerce-api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProductCard from "@/components/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all");
  const [sortBy, setSortBy] = useState("order");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getProducts({ limit: "50" }),
          getCategories(),
        ]);
        setProducts(prodRes.products || []);
        setCategories(catRes.categories || []);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory === "all") return true;
      return p.collections?.some((c) => c.collection_id === selectedCategory);
    })
    .sort((a, b) => {
      if (sortBy === "price_low") return a.price_in_cents - b.price_in_cents;
      if (sortBy === "price_high") return b.price_in_cents - a.price_in_cents;
      if (sortBy === "newest") return new Date(b.updated_at) - new Date(a.updated_at);
      return a.order - b.order;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground font-heading">
          Shop All Products
        </h1>
        <p className="text-muted-foreground mt-2">
          {loading ? "Loading..." : `${filteredProducts.length} products available`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-border/50">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
          className="rounded-full text-sm"
        >
          All Products
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className="rounded-full text-sm"
          >
            {cat.title}
          </Button>
        ))}

        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary"
          >
            <option value="order">Featured</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground mb-4">No products found</p>
          <Button onClick={() => setSelectedCategory("all")} variant="outline" className="rounded-xl">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        <Suspense fallback={<div className="p-20 text-center">Loading Store...</div>}>
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
