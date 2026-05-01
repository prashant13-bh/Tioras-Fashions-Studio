import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-subtle">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">Shipping Policy</h1>
            <p className="text-muted-foreground mb-10">Last Updated: May 2024</p>
            
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">1. Production Timeline</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Every order at TioraS Fashions Studio is custom-crafted. 
                  - **Standard Production**: 3-5 business days.
                  - **Peak Seasons**: 5-7 business days.
                  *Production starts only after payment confirmation and design approval.*
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">2. Delivery Estimates</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Once your order is shipped, delivery typically takes:
                  - **Metro Cities**: 2-3 business days.
                  - **Other Cities**: 4-6 business days.
                  - **Remote Areas**: 7-10 business days.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">3. Shipping Charges</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>**Free Shipping**: On all orders above ₹999.</li>
                  <li>**Standard Shipping**: ₹50 for orders below ₹999.</li>
                  <li>**Express Shipping**: ₹200 (Available for select pin codes).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-bold font-heading text-foreground mb-4">4. Tracking Your Order</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As soon as your order is dispatched, we will send you a tracking number and a link to the carrier&apos;s website via email and SMS.
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
