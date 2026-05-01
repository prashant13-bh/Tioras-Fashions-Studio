"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeNewsletter, setAgreeNewsletter] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error("Passwords don't match"); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    const result = await signup(email, password, confirmPassword, name);
    setLoading(false);
    if (result.success) { 
      toast.success("Welcome to TioraS Fashions Studio!"); 
      router.push("/"); 
    } else {
      toast.error(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold font-heading mb-3 tracking-tight">Create Account</h1>
            <p className="text-muted-foreground">Start your custom fashion journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-border/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-all" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-all" placeholder="you@example.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl bg-background/50 border-border/50 pr-10 focus:border-primary transition-all" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-primary transition-colors touch-target">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm</Label>
                <Input id="confirm" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary transition-all" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-center space-x-3 py-2">
              <Checkbox id="newsletter" checked={agreeNewsletter} onCheckedChange={setAgreeNewsletter} />
              <Label htmlFor="newsletter" className="text-xs text-muted-foreground leading-none cursor-pointer">
                Subscribe to our newsletter for exclusive offers and design tips.
              </Label>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 gradient-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Join the Studio"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50"></span></div>
              <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-card px-2 text-muted-foreground font-bold tracking-[0.2em]">Or join with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="h-12 rounded-xl border-border/50 hover:bg-muted font-bold">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </Button>
              <Button variant="outline" type="button" className="h-12 rounded-xl border-border/50 hover:bg-muted font-bold">
                <svg className="w-5 h-5 mr-2 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground pt-4">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link>
            </p>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
