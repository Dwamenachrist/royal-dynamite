"use client";

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
            "We handle everything — documentation, delivery, and aftercare.",
    },
    {
        icon: Handshake,
        title: "Trusted Partnerships",
        description:
            "Working alongside Yakman Group, Kwarteng & Co Consult, and more.",
    },
];

export function WhyUs() {
    return (
        <section
            className="relative py-12 md:py-20 overflow-hidden"
            style={{ background: "#132b4d" }}
        >
            <div className="services-texture absolute inset-0 pointer-events-none" />

            <div className="relative container px-4 md:px-6 z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-2">
                        Why Choose Us
                    </p>
                    <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                        Built on Trust, Driven by Excellence
                    </h2>
                    <div className="w-12 h-0.5 bg-rd-gold mx-auto mt-4 rounded-full" />
                </div>

                {/* 2-Column layout */}
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-stretch max-w-5xl mx-auto">
                    {/* LEFT: Image */}
                    <div
                        className="relative rounded-2xl overflow-hidden h-full min-h-[280px] md:min-h-[320px]"
                        style={{
                            boxShadow: "0 16px 48px rgba(0,0,0,0.4), 0 0 24px rgba(212,175,55,0.08)",
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
                            style={{ background: "linear-gradient(to top, rgba(10,20,40,0.9) 0%, rgba(10,20,40,0.3) 60%)" }}
                        />
                        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3">
                            <Image
                                src="/brand-assets/royal_dynamite_mark.png"
                                alt="Royal Dynamite"
                                width={36}
                                height={36}
                                className="object-contain"
                            />
                            <div>
                                <p className="font-bold text-sm text-white leading-tight">Royal Dynamite Limited</p>
                                <p className="text-rd-gold text-xs">Est. December 2015</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Pillar cards + CTA */}
                    <div className="flex flex-col justify-between h-full gap-3">
                        {/* Static informational pillar cards — no false interactive affordances */}
                        <div className="space-y-3 flex-1">
                            {pillars.map((pillar) => (
                                <div
                                    key={pillar.title}
                                    className="flex items-center gap-5 relative"
                                    style={{
                                        padding: "1.25rem",
                                        background: "rgba(10, 25, 47, 0.8)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)",
                                        borderRadius: "0.75rem",
                                        willChange: "transform, opacity",
                                    }}
                                >
                                    {/* Gold left accent bar — always visible */}
                                    <div
                                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                                        style={{ background: "linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.15))" }}
                                    />

                                    {/* Icon */}
                                    <div
                                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                                        style={{
                                            background: "rgba(212,175,55,0.12)",
                                            border: "1px solid rgba(212,175,55,0.25)",
                                        }}
                                    >
                                        <pillar.icon className="h-5 w-5" style={{ color: "#D4AF37" }} />
                                    </div>

                                    {/* Text */}
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-bold text-base text-white">{pillar.title}</h4>
                                        <p className="text-sm leading-relaxed mt-1 text-slate-300">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA — 56px touch targets per Apple HIG & WCAG 2.5.8 */}
                        <div className="flex gap-3 pt-2 mt-auto">
                            <Button
                                className="bg-rd-gold text-rd-navy hover:bg-rd-gold/90 rounded-full font-bold text-sm px-6 h-14 flex-1 sm:flex-none"
                                asChild
                            >
                                <Link href="/about">
                                    About Us <ArrowRight className="ml-1.5 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/5 rounded-full bg-transparent text-sm px-6 h-14 flex-1 sm:flex-none"
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
