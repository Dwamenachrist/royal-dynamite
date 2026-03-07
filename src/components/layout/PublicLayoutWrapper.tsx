"use client";

import { usePathname } from "next/navigation";
import { Navbar, Footer } from "@/components/layout";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { Toaster } from "@/components/ui/sonner";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isLogin = pathname?.startsWith("/login");

    // Admin and Login layout fully manages its own nav, wrapper, and toaster inside their routes
    if (isAdmin || isLogin) {
        return <>{children}</>;
    }

    // Public website gets the standard wrapper
    return (
        <>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <Toaster />
        </>
    );
}
