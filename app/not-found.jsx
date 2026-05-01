import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-extrabold text-primary/20 font-heading mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground font-heading mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/"><button className="gradient-primary text-white px-8 py-3 rounded-xl font-bold shadow-md">Go Home</button></Link>
            <Link href="/products"><button className="border border-border px-8 py-3 rounded-xl font-bold hover:bg-muted transition-colors">Shop Products</button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
