"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

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

  // Stock check
  const isOutOfStock =
    variant?.manage_inventory && variant?.inventory_quantity === 0;

  return (
    <div className="premium-card flex flex-col h-full group">
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-muted rounded-t-2xl block"
      >
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        {product.ribbon_text && (
          <div className="absolute top-3 left-3">
            <span className="badge-accent">{product.ribbon_text}</span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="bg-destructive text-white px-4 py-2 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <Button variant="secondary" className="bg-white/90 text-primary font-bold rounded-full px-6 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </Button>
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform hover:scale-110 z-10 touch-target"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 ${
              wishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
          <h4 className="text-base font-bold mb-1 line-clamp-2 leading-snug font-heading">
            {product.title}
          </h4>
        </Link>

        {product.subtitle && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {product.subtitle}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-foreground">
              {priceFormatted}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {originalPrice}
              </span>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-bold px-4"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
