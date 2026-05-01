"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const { loginAdmin } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await loginAdmin(email, password);
    setLoading(false);
    
    if (result.success) {
      toast.success("Welcome, Admin");
      router.push("/admin");
    } else {
      toast.error(result.error || "Access Denied");
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white mb-2">Admin Portal</h1>
          <p className="text-secondary-foreground/60">Restricted Access — TioraS Fashions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Admin Email</Label>
            <div className="relative">
              <Input 
                id="email" 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white pl-11 focus:ring-primary" 
                placeholder="admin@tioras.com" 
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" title="Password" className="text-white">Security Key</Label>
            <div className="relative">
              <Input 
                id="password" 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white pl-11 focus:ring-primary" 
                placeholder="••••••••" 
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full h-12 gradient-primary text-white rounded-xl font-extrabold text-lg shadow-lg hover:shadow-primary/20"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access Dashboard"}
          </Button>
          
          <p className="text-center text-xs text-white/40">
            Authorized personnel only. All access attempts are logged.
          </p>
        </form>
      </div>
    </div>
  );
}
