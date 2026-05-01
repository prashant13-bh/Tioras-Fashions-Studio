"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading">About TioraS Fashions</h1>
              <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed">We are a premium embroidery and custom printing studio based in Karnataka, India. Our mission is to help you wear your creativity with confidence.</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-6 font-heading">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>TioraS Fashions Studio started with a simple idea: everyone should be able to express their individuality through custom apparel without compromising on quality.</p>
                <p>We combine professional-grade embroidery machines and advanced printing technology with premium blank apparel to create custom clothing that looks and feels exceptional.</p>
                <p>Whether it&apos;s a custom logo for your business, a unique design for an event, or personalized gifts — we bring your vision to life with precision and care.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Quality First", desc: "Premium fabrics and professional equipment" },
                { icon: Users, title: "500+ Customers", desc: "Trusted by businesses and individuals" },
                { icon: Zap, title: "Fast Delivery", desc: "3-5 business day turnaround" },
                { icon: Heart, title: "Made with Love", desc: "Every piece is crafted with care" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-muted/30 border border-border/50 text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
