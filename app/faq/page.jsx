"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  { q: "How do I upload my custom design?", a: "Simply go to any product page, scroll to the 'Upload Your Design' section, and drag & drop your image file (JPG, PNG, SVG, or PDF). Choose whether you want printing or embroidery, add placement notes, and add to cart!" },
  { q: "What file formats do you accept?", a: "We accept JPG, PNG, SVG, WebP, and PDF files up to 10MB. For best results, use high-resolution images (300 DPI or higher)." },
  { q: "What's the difference between printing and embroidery?", a: "Printing (DTG/Screen Print) is best for detailed, full-color designs. Embroidery uses thread stitching for a premium, textured look — ideal for logos and text." },
  { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days. Express delivery is available for 2-3 business days. Custom orders may take an additional 1-2 days for production." },
  { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for unworn items in original condition. Custom printed/embroidered items can only be returned if there's a defect in our work." },
  { q: "Do you offer bulk/corporate orders?", a: "Yes! Contact us via WhatsApp or email for bulk pricing on custom uniforms, event merchandise, and corporate apparel." },
  { q: "Is my payment secure?", a: "Absolutely. We use Razorpay's encrypted payment gateway which supports UPI, cards, net banking, and wallets. Your financial data is never stored on our servers." },
  { q: "Can I track my order?", a: "Yes, once your order ships, you'll receive a tracking link via email and SMS. You can also check order status in your account dashboard." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 font-heading">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-10">Find answers to common questions about our products and services.</p>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-subtle">
                <AccordionTrigger className="text-left font-bold py-5 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
