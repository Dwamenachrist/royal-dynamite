"use client";

import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function WhatsAppFloat() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show button after 1 second to avoid jarring appearance
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <a
            href={generateWhatsAppLink("Hello, I'd like to inquire about your services.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-6 right-6 z-50 group",
                "transition-all duration-500 ease-out",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            )}
            aria-label="Chat on WhatsApp"
        >
            <div className="relative">
                {/* Pulsing Background Ring */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 group-hover:opacity-0 transition-opacity" />
                
                {/* Main Button */}
                <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                    <MessageCircle className="h-6 w-6" />
                </div>

                {/* Tooltip on Hover */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                    <div className="bg-rd-navy text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xl">
                        Chat with us on WhatsApp
                        <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-rd-navy" />
                    </div>
                </div>
            </div>
        </a>
    );
}
