"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { generateWhatsAppLink, SITE_CONFIG } from "@/lib/constants";
import Image from "next/image";

interface StickyMobileCTAProps {
  vehicleName: string;
  vehicleId: string;
  mode?: "sale" | "rent";
}

export function StickyMobileCTA({ vehicleName, vehicleId, mode = "sale" }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px (past the gallery + mobile header)
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = generateWhatsAppLink(
    `Hi, I'm interested in the ${vehicleName}. Please send me more details.`
  );

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      {/* Top edge glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div
        className="bg-[#0a192f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0.75rem)" }}
      >
        {/* Consultant mini-avatar + name */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/30">
            <Image
              src="https://i.pravatar.cc/150?u=reuben"
              alt="Sales Consultant"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-[9px] text-[#8892B0] uppercase tracking-widest">Consultant</p>
            <p className="text-xs font-bold text-white leading-tight">Reuben G.</p>
          </div>
        </div>

        {/* Enquire button */}
        <a
          href={mode === "rent" ? `/rentals/${vehicleId}/apply` : `/dealership/${vehicleId}/enquire`}
          className="flex-1 h-11 bg-[#D4AF37] hover:bg-[#f5d87a] text-[#0a192f] rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.97] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          {mode === "rent" ? "Apply to Rent" : "Enquire Now"}
        </a>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-11 h-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center hover:bg-[#25D366]/25 transition-colors active:scale-[0.95]"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
        </a>

        {/* Call button */}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-[0.95]"
          aria-label="Call us"
        >
          <Phone className="w-4 h-4 text-white/70" />
        </a>
      </div>
    </div>
  );
}
