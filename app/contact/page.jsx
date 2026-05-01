"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
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
    // TODO: Send to PocketBase contact_messages collection
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "tyoras9686@gmail.com";
  const phone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "7353676454";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 font-heading">Contact Us</h1>
          <p className="text-muted-foreground mb-12">We&apos;d love to hear from you. Get in touch with us.</p>

          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-2xl border border-border/50">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 rounded-xl" /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 rounded-xl" /></div>
              </div>
              <div className="space-y-2"><Label>Subject</Label><Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="h-12 rounded-xl" /></div>
              <div className="space-y-2"><Label>Message</Label><textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none" /></div>
              <Button type="submit" disabled={sending} className="w-full h-12 gradient-primary text-white rounded-xl font-bold"><Send className="w-4 h-4 mr-2" /> {sending ? "Sending..." : "Send Message"}</Button>
            </form>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-heading">Get In Touch</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: email, href: `mailto:${email}` },
                  { icon: Phone, label: phone, href: `tel:${phone}` },
                  { icon: MessageCircle, label: "WhatsApp Support", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917353676454"}` },
                  { icon: MapPin, label: "Karnataka, India", href: null },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-primary" /></div>
                    {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary">{label}</a> : <span className="text-foreground font-medium">{label}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
