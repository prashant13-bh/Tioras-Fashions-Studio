"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulation of sending
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent successfully! We will contact you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "tyoras9686@gmail.com";
  const phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "7353676454";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative py-20 overflow-hidden bg-secondary text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center" />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight"
            >
              Let&apos;s Create Something <span className="text-accent italic">Extraordinary</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/70 max-w-2xl mx-auto"
            >
              Have a vision for custom apparel? Our designers are ready to bring your ideas to life. Reach out today.
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="premium-card p-8 bg-white dark:bg-card">
                <h3 className="text-2xl font-bold mb-6 font-heading">Connect With Us</h3>
                <div className="space-y-8">
                  {[
                    { icon: Mail, title: "Email Us", detail: email, href: `mailto:${email}`, color: "bg-blue-500/10 text-blue-500" },
                    { icon: MessageCircle, title: "WhatsApp", detail: "Instant Chat Support", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917353676454"}`, color: "bg-emerald-500/10 text-emerald-500" },
                    { icon: Clock, title: "Working Hours", detail: "Mon - Sat: 9 AM - 8 PM", href: null, color: "bg-amber-500/10 text-amber-500" },
                    { icon: MapPin, title: "Our Studio", detail: "Karnataka, India", href: null, color: "bg-rose-500/10 text-rose-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-1">{item.title}</p>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-primary transition-colors">{item.detail}</a>
                        ) : (
                          <p className="text-lg font-bold">{item.detail}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Card */}
              <div className="premium-card p-8 bg-primary text-primary-foreground">
                <h4 className="text-xl font-bold mb-4">Follow Our Journey</h4>
                <p className="text-sm opacity-70 mb-6">See our latest embroidery works and custom prints on social media.</p>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20"><Globe className="w-5 h-5" /></Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-white/10 border-white/20 hover:bg-white/20"><MessageCircle className="w-5 h-5" /></Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="premium-card p-8 md:p-12 bg-white dark:bg-card h-full">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold font-heading mb-2">Send a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and we will respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest">Full Name</Label>
                    <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest">Email Address</Label>
                    <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary" placeholder="Enter your email" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest">Subject</Label>
                    <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="h-14 rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary" placeholder="How can we help?" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest">Message</Label>
                    <textarea 
                      required 
                      value={form.message} 
                      onChange={(e) => setForm({ ...form, message: e.target.value })} 
                      rows={6} 
                      className="w-full rounded-2xl border-none bg-muted/30 px-5 py-4 text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none transition-all" 
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <div className="sm:col-span-2 pt-4">
                    <Button type="submit" disabled={sending} className="w-full h-16 gradient-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                      {sending ? <Clock className="w-6 h-6 animate-spin mr-2" /> : <Send className="w-6 h-6 mr-2" />}
                      {sending ? "Sending Message..." : "Send Your Vision"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="premium-card overflow-hidden h-[450px] relative border-none shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.0!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714555000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-6 left-6 p-6 glass rounded-2xl max-w-sm pointer-events-none">
                <h4 className="font-black text-xl mb-1">TioraS Studio</h4>
                <p className="text-sm opacity-80">Karnataka, India. Visit us for a personal consultation on your custom designs.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
