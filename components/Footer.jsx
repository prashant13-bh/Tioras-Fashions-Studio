"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MessageCircle,
} from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/products", label: "Collections" },
    { href: "/products?category=tshirts", label: "Premium Tees" },
    { href: "/products?category=hoodies", label: "Elite Hoodies" },
    { href: "/products?category=caps", label: "Signature Caps" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Custom Studio" },
    { href: "/blog", label: "Insights" },
    { href: "/faq", label: "Bespoke FAQ" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms-conditions", label: "Terms" },
    { href: "/return-policy", label: "Returns" },
    { href: "/shipping-policy", label: "Shipping" },
    { href: "/refund-policy", label: "Refunds" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com/tiorasfashions", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/tiorasfashions", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/tiorasfashions", icon: Twitter, label: "Twitter" },
];

export default function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "tyoras9686@gmail.com";
  const supportPhone = process.env.NEXT_PUBLIC_SUPPORT_PHONE || "7353676454";

  return (
    <footer className="bg-secondary text-secondary-foreground pt-24 pb-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-8">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-black text-white font-heading tracking-tighter">
                TIORAS<span className="text-accent italic">.</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/50 text-base leading-relaxed max-w-xs">
              Defining the future of custom apparel. Masterful embroidery and precision printing for the modern individual.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-xl"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">
              Curation
            </h3>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/60 hover:text-white transition-all hover:translate-x-1 inline-block font-bold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">
              Boutique
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-foreground/60 hover:text-white transition-all hover:translate-x-1 inline-block font-bold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">
              Studio Access
            </h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <a href={`mailto:${supportEmail}`} className="text-secondary-foreground/60 hover:text-white transition-colors font-bold">
                  {supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <a href={`tel:${supportPhone}`} className="text-secondary-foreground/60 hover:text-white transition-colors font-bold">
                  +91 {supportPhone}
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                  <MessageCircle className="w-4 h-4 text-accent" />
                </div>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917353676454"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground/60 hover:text-white transition-colors font-bold"
                >
                  WhatsApp Concierge
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-foreground/30">
            © {new Date().getFullYear()} TIORAS FASHIONS STUDIO. REFINING THE BESPOKE EXPERIENCE.
          </p>
          <div className="flex flex-wrap gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary-foreground/30 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
