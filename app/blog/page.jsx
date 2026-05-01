"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    title: "The Art of Embroidery: Why It's Making a Comeback",
    excerpt: "Discover the history and modern resurgence of embroidery in the fashion world and why it's the premium choice for custom apparel.",
    date: "April 15, 2024",
    author: "Admin",
    category: "Fashion Trends",
    image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "DTG vs Screen Printing: Which One Should You Choose?",
    excerpt: "We break down the pros and cons of Direct-to-Garment and Screen Printing to help you choose the best method for your designs.",
    date: "April 10, 2024",
    author: "Admin",
    category: "Guides",
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "5 Tips for Creating the Perfect Custom T-Shirt Logo",
    excerpt: "Design tips to ensure your logo looks sharp and professional when printed or embroidered on clothing.",
    date: "April 05, 2024",
    author: "Admin",
    category: "Design Tips",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">TioraS Stories</h1>
            <p className="text-lg text-muted-foreground">Insights into custom fashion, design guides, and studio updates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.article 
                key={post.id}
                whileHover={{ y: -5 }}
                className="premium-card flex flex-col h-full group"
              >
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Button variant="ghost" className="p-0 h-auto font-bold text-primary hover:bg-transparent group/btn">
                      Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
