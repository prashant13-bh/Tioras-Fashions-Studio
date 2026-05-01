import Header from "@/components/Header";
import Footer from "@/components/Footer";

const policySections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, place an order, upload a custom design, or contact us. This may include your name, email address, phone number, shipping address, and payment information (handled securely by our payment processors)."
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information we collect to process your orders, provide customer support, improve our services, and send you updates about your orders or promotional offers (with your consent)."
  },
  {
    title: "3. Information Sharing",
    content: "We do not sell your personal information. We share your information only with trusted third parties necessary to provide our services, such as payment processors (Razorpay) and shipping partners."
  },
  {
    title: "4. Data Security",
    content: "We implement a variety of security measures to maintain the safety of your personal information. Your custom designs and order history are stored securely on our backend servers."
  },
  {
    title: "5. Cookies",
    content: "We use cookies to enhance your experience on our site, such as keeping you logged in and remembering items in your shopping cart."
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-subtle">
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-10">Last Updated: May 2024</p>
            
            <div className="space-y-10">
              {policySections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-bold font-heading text-foreground mb-4">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </section>
              ))}
            </div>
            
            <div className="mt-16 pt-10 border-t border-border/50 text-center">
              <p className="text-sm text-muted-foreground italic">
                If you have any questions about our Privacy Policy, please contact us at tyoras9686@gmail.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
