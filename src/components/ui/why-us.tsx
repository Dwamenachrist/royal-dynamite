"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Handshake, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
    {
        icon: ShieldCheck,
        title: "Trust & Legitimacy",
        description:
            "Registered since 2015 with a physical office in Accra you can visit.",
    },
    {
        icon: Star,
        title: "White-Glove Service",
        description:
            "We handle everything documentation, delivery, and aftercare.",
    },
    {
        icon: Handshake,
        title: "Trusted Partnerships",
        description:
            "Working alongside Yakman Group, Kwarteng & Co Consult, and more.",
    },
];

export function WhyUs() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section
            className="relative py-16 md:py-20 overflow-hidden"
            style={{ background: "#132b4d" }}
        >
            <div className="services-texture absolute inset-0 pointer-events-none" />

            <div className="relative container px-4 md:px-6 z-10">
                {/* Compact Header */}
                <div className="text-center mb-10 md:mb-14">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-2">
                        Why Choose Us
                    </p>
                    <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                        Built on Trust, Driven by Excellence
                    </h2>
                    <div className="w-12 h-0.5 bg-rd-gold mx-auto mt-4 rounded-full" />
                </div>

                {/* Tight 2-Column Layout */}
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-stretch max-w-5xl mx-auto">
                    {/* LEFT: Sleek Image */}
                    <div
                        className="relative rounded-2xl overflow-hidden h-full min-h-[320px]"
                        style={{
                            boxShadow:
                                "0 16px 48px rgba(0,0,0,0.4), 0 0 24px rgba(212,175,55,0.08)",
                            border: "1px solid rgba(212,175,55,0.2)",
                        }}
                    >
                        <Image
                            src="/handshake.png"
                            alt="Royal Dynamite trusted partnership since 2015"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(10,20,40,0.9) 0%, rgba(10,20,40,0.3) 60%)",
                            }}
                        />
                        {/* Bottom brand badge */}
                        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3">
                            <Image
                                src="/brand-assets/royal_dynamite_mark.png"
                                alt="Royal Dynamite"
                                width={36}
                                height={36}
                                className="object-contain"
                            />
                            <div>
                                <p className="font-bold text-sm text-white leading-tight">
                                    Royal Dynamite Limited
                                </p>
                                <p className="text-rd-gold text-xs">
                                    Est. December 2015
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Exactly 3 Slim Cards */}
                    <div className="flex flex-col justify-between h-full gap-3">
                        <div className="space-y-3 flex-1">
                            {pillars.map((pillar, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <div
                                        key={pillar.title}
                                        className="cursor-pointer flex items-center gap-5 transition-all duration-300 group"
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                        style={{
                                            padding: "1.25rem",
                                            background: "rgba(15, 30, 50, 0.4)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: isActive
                                                ? "1px solid rgba(212, 175, 55, 0.3)"
                                                : "1px solid rgba(255, 255, 255, 0.08)",
                                            borderRadius: "0.75rem",
                                            transform: isActive
                                                ? "translateX(4px)"
                                                : "translateX(0)",
                                            boxShadow: isActive
                                                ? "0 8px 24px rgba(0,0,0,0.3), 0 0 12px rgba(212,175,55,0.06)"
                                                : "0 4px 12px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        {/* Icon */}
                                        <div
                                            className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-all duration-400"
                                            style={{
                                                background: isActive
                                                    ? "rgba(212,175,55,0.12)"
                                                    : "rgba(255,255,255,0.03)",
                                                border: `1px solid ${isActive ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.05)"}`,
                                            }}
                                        >
                                            <pillar.icon
                                                className="h-5 w-5 transition-colors duration-400"
                                                style={{
                                                    color: isActive
                                                        ? "#D4AF37"
                                                        : "rgba(255,255,255,0.5)",
                                                }}
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="min-w-0">
                                            <h4
                                                className="font-bold text-base transition-colors duration-400"
                                                style={{
                                                    color: isActive
                                                        ? "#ffffff"
                                                        : "rgba(255,255,255,0.9)",
                                                }}
                                            >
                                                {pillar.title}
                                            </h4>
                                            <p
                                                className="text-sm leading-relaxed transition-colors duration-400 mt-1 text-slate-300"
                                            >
                                                {pillar.description}
                                            </p>
                                        </div>

                                        {/* Gold accent bar */}
                                        <div
                                            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-all duration-400 opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: "linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.2))",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA aligned to bottom */}
                        <div className="flex gap-3 pt-2 mt-auto">
                            <Button
                                size="sm"
                                className="bg-rd-gold text-rd-navy hover:bg-rd-gold/90 rounded-full font-bold cursor-pointer text-xs px-5 h-9"
                                asChild
                            >
                                <Link href="/about">
                                    About Us{" "}
                                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Link>
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/5 rounded-full cursor-pointer bg-transparent text-xs px-5 h-9"
                                asChild
                            >
                                <Link href="/contact">Visit Our Office</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
