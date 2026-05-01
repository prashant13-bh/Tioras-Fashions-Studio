"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/contexts/WishlistContext";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/products", label: "Collections" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Studio" },
  { href: "/blog", label: "Insights" },
];

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, currentUser } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isAdmin = pathname?.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-premium border-b border-white/10 py-2"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className={`text-2xl md:text-3xl font-black font-heading tracking-tighter transition-colors duration-300 ${
              !mounted ? "text-primary" : 
              scrolled ? "text-primary" : "text-primary md:text-white dark:text-white"
            }`}>
              TIORAS<span className="text-accent italic">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  pathname === link.href
                    ? "text-primary-foreground bg-primary shadow-lg scale-105"
                    : `hover:text-primary hover:bg-white/10 ${
                        !mounted ? "text-muted-foreground" :
                        scrolled ? "text-muted-foreground" : "text-muted-foreground md:text-white/70"
                      }`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
                <ThemeToggle />
                
                <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className={`rounded-full transition-colors ${
                  !mounted ? "text-primary" :
                  scrolled ? "text-primary" : "text-primary md:text-white dark:text-white"
                }`}
                aria-label="Search"
                >
                <Search className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 shadow-inner">
                {/* Wishlist */}
                <Link href="/account/wishlist">
                <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full relative ${
                      !mounted ? "text-primary" :
                      scrolled ? "text-primary" : "text-primary md:text-white dark:text-white"
                    }`}
                    aria-label="Wishlist"
                >
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center font-black animate-pulse">
                        {wishlistCount}
                    </span>
                    )}
                </Button>
                </Link>

                {/* Cart */}
                <Link href="/cart">
                <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full relative ${
                      !mounted ? "text-primary" :
                      scrolled ? "text-primary" : "text-primary md:text-white dark:text-white"
                    }`}
                    aria-label="Cart"
                >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center font-black animate-pulse">
                        {cartCount}
                    </span>
                    )}
                </Button>
                </Link>

                {/* Account */}
                <Link href={isAuthenticated ? "/account" : "/login"}>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full ${
                      !mounted ? "text-primary" :
                      scrolled ? "text-primary" : "text-primary md:text-white dark:text-white"
                    }`}
                    aria-label="Account"
                >
                    <User className="h-5 w-5" />
                </Button>
                </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden rounded-full ${
                !mounted ? "text-primary" :
                scrolled ? "text-primary" : "text-primary md:text-white dark:text-white"
              }`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSearch} className="py-6">
                <div className="flex gap-3 max-w-2xl mx-auto">
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium collections..."
                    className="flex-1 bg-white/5 backdrop-blur-xl border-white/10 h-14 rounded-2xl text-lg px-6"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="h-14 rounded-2xl px-8 gradient-primary text-white font-black uppercase tracking-widest"
                  >
                    Find
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <nav className="px-6 py-10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-4 rounded-2xl text-2xl font-black font-heading transition-all ${
                    pathname === link.href
                      ? "text-primary translate-x-2"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-10 border-t border-white/10">
                <Link
                  href={isAuthenticated ? "/account" : "/login"}
                  className="flex items-center justify-between px-6 py-6 rounded-3xl bg-primary text-primary-foreground shadow-xl"
                >
                  <span className="text-xl font-black">
                    {isAuthenticated
                      ? `HI, ${currentUser?.name?.toUpperCase() || "ACCOUNT"}`
                      : "LOG IN"}
                  </span>
                  <User className="h-6 w-6" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
