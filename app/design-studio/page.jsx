"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DesignCanvas from "@/components/DesignStudio/DesignCanvas";
import { 
  Tshirt, 
  ShoppingBag, 
  Info, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function DesignStudioPage() {
  const [clothType, setClothType] = useState("Premium Hoodie");
  const [clothColor, setClothColor] = useState("#0f172a"); // Midnight Blue
  const [view, setView] = useState("front");

  const colors = [
    { name: "Midnight", value: "#0f172a" },
    { name: "Royal", value: "#1e3a8a" },
    { name: "Wine", value: "#450a0a" },
    { name: "Emerald", value: "#064e3b" },
    { name: "Classic Black", value: "#000000" },
    { name: "Pristine White", value: "#ffffff" },
  ];

  const handleSaveDesign = (layers) => {
    if (layers.length === 0) {
      toast.error("Please add some design elements first");
      return;
    }
    toast.success("Design saved successfully! Adding to cart...");
    // Logic to save design and redirect to cart would go here
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 mt-20">
        {/* Intro Section */}
        <section className="bg-primary/5 border-b border-border/50 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                <Sparkles className="w-3 h-3" /> Creative Workshop
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight">
                Design Your <span className="text-primary italic">Signature.</span>
              </h1>
              <p className="text-muted-foreground max-w-lg text-sm md:text-base">
                Create a masterpiece with our professional-grade design tools. Choose your canvas, 
                add layers, and visualize your custom apparel in real-time.
              </p>
            </div>
            
            <div className="flex gap-4">
               <div className="hidden lg:flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase opacity-40">Average Fulfillment</span>
                  <span className="text-lg font-bold">5-7 Business Days</span>
               </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left: Product Configuration */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" /> Base Selection
                </h3>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-60">Canvas Type</label>
                  <select 
                    value={clothType} 
                    onChange={(e) => setClothType(e.target.value)}
                    className="w-full h-12 bg-card border border-border/50 rounded-xl px-4 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option>Premium Hoodie</option>
                    <option>Classic T-Shirt</option>
                    <option>Luxury Sweatshirt</option>
                    <option>Designer Polo</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold opacity-60">Base Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setClothColor(c.value)}
                        className={`w-full aspect-square rounded-full border-2 transition-all ${clothColor === c.value ? "border-primary scale-110 shadow-lg" : "border-transparent hover:border-border"}`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-center opacity-40">{colors.find(c => c.value === clothColor)?.name}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                <h4 className="text-xs font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Pro Tip</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For the best results, use high-resolution PNG images with transparent backgrounds. 
                  Embroidery designs look best with bold, simple graphics.
                </p>
              </div>

              <div className="space-y-4">
                 <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" /> Need Assistance?
                </h3>
                <Button variant="outline" className="w-full rounded-xl text-xs font-bold">
                  Schedule a Consultation
                </Button>
              </div>
            </div>

            {/* Right: The Studio */}
            <div className="lg:col-span-9">
              <DesignCanvas 
                clothType={clothType} 
                clothColor={clothColor} 
                view={view}
                onSave={handleSaveDesign}
              />
              
              {/* Bottom Info */}
              <div className="mt-10 grid md:grid-cols-3 gap-6">
                {[
                  { title: "High-Res Exports", desc: "We use your source files for maximum print clarity." },
                  { title: "Material Quality", desc: "100% Organic Cotton and premium thread counts." },
                  { title: "Secure Delivery", desc: "Insured shipping with real-time package tracking." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
