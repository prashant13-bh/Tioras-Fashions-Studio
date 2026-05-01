"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getProduct, formatCurrency } from "@/lib/ecommerce-api";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/contexts/WishlistContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FileUploader from "@/components/FileUploader";

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customization, setCustomization] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(params.id);
        setProduct(data);
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 mt-20">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 font-heading">Product Not Found</h1>
            <Link href="/products">
              <Button className="rounded-xl">Back to Shop</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length
    ? product.images.map((img) => img.url)
    : [product.image || "/placeholder.svg"];

  const price = selectedVariant
    ? selectedVariant.sale_price_formatted || selectedVariant.price_formatted
    : `₹${(product.price_in_cents / 100).toFixed(0)}`;

  const originalPrice = selectedVariant?.sale_price_in_cents
    ? selectedVariant.price_formatted
    : null;

  const isOutOfStock =
    selectedVariant?.manage_inventory &&
    selectedVariant?.inventory_quantity === 0;

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    if (!selectedVariant || isOutOfStock) return;
    try {
      await addToCart(
        { ...product, customization },
        selectedVariant,
        quantity,
        selectedVariant.inventory_quantity
      );
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{product.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((i) =>
                          i === 0 ? images.length - 1 : i - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md touch-target"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((i) =>
                          i === images.length - 1 ? 0 : i + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md touch-target"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground font-heading mb-2">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-muted-foreground">{product.subtitle}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-primary">
                  {price}
                </span>
                {originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {originalPrice}
                  </span>
                )}
                {isOutOfStock && (
                  <span className="text-sm font-bold text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              <Separator />

              {/* Variant Selector */}
              {product.options?.length > 0 && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.id}>
                      <label className="text-sm font-bold text-foreground mb-2 block">
                        {option.title}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((val) => {
                          const variant = product.variants.find(
                            (v) =>
                              v.options.some(
                                (o) =>
                                  o.option_id === option.id &&
                                  o.value === val.value
                              )
                          );
                          const isSelected =
                            selectedVariant?.id === variant?.id;
                          return (
                            <button
                              key={val.id}
                              onClick={() => variant && setSelectedVariant(variant)}
                              className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all touch-target ${
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border/50 hover:border-primary/30"
                              }`}
                            >
                              {val.value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-sm font-bold text-foreground mb-2 block">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border/60 rounded-xl bg-background">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-10 w-10 rounded-l-xl"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="h-10 w-10 rounded-r-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* ✨ FILE UPLOAD - Replaces Design Studio */}
              <FileUploader
                onFileSelect={(data) => setCustomization(data)}
                onClear={() => setCustomization(null)}
              />

              <Separator />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 h-14 text-lg font-bold rounded-xl gradient-primary text-white shadow-md touch-target"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  variant="outline"
                  className="flex-1 h-14 text-lg font-bold rounded-xl border-primary text-primary hover:bg-primary/5 touch-target"
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className="h-14 w-14 rounded-xl shrink-0 touch-target"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlisted ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                {[
                  { icon: Truck, label: "Free Shipping 999+" },
                  { icon: ShieldCheck, label: "Secure Payment" },
                  { icon: RefreshCw, label: "7-Day Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center p-3 rounded-xl bg-muted/30"
                  >
                    <Icon className="w-5 h-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-4">
                  <h3 className="text-lg font-bold mb-3 font-heading">
                    Description
                  </h3>
                  <div
                    className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {/* Additional Info */}
              {product.additional_info?.length > 0 && (
                <div className="space-y-4 pt-4">
                  {product.additional_info.map((info) => (
                    <div key={info.id}>
                      <h3 className="text-sm font-bold mb-2">{info.title}</h3>
                      <div
                        className="text-sm text-muted-foreground prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: info.description }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
