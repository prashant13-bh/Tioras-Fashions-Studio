"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight, Truck, Mail, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OrderConfirmationPage() {
  const params = useParams();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (params.id) setOrderId(params.id);
  }, [params.id]);

  const isTest = orderId.includes("test");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-card border border-border/50 rounded-3xl p-8 md:p-12 text-center shadow-premium"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for choosing TioraS Fashions Studio. Your order is now in our studio.
          </p>

          <div className="bg-muted/30 rounded-2xl p-6 mb-10 border border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Order Number</p>
              <p className="text-2xl font-extrabold text-foreground">#{orderId}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl h-12" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" /> Print Receipt
              </Button>
            </div>
          </div>

          {isTest && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-10 text-sm text-foreground text-left">
              <p className="font-bold mb-1">⚠️ Test Order Placed</p>
              <p className="text-muted-foreground">Since Razorpay is in test mode, your order has been registered as a request. Our team will contact you on WhatsApp/Email for payment confirmation before production starts.</p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4 text-left p-4 rounded-xl hover:bg-muted/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Shipping Updates</h4>
                <p className="text-sm text-muted-foreground">You&apos;ll receive a tracking link via email once your custom piece is shipped.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-left p-4 rounded-xl hover:bg-muted/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Confirmation Sent</h4>
                <p className="text-sm text-muted-foreground">A detailed receipt and design summary has been sent to your registered email.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="flex-1">
              <Button className="w-full h-14 rounded-xl gradient-primary text-white font-bold text-lg shadow-lg">
                Continue Shopping <ShoppingBag className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/account" className="flex-1">
              <Button variant="outline" className="w-full h-14 rounded-xl border-border/60 font-bold text-lg">
                View My Account <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
