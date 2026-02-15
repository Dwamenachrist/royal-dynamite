"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/constants";

const serviceLinks = [
    { href: "/dealership", label: "Sales" },
    { href: "/rentals", label: "Rentals" },
    { href: "/transport", label: "Transport" },
    { href: "/freight", label: "Freight" },
];

const secondaryLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Close mobile menu on route change */
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    function isActive(href: string): boolean {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(href + "/");
    }

    return (
        <>
            {/* ── Desktop Navbar ── */}
            <header
                className={cn(
                    "fixed z-50 hidden md:flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isScrolled
                        ? "top-3 inset-x-4 lg:inset-x-8 h-16 rounded-full bg-rd-navy/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                        : "top-0 inset-x-0 h-20 bg-transparent"
                )}
            >
                {/* Left: Logo */}
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-2.5 group transition-all duration-500",
                        isScrolled ? "pl-6" : "pl-8 lg:pl-12"
                    )}
                >
                    <div className={cn("relative transition-all duration-500", isScrolled ? "h-8 w-8" : "h-10 w-10")}>
                        <Image
                            src="/brand-assets/royal_dynamite_mark.png"
                            alt="Royal Dynamite"
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                            priority
                        />
                    </div>
                    <div className="leading-none">
                        <span className={cn(
                            "font-bold text-white tracking-tight group-hover:text-rd-gold transition-colors duration-300 block",
                            isScrolled ? "text-sm" : "text-[15px]"
                        )}>
                            Royal Dynamite
                        </span>
                    </div>
                </Link>

                {/* Center: Service Links */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                    {serviceLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={cn(
                                "px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-full",
                                isActive(link.href)
                                    ? "text-rd-gold bg-white/[0.06]"
                                    : "text-white/80 hover:text-white hover:bg-white/[0.08]"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="w-px h-4 bg-white/15 mx-1" />
                    {secondaryLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={cn(
                                "px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 rounded-full",
                                isActive(link.href)
                                    ? "text-rd-gold"
                                    : "text-white/50 hover:text-white/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right: CTA */}
                <div className={cn("flex items-center gap-3 transition-all duration-500", isScrolled ? "pr-3" : "pr-8 lg:pr-12")}>
                    <Button
                        size="sm"
                        className={cn(
                            "rounded-full font-semibold text-[13px] transition-all duration-300",
                            "bg-rd-gold text-rd-navy hover:bg-white shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)]",
                            isScrolled ? "h-9 px-5" : "h-10 px-6"
                        )}
                        asChild
                    >
                        <a
                            href={generateWhatsAppLink("Hello, I'd like to enquire about your services.")}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                            Enquire Now
                        </a>
                    </Button>
                </div>
            </header>

            {/* ── Mobile Navbar ── */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 flex md:hidden items-center justify-between px-4 bg-rd-navy/95 backdrop-blur-xl border-b border-white/[0.06]">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-9 w-9">
                        <Image
                            src="/brand-assets/royal_dynamite_mark.png"
                            alt="Royal Dynamite"
                            width={36}
                            height={36}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <span className="font-bold text-white text-sm tracking-tight">Royal Dynamite</span>
                </Link>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-rd-navy border-l border-white/[0.06] text-white w-[300px] p-0">
                        {/* Logo header */}
                        <div className="flex items-center gap-2.5 p-6 border-b border-white/[0.06]">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/brand-assets/royal_dynamite_mark.png"
                                    alt="Royal Dynamite"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <div className="leading-none">
                                <span className="font-bold text-white text-sm block">Royal Dynamite</span>
                                <span className="text-rd-gold text-[10px] tracking-widest uppercase">Limited</span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col p-3">
                            {/* Home link — explicit for mobile */}
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                aria-current={isActive("/") ? "page" : undefined}
                                className={cn(
                                    "px-4 py-3.5 text-[15px] font-medium rounded-xl transition-colors",
                                    isActive("/")
                                        ? "text-rd-gold bg-white/[0.06]"
                                        : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                                )}
                            >
                                Home
                            </Link>

                            <p className="px-3 py-2 mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">Services</p>
                            {serviceLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    aria-current={isActive(link.href) ? "page" : undefined}
                                    className={cn(
                                        "px-4 py-3.5 text-[15px] font-medium rounded-xl transition-colors",
                                        isActive(link.href)
                                            ? "text-rd-gold bg-white/[0.06]"
                                            : "hover:bg-white/[0.05]"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="h-px bg-white/[0.06] my-2 mx-3" />

                            {secondaryLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    aria-current={isActive(link.href) ? "page" : undefined}
                                    className={cn(
                                        "px-4 py-3.5 text-[15px] font-medium rounded-xl transition-colors",
                                        isActive(link.href)
                                            ? "text-rd-gold bg-white/[0.06]"
                                            : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile CTA */}
                            <div className="px-3 pt-4">
                                <Button
                                    className="w-full rounded-full bg-rd-gold text-rd-navy hover:bg-white font-semibold"
                                    asChild
                                >
                                    <a
                                        href={generateWhatsAppLink("Hello, I'd like to enquire about your services.")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Enquire Now
                                    </a>
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
        </>
    );
}
