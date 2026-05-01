"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground opacity-50" />
            <h2 className="text-3xl font-bold mb-4 font-display">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Link href="/products">
              <Button className="gradient-primary text-white rounded-xl px-8 h-12 text-lg font-bold">Continue Shopping</Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full mt-16 md:mt-20">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 font-display">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.variant.id} className="premium-card p-6 hover:translate-y-0">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                    <img src={item.product.image || "/placeholder.svg"} alt={item.product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-foreground font-display truncate">{item.product.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.variant.title}</p>
                        {item.product.customization && <p className="text-xs text-primary mt-1">📎 Custom design ({item.product.customization.type})</p>}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.variant.id)} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 className="h-5 w-5" /></Button>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border/60 rounded-xl">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} className="h-9 w-9"><Minus className="h-4 w-4" /></Button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} className="h-9 w-9"><Plus className="h-4 w-4" /></Button>
                      </div>
                      <p className="text-xl font-bold text-primary">{item.variant.sale_price_formatted || item.variant.price_formatted}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="premium-card p-8 space-y-6 sticky top-28 hover:translate-y-0">
              <h3 className="text-2xl font-bold font-display">Order Summary</h3>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Items ({cartItems.reduce((a, i) => a + i.quantity, 0)})</span><span className="font-medium">{getCartTotal()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping & Tax</span><span className="text-muted-foreground">At checkout</span></div>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold"><span>Total</span><span className="text-primary">{getCartTotal()}</span></div>
              <div className="pt-2 space-y-3">
                <Link href="/checkout"><Button className="w-full gradient-primary text-white h-14 text-lg rounded-xl font-bold">Proceed to Checkout</Button></Link>
                <Link href="/products"><Button variant="outline" className="w-full h-12 rounded-xl">Continue Shopping</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
