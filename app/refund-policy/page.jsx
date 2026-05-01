import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-subtle">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">Refund & Return Policy</h1>
            <p className="text-muted-foreground mb-10">Last Updated: May 2024</p>
            
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">1. Return Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer a 7-day return policy for standard, non-customized products in their original, unworn condition with tags attached.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">2. Custom Orders</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Custom printed or embroidered items are made specifically for you. Therefore, these items can only be returned if there is a manufacturing defect or an error on our part (e.g., wrong design, wrong size shipped).
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">3. Refund Process</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 5-7 business days.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">4. Shipping Costs</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Shipping costs for returns are the responsibility of the customer unless the item was defective or incorrect.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
