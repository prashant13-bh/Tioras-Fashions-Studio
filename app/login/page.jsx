"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LoginContent() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) { toast.success("Welcome back!"); router.push(redirect); }
    else toast.error(result.error || "Invalid credentials");
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold font-heading mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your TioraS account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 bg-card p-8 rounded-2xl border border-border/50 shadow-subtle">
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" placeholder="you@example.com" /></div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl pr-12" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground touch-target">{showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 gradient-primary text-white rounded-xl font-bold text-base">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log In"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Sign Up</Link></p>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
        <LoginContent />
      </Suspense>
      <Footer />
    </div>
  );
}
