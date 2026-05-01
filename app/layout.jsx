import { Outfit, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/contexts/WishlistContext";
import BottomNav from "@/components/BottomNav";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: {
    default: "TioraS Fashions Studio | Premium Custom Apparel",
    template: "%s | TioraS Fashions Studio",
  },
  description:
    "Premium embroidery & custom printing studio. Upload your design, choose print or embroidery, and get custom apparel delivered to your door.",
  keywords: [
    "custom t-shirt",
    "embroidery",
    "printing",
    "apparel",
    "fashion",
    "TioraS",
    "custom clothing India",
  ],
  openGraph: {
    title: "TioraS Fashions Studio",
    description: "Premium Custom Apparel — Print & Embroidery",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${jakarta.variable} ${playfair.variable}`}
    >
      <body className="font-body antialiased pb-20 lg:pb-0">
        <div className="bg-primary text-primary-foreground py-2 text-center text-xs font-bold tracking-widest uppercase overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            <span>✨ 10% OFF ON YOUR FIRST CUSTOM ORDER — USE CODE: FIRST10 ✨ &nbsp;&nbsp;&nbsp;&nbsp; 📦 FREE SHIPPING ON ALL ORDERS ABOVE ₹999 ✨ &nbsp;&nbsp;&nbsp;&nbsp; 🧵 NEW EMBROIDERY OPTIONS AVAILABLE NOW ✨ &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>✨ 10% OFF ON YOUR FIRST CUSTOM ORDER — USE CODE: FIRST10 ✨ &nbsp;&nbsp;&nbsp;&nbsp; 📦 FREE SHIPPING ON ALL ORDERS ABOVE ₹999 ✨ &nbsp;&nbsp;&nbsp;&nbsp; 🧵 NEW EMBROIDERY OPTIONS AVAILABLE NOW ✨ &nbsp;&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <AdminAuthProvider>
              <WishlistProvider>
                <CartProvider>
                  {children}
                  <BottomNav />
                  <NewsletterPopup />
                  <Toaster richColors position="top-right" />
                </CartProvider>
              </WishlistProvider>
            </AdminAuthProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
