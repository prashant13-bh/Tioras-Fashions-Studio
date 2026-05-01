"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck, ArrowRight, ArrowLeft, AlertTriangle, Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export default function CheckoutPage() {
  const { cartItems, getCartTotalCents, clearCart } = useCart();
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();

  const [processing, setProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [address, setAddress] = useState({
    fullName: "", phone: "", street: "", city: "", state: "", zipCode: "", country: "India",
  });

  useEffect(() => {
    if (currentUser) {
      setAddress((a) => ({ ...a, fullName: currentUser.name || "", }));
    }
  }, [currentUser]);

  useEffect(() => {
    loadRazorpayScript();
    if (cartItems.length === 0) {
      toast.info("Your cart is empty");
      router.push("/cart");
    }
  }, [cartItems, router]);

  // FIX: Calculate from cents, not regex-parsed strings (Bug #2)
  const subtotalCents = getCartTotalCents();
  const subtotal = subtotalCents / 100;
  const shippingCost = shippingMethod === "Express" ? 200 : subtotal >= 999 ? 0 : 50;
  const tax = Math.round((subtotal + shippingCost) * 0.18 * 100) / 100;
  const total = subtotal + shippingCost + tax;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddress((a) => ({ ...a, [name]: value }));
  };

  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const isRazorpayConfigured = !!razorpayKeyId;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) { toast.error("Please accept Terms & Conditions"); return; }
    if (!isAuthenticated) { toast.error("Please log in"); router.push("/login?redirect=/checkout"); return; }
    if (!address.street || !address.city || !address.zipCode || !address.phone) { toast.error("Fill all shipping fields"); return; }

    setProcessing(true);

    if (!isRazorpayConfigured) {
      // COD / Test mode
      toast.success("Order placed successfully! (Payment gateway coming soon)");
      clearCart();
      router.push("/order-confirmation/test-order");
      return;
    }

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Payment SDK failed");

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            quantity: item.quantity,
            price: (item.variant.sale_price_in_cents || item.variant.price_in_cents) / 100,
            name: item.product.title,
            image: item.product.image,
            customization: item.product.customization || null,
          })),
          shippingAddress: address, shippingMethod, shippingCost, subtotal, tax, totalAmount: total,
        }),
      });

      if (!res.ok) throw new Error((await res.json()).error || "Order failed");
      const { orderId, razorpayOrderId } = await res.json();

      const rzp = new window.Razorpay({
        key: razorpayKeyId,
        amount: Math.round(total * 100),
        currency: "INR",
        name: "TioraS Fashions Studio",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const vRes = await fetch("/api/orders/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId, razorpayPaymentId: response.razorpay_payment_id, razorpaySignature: response.razorpay_signature }),
            });
            if (!vRes.ok) throw new Error("Verification failed");
            clearCart();
            router.push(`/order-confirmation/${orderId}`);
          } catch (err) { toast.error(err.message); setProcessing(false); }
        },
        prefill: { name: address.fullName, contact: address.phone },
        theme: { color: "hsl(224, 64%, 33%)" },
        modal: { ondismiss: () => { setProcessing(false); toast.info("Payment cancelled"); } },
      });
      rzp.open();
    } catch (err) { toast.error(err.message); setProcessing(false); }
  };

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "tyoras9686@gmail.com";
  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "7353676454";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full mt-20">
        <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary flex items-center mb-6 touch-target"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Cart</Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 font-display">Secure Checkout</h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              {/* Cart Summary */}
              <section className="bg-card p-6 rounded-2xl border border-border/50">
                <h2 className="text-lg font-bold mb-4 font-display">Cart Items ({cartItems.length})</h2>
                <div className="max-h-[200px] overflow-y-auto space-y-3 custom-scrollbar">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-3 items-center bg-muted/20 p-3 rounded-xl border border-border/50">
                      <img src={item.product.image} className="w-12 h-12 rounded object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        {item.product.customization && <p className="text-xs text-primary">📎 {item.product.customization.type}</p>}
                      </div>
                      <p className="text-sm font-bold">₹{((item.variant.sale_price_in_cents || item.variant.price_in_cents) / 100 * item.quantity).toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Shipping */}
              <section className="bg-card p-6 rounded-2xl border border-border/50">
                <h2 className="text-lg font-bold mb-4 font-display">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "fullName", label: "Full Name", span: false },
                    { id: "phone", label: "Phone", type: "tel", span: false },
                    { id: "street", label: "Street Address", span: true },
                    { id: "city", label: "City", span: false },
                    { id: "state", label: "State", span: false },
                    { id: "zipCode", label: "Pincode", span: false },
                  ].map((f) => (
                    <div key={f.id} className={`space-y-1 ${f.span ? "sm:col-span-2" : ""}`}>
                      <Label htmlFor={f.id}>{f.label}</Label>
                      <Input id={f.id} name={f.id} type={f.type || "text"} required value={address[f.id]} onChange={handleInput} className="bg-background touch-target" />
                    </div>
                  ))}
                  <div className="space-y-1"><Label>Country</Label><Input value="India" readOnly className="bg-muted" /></div>
                </div>
              </section>

              {/* Shipping Method */}
              <section className="bg-card p-6 rounded-2xl border border-border/50">
                <h2 className="text-lg font-bold mb-4 font-display">Shipping Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "Standard", label: "Standard (5-7 days)", price: subtotal >= 999 ? "FREE" : "₹50" },
                    { id: "Express", label: "Express (2-3 days)", price: "₹200" },
                  ].map((m) => (
                    <button key={m.id} type="button" onClick={() => setShippingMethod(m.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${shippingMethod === m.id ? "border-primary bg-primary/5" : "border-border/50"}`}>
                      <span className="font-semibold text-sm">{m.label}</span>
                      <span className="text-sm font-bold">{m.price}</span>
                    </button>
                  ))}
                </div>
              </section>

              {!isRazorpayConfigured && (
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-sm text-foreground">
                  <p className="font-bold mb-1">🚧 Payment Gateway Setup in Progress</p>
                  <p className="text-muted-foreground">Orders will be placed in test mode. You&apos;ll be contacted for payment confirmation.</p>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border/50 rounded-2xl p-6 sticky top-28 space-y-6">
                <h2 className="text-lg font-bold font-display">Order Summary</h2>
                <div className="space-y-3 text-sm border-b border-border/50 pb-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">₹{subtotal.toFixed(0)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-medium">{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span className="font-medium">₹{tax.toFixed(0)}</span></div>
                  <div className="flex justify-between text-xl font-bold pt-2"><span>Total</span><span className="text-primary">₹{total.toFixed(0)}</span></div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
                    <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} className="mt-0.5 min-w-[20px] min-h-[20px]" />
                    <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                      I agree to the <Link href="/terms-conditions" target="_blank" className="text-primary hover:underline">Terms</Link> and <Link href="/privacy-policy" target="_blank" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button type="submit" disabled={processing || !agreedToTerms} className="w-full h-14 text-lg font-bold rounded-xl gradient-primary text-white shadow-lg disabled:opacity-50">
                    {processing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : <>Place Order <ArrowRight className="w-5 h-5 ml-2" /></>}
                  </Button>

                  {!agreedToTerms && <p className="text-xs text-destructive text-center flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3" /> Accept terms to proceed</p>}
                </div>

                <div className="bg-muted/30 rounded-xl p-4 text-xs space-y-2">
                  <h4 className="font-bold text-sm">Need Help?</h4>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /><a href={`mailto:${supportEmail}`} className="text-primary hover:underline">{supportEmail}</a></div>
                  <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /><a href={`tel:${supportPhone}`} className="text-primary hover:underline">{supportPhone}</a></div>
                  <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /><a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917353676454"}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
