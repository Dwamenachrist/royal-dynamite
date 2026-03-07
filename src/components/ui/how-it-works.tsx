"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, MessageCircle, Building2, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Explore Our Collection",
        description:
            "Browse our handpicked premium vehicles, flexible rental plans, or nationwide freight solutions — all in one place.",
    },
    {
        number: "02",
        icon: MessageCircle,
        title: "Connect With Our Team",
        description:
            "Reach out via WhatsApp, phone, or our enquiry form. Our consultants guide you personally — no pressure, no rush.",
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
    // Desktop hover state
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Mobile Embla carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
    const [selectedStep, setSelectedStep] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedStep(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        requestAnimationFrame(() => {
            onSelect();
        });
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section
            className="relative py-16 md:py-24 overflow-hidden"
            style={{ background: "#132b4d" }}
        >
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="services-texture absolute inset-0 pointer-events-none" />

            <div className="relative container px-4 md:px-6 z-10">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">
                        Your Journey
                    </p>
                    <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                        How It Works
                    </h2>
                    <div className="w-16 h-1 bg-rd-gold mx-auto mt-5 rounded-full" />
                    <p className="text-white/50 mt-6 max-w-lg mx-auto text-sm leading-relaxed">
                        From first glance to lasting partnership — a premium experience
                        built on trust, personal attention, and your convenience.
                    </p>
                </div>

                {/* ════════════════════════════════
                    MOBILE: Swipeable Step Carousel
                ════════════════════════════════ */}
                <div className="md:hidden">
                    {/* Progress bar */}
                    <div className="flex gap-1.5 mb-6">
                        {steps.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={cn(
                                    "h-1 flex-1 rounded-full transition-all duration-500",
                                    i <= selectedStep ? "bg-rd-gold" : "bg-white/10"
                                )}
                                aria-label={`Go to step ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Step counter + nav */}
                    <div className="flex items-center justify-between mb-5">
                        <span className="text-sm font-bold">
                            <span className="text-rd-gold">{String(selectedStep + 1).padStart(2, "0")}</span>
                            <span className="text-white/30"> / {String(steps.length).padStart(2, "0")}</span>
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={scrollPrev}
                                disabled={selectedStep === 0}
                                className={cn(
                                    "w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300",
                                    selectedStep === 0
                                        ? "border-white/10 text-white/20 cursor-not-allowed"
                                        : "border-rd-gold/40 text-rd-gold hover:bg-rd-gold/10 active:scale-95"
                                )}
                                aria-label="Previous step"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={scrollNext}
                                disabled={selectedStep === steps.length - 1}
                                className={cn(
                                    "w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300",
                                    selectedStep === steps.length - 1
                                        ? "border-white/10 text-white/20 cursor-not-allowed"
                                        : "border-rd-gold/40 text-rd-gold hover:bg-rd-gold/10 active:scale-95"
                                )}
                                aria-label="Next step"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Embla viewport */}
                    <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                        <div className="flex" style={{ touchAction: "pan-y pinch-zoom" }}>
                            {steps.map((step, index) => {
                                const isSelected = selectedStep === index;
                                return (
                                    <div
                                        key={step.number}
                                        className="flex-[0_0_100%] min-w-0"
                                    >
                                        <div
                                            className="mx-1 rounded-2xl p-8 transition-all duration-500"
                                            style={{
                                                background: isSelected
                                                    ? "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(15,34,61,0.6) 100%)"
                                                    : "rgba(255,255,255,0.03)",
                                                border: `1px solid ${isSelected ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                                                minHeight: "280px",
                                            }}
                                        >
                                            {/* Icon + badge */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div
                                                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
                                                    style={{
                                                        background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.04) 100%)",
                                                        border: "1px solid rgba(212,175,55,0.25)",
                                                    }}
                                                >
                                                    <step.icon className="h-7 w-7 text-rd-gold" />
                                                    <span
                                                        className="absolute -top-2 -right-2 text-[10px] font-bold w-6 h-6 rounded-lg flex items-center justify-center"
                                                        style={{
                                                            background: "linear-gradient(135deg, #D4AF37, #f5d87a)",
                                                            color: "#0F223D",
                                                            boxShadow: "0 4px 12px rgba(212,175,55,0.3)",
                                                        }}
                                                    >
                                                        {step.number}
                                                    </span>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="text-rd-gold/60 text-xs uppercase tracking-[0.2em] font-semibold mb-1">
                                                        Step {index + 1}
                                                    </p>
                                                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-white/60 text-base leading-relaxed">
                                                {step.description}
                                            </p>

                                            {/* Swipe hint on first step */}
                                            {index === 0 && (
                                                <div className="flex items-center gap-2 mt-6 text-white/30 text-xs">
                                                    <ChevronRight className="h-3.5 w-3.5 text-rd-gold/40 animate-pulse" />
                                                    <span>Swipe or tap arrows to continue</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ════════════════════════════════
                    DESKTOP: Hover-interactive grid
                ════════════════════════════════ */}
                <div className="hidden md:block relative">
                    {/* Connecting line */}
                    <div className="absolute top-[3.5rem] left-0 right-0 z-0 px-[calc(12.5%)]">
                        <div className="h-[2px] w-full rounded-full bg-white/[0.06]" />
                        <div
                            className="absolute top-0 left-0 h-[2px] rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: hoveredIndex !== null ? `${((hoveredIndex + 1) / steps.length) * 100}%` : "0%",
                                background: "linear-gradient(90deg, #D4AF37 0%, #f5d87a 60%, rgba(212,175,55,0.4) 100%)",
                                boxShadow: hoveredIndex !== null ? "0 0 12px rgba(212,175,55,0.5), 0 0 24px rgba(212,175,55,0.2)" : "none",
                            }}
                        />
                    </div>

                    {/* Step cards */}
                    <div className="grid grid-cols-4 gap-5 relative z-10">
                        {steps.map((step, index) => {
                            const isActive = hoveredIndex !== null && index <= hoveredIndex;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={step.number}
                                    className="timeline-step group"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{
                                        transform: isHovered ? "translateY(-12px)" : "translateY(0)",
                                        borderColor: isActive ? "rgba(212, 175, 55, 0.35)" : "rgba(255, 255, 255, 0.08)",
                                        boxShadow: isHovered
                                            ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1)"
                                            : isActive
                                                ? "0 8px 24px rgba(0,0,0,0.3)"
                                                : "none",
                                    }}
                                >
                                    <div className="flex flex-col items-center gap-3 mb-5">
                                        <div
                                            className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
                                            style={{
                                                background: isActive
                                                    ? "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)"
                                                    : "rgba(255,255,255,0.03)",
                                                border: `1px solid ${isActive ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                                                boxShadow: isHovered ? "0 0 20px rgba(212,175,55,0.15)" : "none",
                                            }}
                                        >
                                            <step.icon
                                                className="h-6 w-6 transition-all duration-500"
                                                style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.25)" }}
                                            />
                                            <span
                                                className="absolute -top-2 -right-2 text-[10px] font-bold w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-500"
                                                style={{
                                                    background: isActive ? "linear-gradient(135deg, #D4AF37, #f5d87a)" : "rgba(255,255,255,0.06)",
                                                    color: isActive ? "#0F223D" : "rgba(255,255,255,0.3)",
                                                    boxShadow: isActive ? "0 4px 12px rgba(212,175,55,0.3)" : "none",
                                                }}
                                            >
                                                {step.number}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <h3
                                            className="text-lg font-serif font-bold mb-2 transition-colors duration-500"
                                            style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)" }}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className="text-sm leading-relaxed transition-colors duration-500"
                                            style={{ color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}
                                        >
                                            {step.description}
                                        </p>
                                    </div>

                                    <div
                                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500"
                                        style={{
                                            background: isHovered ? "linear-gradient(90deg, transparent, #D4AF37, transparent)" : "transparent",
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
