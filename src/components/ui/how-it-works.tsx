"use client";

import { useState } from "react";
import { Search, MessageCircle, Building2, Handshake } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Explore Our Collection",
        description:
            "Browse our handpicked premium vehicles, flexible rental plans, or nationwide freight solutions  all in one place.",
    },
    {
        number: "02",
        icon: MessageCircle,
        title: "Connect With Our Team",
        description:
            "Reach out via WhatsApp, phone, or our enquiry form. Our consultants guide you personally  no pressure, no rush.",
    },
    {
        number: "03",
        icon: Building2,
        title: "Visit & Experience",
        description:
            "Come to our Accra showroom for a test drive, finalise your rental details, or walk through your logistics plan face-to-face.",
    },
    {
        number: "04",
        icon: Handshake,
        title: "Ongoing Partnership",
        description:
            "From paperwork to aftercare, we handle it all. Comprehensive support and a relationship that lasts beyond the handshake.",
    },
];

export function HowItWorks() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            className="relative py-24 overflow-hidden"
            style={{ background: "#132b4d" }}
        >
            {/* Subtle dot pattern background */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Texture overlay */}
            <div className="services-texture absolute inset-0 pointer-events-none" />

            <div className="relative container px-4 md:px-6 z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">
                        Your Journey
                    </p>
                    <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                        How It Works
                    </h2>
                    <div className="w-16 h-1 bg-rd-gold mx-auto mt-5 rounded-full" />
                    <p className="text-white/50 mt-6 max-w-lg mx-auto text-sm leading-relaxed">
                        From first glance to lasting partnership  a premium experience
                        built on trust, personal attention, and your convenience.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* ── Desktop Connecting Line ── */}
                    <div className="hidden md:block absolute top-[3.5rem] left-0 right-0 z-0 px-[calc(12.5%)]">
                        {/* Base line (dim) */}
                        <div className="h-[2px] w-full rounded-full bg-white/[0.06]" />

                        {/* Gold glow overlay  progressive fill based on hovered step */}
                        <div
                            className="absolute top-0 left-0 h-[2px] rounded-full transition-all duration-700 ease-out"
                            style={{
                                width:
                                    hoveredIndex !== null
                                        ? `${((hoveredIndex + 1) / steps.length) * 100}%`
                                        : "0%",
                                background:
                                    "linear-gradient(90deg, #D4AF37 0%, #f5d87a 60%, rgba(212,175,55,0.4) 100%)",
                                boxShadow:
                                    hoveredIndex !== null
                                        ? "0 0 12px rgba(212,175,55,0.5), 0 0 24px rgba(212,175,55,0.2)"
                                        : "none",
                            }}
                        />
                    </div>

                    {/* ── Mobile Connecting Line ── */}
                    <div className="md:hidden absolute top-0 bottom-0 left-8 z-0">
                        {/* Base line (dim) */}
                        <div className="w-[2px] h-full rounded-full bg-white/[0.06]" />

                        {/* Gold glow overlay */}
                        <div
                            className="absolute top-0 left-0 w-[2px] rounded-full transition-all duration-700 ease-out"
                            style={{
                                height:
                                    hoveredIndex !== null
                                        ? `${((hoveredIndex + 1) / steps.length) * 100}%`
                                        : "0%",
                                background:
                                    "linear-gradient(180deg, #D4AF37 0%, #f5d87a 60%, rgba(212,175,55,0.4) 100%)",
                                boxShadow:
                                    hoveredIndex !== null
                                        ? "0 0 12px rgba(212,175,55,0.5), 0 0 24px rgba(212,175,55,0.2)"
                                        : "none",
                            }}
                        />
                    </div>

                    {/* ── Step Cards Grid ── */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-5 relative z-10">
                        {steps.map((step, index) => {
                            const isActive =
                                hoveredIndex !== null && index <= hoveredIndex;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={step.number}
                                    className="timeline-step group"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        transform: isHovered
                                            ? "translateY(-12px)"
                                            : "translateY(0)",
                                        borderColor: isActive
                                            ? "rgba(212, 175, 55, 0.35)"
                                            : "rgba(255, 255, 255, 0.08)",
                                        boxShadow: isHovered
                                            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1)"
                                            : isActive
                                                ? "0 8px 24px rgba(0,0,0,0.3)"
                                                : "none",
                                    }}
                                >
                                    {/* Step Number */}
                                    <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 mb-5">
                                        {/* Number circle */}
                                        <div
                                            className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
                                            style={{
                                                background: isActive
                                                    ? "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)"
                                                    : "rgba(255,255,255,0.03)",
                                                border: `1px solid ${isActive ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                                                boxShadow: isHovered
                                                    ? "0 0 20px rgba(212,175,55,0.15)"
                                                    : "none",
                                            }}
                                        >
                                            <step.icon
                                                className="h-6 w-6 transition-all duration-500"
                                                style={{
                                                    color: isActive
                                                        ? "#D4AF37"
                                                        : "rgba(255,255,255,0.25)",
                                                }}
                                            />

                                            {/* Floating step number badge */}
                                            <span
                                                className="absolute -top-2 -right-2 text-[10px] font-bold w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-500"
                                                style={{
                                                    background: isActive
                                                        ? "linear-gradient(135deg, #D4AF37, #f5d87a)"
                                                        : "rgba(255,255,255,0.06)",
                                                    color: isActive
                                                        ? "#0F223D"
                                                        : "rgba(255,255,255,0.3)",
                                                    boxShadow: isActive
                                                        ? "0 4px 12px rgba(212,175,55,0.3)"
                                                        : "none",
                                                }}
                                            >
                                                {step.number}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="md:text-center">
                                        <h3
                                            className="text-lg font-serif font-bold mb-2 transition-colors duration-500"
                                            style={{
                                                color: isActive
                                                    ? "#ffffff"
                                                    : "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed transition-colors duration-500"
                                            style={{
                                                color: isActive
                                                    ? "rgba(255,255,255,0.6)"
                                                    : "rgba(255,255,255,0.35)",
                                            }}
                                        >
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Gold accent bar at bottom on hover */}
                                    <div
                                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500"
                                        style={{
                                            background: isHovered
                                                ? "linear-gradient(90deg, transparent, #D4AF37, transparent)"
                                                : "transparent",
                                            opacity: isHovered ? 1 : 0,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
