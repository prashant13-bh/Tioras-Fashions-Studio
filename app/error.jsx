"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => { console.error("App Error:", error); }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">{error?.message || "An unexpected error occurred. Please try again."}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} className="gradient-primary text-white rounded-xl px-8">Try Again</Button>
          <Button variant="outline" onClick={() => window.location.href = "/"} className="rounded-xl px-8">Go Home</Button>
        </div>
      </div>
    </div>
  );
}
