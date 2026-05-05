"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917353676454";
  const message = encodeURIComponent(
    "Hi TioraS Fashions! I have a question about your products."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 lg:bottom-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
