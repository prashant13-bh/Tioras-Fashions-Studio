"use client";

import React, { useState, useEffect } from "react";

export default function LoadingManager({ children }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div 
        className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-all duration-700 pointer-events-none ${
          mounted ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <div className="flex flex-col items-center gap-6 animate-pulse">
           <span className="text-4xl font-black tracking-tighter text-primary font-heading">
             TIORAS<span className="text-accent italic">.</span>
           </span>
           <div className="w-12 h-[2px] bg-accent/30 overflow-hidden">
              <div className="w-full h-full bg-accent animate-progress" />
           </div>
        </div>
      </div>
      {children}
    </>
  );
}
