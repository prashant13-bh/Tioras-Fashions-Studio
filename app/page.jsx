"use client";

import { useState, useEffect } from "react";
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
  ChevronRight,
  Sparkles,
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
    image: "https://images.unsplash.com/photo-1511511450040-677116ff389e?auto=format&fit=crop&q=80&w=2070",
    title: "Defining Modern",
    accent: "Luxury.",
    subtitle: "Premium Custom Embroidery & Printing Studio. Your Design, Masterfully Crafted.",
  },
  {
    image: "https://images.unsplash.com/photo-1490578474895-699bc4e35154?auto=format&fit=crop&q=80&w=2071",
    title: "Wear Your",
    accent: "Identity.",
    subtitle: "Upload your vision. We deliver precision on world-class fabrics.",
  },
  {
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=2070",
    title: "Crafted for the",
    accent: "Bold.",
    subtitle: "Sophisticated embroidery and high-definition prints for those who lead.",
  },
];

const testimonials = [
  {
    name: "Arjun M.",
    text: "The embroidery quality is exceptional. It's rare to find this level of precision and premium fabric quality online.",
    role: "Studio Director",
  },
  {
    name: "Priya S.",
    text: "TioraS transformed my digital art into a wearable masterpiece. The service is as premium as the products.",
    role: "Verified Curator",
  },
  {
    name: "Rahul D.",
    text: "The only place for custom apparel that actually feels like high fashion. Highly recommended.",
    role: "Loyal Client",
  },
];

const stats = [
  { label: "Happy Clients", value: "10K+" },
  { label: "Designs Crafted", value: "25K+" },
  { label: "Quality Checks", value: "100%" },
  { label: "Global Reach", value: "24/7" },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIndex((i) => (i + 1) % testimonials.length), 5000);
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
      toast.success("Welcome to the inner circle. Stay inspired.");
      setEmail("");
    }
  };

  const ProductSkeletons = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="aspect-[4/5] rounded-[2rem]" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* ── HERO ── */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroSlides[heroIndex].image})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden md:block" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 mb-8"
              >
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-xs font-black text-white tracking-[0.2em] uppercase">
                  Est. 2024 • Karnataka, India
                </span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-4xl sm:text-7xl md:text-9xl font-black mb-6 text-white leading-[0.9] font-heading tracking-tighter">
                    {heroSlides[heroIndex].title}<br/>
                    <span className="text-accent italic">{heroSlides[heroIndex].accent}</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl mb-12 text-white/80 leading-relaxed max-w-xl font-medium tracking-wide">
                    {heroSlides[heroIndex].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-accent hover:text-accent-foreground font-black px-10 h-16 text-sm uppercase tracking-widest rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
                  >
                    Enter Collections
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-10 h-16 text-sm uppercase tracking-widest rounded-full backdrop-blur-xl transition-all"
                  >
                    Custom Studio
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Hero Navigation Indicators */}
          <div className="absolute bottom-12 right-12 flex flex-col gap-4 z-20">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className="group flex items-center gap-4 text-right"
                aria-label={`Slide ${idx + 1}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-widest transition-all ${idx === heroIndex ? "text-accent" : "text-white/30 group-hover:text-white/60"}`}>
                  0{idx + 1}
                </span>
                <div className={`h-[2px] transition-all duration-500 ${idx === heroIndex ? "w-12 bg-accent" : "w-4 bg-white/20 group-hover:w-8 group-hover:bg-white/40"}`} />
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-12 hidden md:block"
          >
            <div className="w-1 h-24 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    animate={{ y: [0, 96] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-accent rounded-full"
                />
            </div>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-primary text-primary-foreground py-8 md:py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 relative z-10">
                {stats.map((stat, i) => (
                    <div key={i} className="text-center border-r border-white/10 last:border-none">
                        <p className="text-3xl md:text-5xl font-black mb-1 font-heading">{stat.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
        </section>

        {/* ── RUNWAY CATEGORIES ── */}
        <section className="py-32 bg-background overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-24">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
                >
                    <p className="text-accent font-black uppercase tracking-[0.4em] mb-4 text-xs">Curated Selections</p>
                    <h2 className="text-5xl md:text-7xl font-black mb-4 font-heading tracking-tighter leading-none">
                        The Runway <br/><span className="text-muted-foreground italic">Experience.</span>
                    </h2>
                </motion.div>
                <Link href="/products">
                    <Button variant="link" className="text-primary font-black uppercase tracking-widest p-0 group">
                        Discover More <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
          </div>
          
          <div className="flex gap-10 animate-marquee whitespace-nowrap group">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-10">
                {[
                  { name: "Signature Tees", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800", count: "Luxury Finish" },
                  { name: "Urban Hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", count: "Heavyweight" },
                  { name: "Custom Caps", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800", count: "3D Embroidery" },
                  { name: "Classic Sweats", img: "https://images.unsplash.com/photo-1529139513075-03019828b174?auto=format&fit=crop&q=80&w=800", count: "Premium Fleece" },
                  { name: "Elite Jackets", img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800", count: "Bespoke" },
                  { name: "Motion Active", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800", count: "Performance" },
                ].map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={`/products?category=${cat.name.split(' ')[1].toLowerCase()}`} 
                    className="relative w-[280px] sm:w-[350px] md:w-[500px] aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-muted shadow-premium transition-all duration-700 hover:scale-[1.03] inline-block"
                  >
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 text-white text-left">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-3">{cat.count}</p>
                      <h3 className="text-3xl md:text-4xl font-black font-heading tracking-tight uppercase leading-none">{cat.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── CURATED SHOP ── */}
        <section className="py-32 bg-background relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <p className="text-accent font-black uppercase tracking-[0.4em] mb-4 text-xs">Summer Edition</p>
                <h2 className="text-4xl md:text-6xl font-black text-foreground font-heading tracking-tighter leading-none">
                  Season Essentials.
                </h2>
              </div>
              <Link href="/products" className="shrink-0">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-black px-8 h-14 text-xs uppercase tracking-widest rounded-full shadow-xl transition-all"
                >
                  Explore All <ArrowRight className="w-4 h-4 ml-3" />
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
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {products.slice(0, 8).map((product, i) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <ProductCard product={product} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ── THE CRAFT ── */}
        <section className="py-32 bg-secondary text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
                <h2 className="text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap select-none">TIORAS STUDIO</h2>
            </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-premium">
                        <img 
                            src="https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?auto=format&fit=crop&q=80&w=1000" 
                            alt="Embroidery Process" 
                            className="w-full h-[600px] object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/30 rounded-[2rem] -z-10 blur-2xl" />
                    <div className="absolute -top-10 -left-10 w-32 h-32 border-l-4 border-t-4 border-accent -z-10" />
                </motion.div>

                <div>
                    <p className="text-accent font-black uppercase tracking-[0.4em] mb-6 text-xs">Our Expertise</p>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 font-heading tracking-tighter leading-[0.9]">
                        Precision in <br/>Every <span className="text-accent italic">Stitch.</span>
                    </h2>
                    <p className="text-xl text-white/70 mb-12 leading-relaxed">
                        We blend traditional embroidery craftsmanship with modern high-definition printing technology. Every design is treated as a unique piece of art, ensuring durability and vibrant aesthetic appeal.
                    </p>

                    <div className="space-y-8">
                        {[
                            { title: "Museum-Grade Inks", desc: "Eco-friendly, vibrant, and incredibly durable." },
                            { title: "Bespoke Threadwork", desc: "Dense, 3D embroidery with premium silk threads." },
                            { title: "Master Inspection", desc: "Triple-check quality process before packaging." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold mb-1 uppercase tracking-wider">{item.title}</h4>
                                    <p className="text-white/50 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-32 bg-background border-b border-border/40">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-accent font-black uppercase tracking-[0.4em] mb-12 text-xs">Trusted by thousands</p>

            <div className="relative min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <Quote className="w-16 h-16 text-primary/10 mb-10" />
                  <p className="text-2xl md:text-4xl text-foreground font-black mb-12 leading-tight tracking-tighter italic">
                    &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                  </p>
                  <div className="flex flex-col items-center">
                    <p className="font-black text-xl text-foreground uppercase tracking-widest mb-1">
                      {testimonials[testimonialIndex].name}
                    </p>
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-40 bg-background relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 text-foreground font-heading tracking-tighter leading-none">
                Join the <br/><span className="text-accent">Studio.</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-16 max-w-xl mx-auto leading-relaxed">
              Unlock exclusive collections, bespoke inspiration, and secret studio access. 
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                required
                className="bg-white/5 backdrop-blur-xl border-border/80 text-foreground h-14 md:h-20 rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-8 focus-visible:ring-primary shadow-xl text-[10px] md:text-sm font-black tracking-widest uppercase"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground h-14 md:h-20 rounded-[1.5rem] md:rounded-[2rem] px-12 font-black uppercase tracking-[0.2em] shadow-premium transition-all hover:scale-105"
              >
                Subscribe
              </Button>
            </form>
          </div>
          
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 -ml-32" />
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -mr-32" />
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
