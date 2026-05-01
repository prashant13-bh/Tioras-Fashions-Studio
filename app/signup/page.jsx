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

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error("Passwords don't match"); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    const result = await signup(email, password, confirmPassword, name);
    setLoading(false);
    if (result.success) { toast.success("Account created!"); router.push("/"); }
    else toast.error(result.error || "Signup failed");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold font-heading mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join TioraS Fashions Studio</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded-2xl border border-border/50 shadow-subtle">
            <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" placeholder="John Doe" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" placeholder="you@example.com" /></div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl pr-12" placeholder="Min 8 characters" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground touch-target">{showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
            </div>
            <div className="space-y-2"><Label htmlFor="confirm">Confirm Password</Label><Input id="confirm" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12 rounded-xl" placeholder="••••••••" /></div>
            <Button type="submit" disabled={loading} className="w-full h-12 gradient-primary text-white rounded-xl font-bold text-base">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log In</Link></p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
