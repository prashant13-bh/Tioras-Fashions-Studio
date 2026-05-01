"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const variant = product.variants?.[0];
  const priceFormatted =
    variant?.sale_price_formatted ||
    variant?.price_formatted ||
    `₹${((product.price_in_cents || 0) / 100).toFixed(0)}`;
  const originalPrice = variant?.sale_price_in_cents
    ? variant?.price_formatted
    : null;
  const image = product.image || product.images?.[0]?.url || "/placeholder.svg";
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    try {
      await addToCart(product, variant, 1, variant.inventory_quantity);
      toast.success(`${product.title} added to cart`);
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const isOutOfStock =
    variant?.manage_inventory && variant?.inventory_quantity === 0;

  return (
    <div className="premium-card flex flex-col h-full group bg-card overflow-hidden">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden block"
      >
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.ribbon_text && (
            <span className="badge-accent">{product.ribbon_text}</span>
          )}
          {originalPrice && !isOutOfStock && (
            <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
          <Button 
            size="icon" 
            className="rounded-full bg-white text-primary hover:bg-accent hover:text-accent-foreground scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Link href={`/products/${product.id}`} passHref>
            <Button size="icon" className="rounded-full bg-white text-primary hover:bg-accent hover:text-accent-foreground scale-90 group-hover:scale-100 transition-all duration-300 delay-75 shadow-xl">
              <Eye className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 z-10 ${
            wishlisted ? "bg-rose-500 text-white" : "bg-white/80 backdrop-blur-md text-muted-foreground hover:text-rose-500"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`}
          />
        </button>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow text-center">
        <div className="mb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {product.subtitle || "Premium Apparel"}
            </p>
            <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            <h4 className="text-lg font-bold line-clamp-1 leading-tight font-heading">
                {product.title}
            </h4>
            </Link>
        </div>

        <div className="mt-auto pt-4 flex flex-col items-center gap-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-black text-foreground">
              {priceFormatted}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through opacity-50">
                {originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 mt-1 text-accent">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
            ))}
            <span className="text-[10px] font-bold text-muted-foreground ml-1">(4.9)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
