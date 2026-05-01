"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenNewsletter");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("hasSeenNewsletter", "true");
      setOpen(false);
      toast.success("Thanks for subscribing! Check your email for your 10% discount code.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-[2rem] border-none">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 bg-primary p-8 text-primary-foreground flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                   <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="2" />
                   <circle cx="50" cy="50" r="30" stroke="currentColor" fill="none" strokeWidth="1" />
                </svg>
             </div>
             <Mail className="w-12 h-12 mb-6" />
             <h2 className="text-3xl font-extrabold font-heading mb-2">Join the Club</h2>
             <p className="text-primary-foreground/80 text-sm">Get 10% off your first custom order and early access to new collections.</p>
          </div>
          <div className="md:w-1/2 p-8 bg-background flex flex-col justify-center">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold font-heading">Stay Inspired</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter your email to unlock your exclusive discount.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-12"
              />
              <Button type="submit" className="w-full h-12 rounded-xl gradient-primary text-white font-bold">
                Get My 10% Off
              </Button>
              <button 
                type="button" 
                onClick={() => {
                  localStorage.setItem("hasSeenNewsletter", "true");
                  setOpen(false);
                }}
                className="text-xs text-muted-foreground hover:text-foreground text-center w-full"
              >
                No thanks, I prefer full price
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
