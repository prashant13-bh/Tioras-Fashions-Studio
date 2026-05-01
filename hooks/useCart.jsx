"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { formatCurrency } from "@/lib/ecommerce-api";

const CartContext = createContext();
const CART_STORAGE_KEY = "tioras-cart";

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setCartItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    (product, variant, quantity, availableQuantity) => {
      return new Promise((resolve, reject) => {
        if (variant.manage_inventory) {
          const existing = cartItems.find(
            (item) => item.variant.id === variant.id
          );
          const currentQty = existing ? existing.quantity : 0;
          if (currentQty + quantity > availableQuantity) {
            reject(
              new Error(
                `Not enough stock for ${product.title} (${variant.title}). Only ${availableQuantity} left.`
              )
            );
            return;
          }
        }

        setCartItems((prev) => {
          const existing = prev.find((item) => item.variant.id === variant.id);
          if (existing) {
            return prev.map((item) =>
              item.variant.id === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { product, variant, quantity }];
        });
        resolve();
      });
    },
    [cartItems]
  );

  const removeFromCart = useCallback((variantId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.variant.id !== variantId)
    );
  }, []);

  const updateQuantity = useCallback((variantId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // FIX: getCartTotal now handles empty cart without crashing
  const getCartTotal = useCallback(() => {
    if (cartItems.length === 0) return "₹0.00";
    return formatCurrency(
      cartItems.reduce((total, item) => {
        const price =
          item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
        return total + price * item.quantity;
      }, 0),
      cartItems[0]?.variant?.currency_info
    );
  }, [cartItems]);

  // NEW: Get raw total in cents (for checkout calculations)
  const getCartTotalCents = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price =
        item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartTotalCents,
    }),
    [
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartTotalCents,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
