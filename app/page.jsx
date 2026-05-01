"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Truck,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Zap,
  Quote,
  Flame,
  Mail,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getProducts } from "@/lib/ecommerce-api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProductCard from "@/components/ProductCard";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1511511450040-677116ff389e?auto=format&fit=crop&q=80&w=2070",
    title: "TioraS Fashions Studio",
    subtitle: "Premium Custom Embroidery & Printing — Your Design, Your Style.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490578474895-699bc4e35154?auto=format&fit=crop&q=80&w=2071",
    title: "Upload. Customize. Wear.",
    subtitle: "Upload your design and we'll print or embroider it on premium apparel.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=2070",
    title: "Crafted With Precision.",
    subtitle: "From custom T-shirts to embroidered hoodies — quality you can feel.",
  },
];

const testimonials = [
  {
    name: "Arjun M.",
    text: "The embroidery quality is amazing. My company logos look incredibly professional on the polo shirts.",
    role: "Business Owner",
  },
  {
    name: "Priya S.",
    text: "Uploaded my artwork and got a perfectly printed hoodie in just 5 days. Will order again!",
    role: "Verified Buyer",
  },
  {
    name: "Rahul D.",
    text: "Best custom printing service in Karnataka. Premium fabric and the colors are vibrant.",
    role: "Repeat Customer",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setHeroIndex((i) => (i + 1) % heroSlides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setTestimonialIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ limit: "12" });
        setProducts(res.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: Save to PocketBase newsletter collection
      toast.success("Welcome! You'll receive our latest updates.");
      setEmail("");
    }
  };

  const ProductSkeletons = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-16 md:pt-20">
        {/* ── HERO ── */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-secondary">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroSlides[heroIndex].image})`,
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md border border-accent/30 rounded-full px-4 py-1.5 mb-6"
              >
                <Upload className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-white tracking-wide uppercase">
                  Upload Your Design Today
                </span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 text-white leading-[1.1] font-heading">
                    {heroSlides[heroIndex].title}
                  </h1>
                  <p className="text-lg sm:text-2xl mb-10 text-white/80 leading-relaxed max-w-xl font-medium">
                    {heroSlides[heroIndex].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gradient-primary text-white font-bold px-8 h-14 text-lg rounded-xl shadow-lg touch-target"
                  >
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-secondary px-8 h-14 text-lg rounded-xl bg-white/5 backdrop-blur-sm touch-target"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 flex gap-2 z-20">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === heroIndex
                      ? "w-8 bg-primary"
                      : "w-4 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-2 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORIES (Auto-Sliding Carousel) ── */}
        <section className="py-24 bg-background overflow-hidden relative">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="max-w-7xl mx-auto px-4 mb-16 relative z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-6xl font-extrabold mb-4 font-heading tracking-tight italic">Explore Collections</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Discover premium apparel designed for customization and style.</p>
            </motion.div>
          </div>
          
          <div className="flex gap-6 animate-marquee whitespace-nowrap group">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-6">
                {[
                  { name: "T-Shirts", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800", count: "120+ Items" },
                  { name: "Hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", count: "85+ Items" },
                  { name: "Caps", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800", count: "40+ Items" },
                  { name: "Sweatshirts", img: "https://images.unsplash.com/photo-1529139513075-03019828b174?auto=format&fit=crop&q=80&w=800", count: "60+ Items" },
                  { name: "Jackets", img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800", count: "30+ Items" },
                  { name: "Activewear", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800", count: "50+ Items" },
                ].map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={`/products?category=${cat.name.toLowerCase()}`} 
                    className="relative w-[300px] md:w-[400px] aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted shadow-lg transition-all duration-500 hover:scale-[1.02] inline-block"
                  >
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white text-left">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-2">{cat.count}</p>
                      <h3 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">{cat.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-border/50 pb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-foreground flex items-center gap-3 font-heading">
                  Featured Products <Flame className="w-8 h-8 text-accent" />
                </h2>
                <p className="text-muted-foreground text-lg">
                  Premium apparel ready for your custom designs.
                </p>
              </div>
              <Link href="/products" className="hidden md:block shrink-0">
                <Button
                  variant="ghost"
                  className="hover:bg-muted rounded-xl font-bold px-6 touch-target text-primary"
                >
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {loading ? (
              <ProductSkeletons />
            ) : (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {products.slice(0, 8).map((product, i) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <ProductCard product={product} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="md:hidden text-center mt-8">
              <Link href="/products">
                <Button className="gradient-primary text-white rounded-xl px-8 h-12 font-bold">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 bg-muted/30 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground font-heading">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Get your custom apparel in 3 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose Your Product",
                  desc: "Browse our collection of premium T-shirts, hoodies, caps, and more.",
                  icon: "🛍️",
                },
                {
                  step: "2",
                  title: "Upload Your Design",
                  desc: "Upload your logo, artwork, or image. Choose print or embroidery.",
                  icon: "📤",
                },
                {
                  step: "3",
                  title: "We Deliver",
                  desc: "We craft your custom piece and ship it to your doorstep.",
                  icon: "🚚",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-3xl bg-background border border-border/50 shadow-subtle"
                >
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-24 bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 font-heading">
                Why TioraS Fashions?
              </h2>
              <p className="text-secondary-foreground/80 text-lg">
                Quality craftsmanship meets modern technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-secondary-foreground/5 rounded-3xl p-8 md:p-12 border border-secondary-foreground/10 hover:bg-secondary-foreground/10 transition-colors">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-heading">
                  Premium Quality Guaranteed
                </h3>
                <p className="text-secondary-foreground/70 text-lg max-w-md leading-relaxed">
                  We use only premium fabrics and professional-grade printing &
                  embroidery equipment. Every piece passes quality inspection.
                </p>
              </div>

              <div className="bg-secondary-foreground/5 rounded-3xl p-8 border border-secondary-foreground/10 hover:bg-secondary-foreground/10 transition-colors">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading">
                  Fast Turnaround
                </h3>
                <p className="text-secondary-foreground/70 leading-relaxed">
                  Most orders ship within 3-5 business days. Express options available.
                </p>
              </div>

              <div className="bg-secondary-foreground/5 rounded-3xl p-8 border border-secondary-foreground/10 hover:bg-secondary-foreground/10 transition-colors">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading">
                  Free Shipping
                </h3>
                <p className="text-secondary-foreground/70 leading-relaxed">
                  Free delivery across India on orders above ₹999. Track your order in real-time.
                </p>
              </div>

              <div className="lg:col-span-2 bg-secondary-foreground/5 rounded-3xl p-8 border border-secondary-foreground/10 hover:bg-secondary-foreground/10 transition-colors">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading">
                  Easy Returns
                </h3>
                <p className="text-secondary-foreground/70 leading-relaxed">
                  Not satisfied? We offer hassle-free 7-day returns for unworn items in original condition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-16 text-foreground font-heading">
              What Our Customers Say
            </h2>

            <div className="relative h-[250px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <Quote className="w-12 h-12 text-primary/20 mb-6" />
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-foreground font-medium mb-8 leading-relaxed px-4">
                    &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="font-extrabold text-foreground">
                      {testimonials[testimonialIndex].name}
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <p className="text-sm font-bold text-primary uppercase tracking-wider">
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === testimonialIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-24 bg-gradient-to-b from-muted/50 to-muted/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground font-heading">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Get exclusive offers, new product launches, and custom design
              inspiration delivered to your inbox.
            </p>
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="bg-background border-border/80 text-foreground h-14 rounded-xl px-6 focus-visible:ring-primary shadow-sm text-base"
              />
              <Button
                type="submit"
                className="gradient-primary text-white h-14 rounded-xl px-8 font-bold shrink-0 touch-target shadow-md"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
