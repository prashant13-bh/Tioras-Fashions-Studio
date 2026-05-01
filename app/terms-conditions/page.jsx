import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using the TioraS Fashions Studio website, you agree to comply with and be bound by these Terms and Conditions."
  },
  {
    title: "2. Custom Designs & Uploads",
    content: "When you upload a design for printing or embroidery, you represent that you have the right to use that design. TioraS Fashions reserves the right to refuse orders with designs that are offensive, infringing on copyrights, or otherwise inappropriate."
  },
  {
    title: "3. Pricing & Payment",
    content: "All prices are in INR. Payments are processed securely via Razorpay. We reserve the right to change prices at any time without prior notice."
  },
  {
    title: "4. Shipping & Delivery",
    content: "We ship across India. Delivery times are estimates and may vary due to custom production requirements, shipping carrier delays, or other factors."
  },
  {
    title: "5. Limitation of Liability",
    content: "TioraS Fashions shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services or products."
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-subtle">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground mb-10">Last Updated: May 2024</p>
            
            <div className="space-y-10">
              {sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-bold font-heading text-foreground mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
