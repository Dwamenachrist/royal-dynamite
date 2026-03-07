"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, generateWhatsAppLink } from "@/lib/constants";

// The Mathematics of Heavy Friction: Primary Cinematic Reveal
const DURATION = 1.4;
const EASE = [0.19, 1.0, 0.22, 1.0] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.98, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: DURATION, ease: EASE } }
};

export function InteractiveHero() {
    const containerRef = useRef<HTMLElement>(null);
    const magneticButtonRef = useRef<HTMLAnchorElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const prefersReducedMotion = useReducedMotion();

    const { scrollY } = useScroll();
    // Parallax on image
    const y = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 250]);
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);

    // Detect touch/pointer capability once mounted
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsTouchDevice(window.matchMedia("(hover: none)").matches);
        });
    }, []);

    // Magnetic cursor — desktop pointer devices only
    useEffect(() => {
        if (isTouchDevice) return;
        const button = magneticButtonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;
            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance < 100) {
                const strength = 0.4;
                button.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px)`;
            } else {
                button.style.transform = "translate(0, 0)";
            }
        };

        const handleMouseLeave = () => {
            button.style.transform = "translate(0, 0)";
        };

        document.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isTouchDevice]);

    return (
        <section
            ref={containerRef}
            className="relative flex flex-col md:flex-row md:items-center overflow-hidden bg-rd-navy"
            style={{ minHeight: "100dvh" }}
        >
            {/* ── Background Image ── */}
            <div className="absolute inset-0 bg-rd-navy overflow-hidden">
                <motion.div
                    style={{ y: isTouchDevice ? 0 : y, opacity }}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: EASE }}
                    className="relative h-[120%] w-full -top-[10%]"
                >
                    <Image
                        src="/hero-premium-fleet.png"
                        alt="Royal Dynamite Premium Fleet"
                        fill
                        className={`object-cover object-center transition-opacity duration-[1.5s] ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        priority
                        quality={90}
                        sizes="100vw"
                        onLoad={() => setIsLoaded(true)}
                    />
                </motion.div>

                {/* Desktop: dark left → transparent right */}
                <div
                    className="absolute inset-0 z-10 hidden md:block"
                    style={{ background: "linear-gradient(to right, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.85) 30%, rgba(10,22,40,0.4) 55%, transparent 80%)" }}
                />
                {/* Mobile: strong top + dramatic bottom-up vignette */}
                <div
                    className="absolute inset-0 z-10 md:hidden pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.2) 35%, rgba(10,22,40,0.8) 65%, rgba(10,22,40,0.99) 100%)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-rd-navy/50 z-10 pointer-events-none" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-20 container px-4 md:px-6 lg:px-12 pt-20 md:pt-24 md:pb-40 w-full flex-1 flex flex-col md:block">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-3xl w-full mx-auto md:mx-0 text-center md:text-left flex-1 flex flex-col md:block"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="inline-flex items-center justify-center md:justify-start w-full md:w-auto mb-6 md:mb-8">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-rd-gold/20 bg-rd-gold/[0.08] backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-rd-gold animate-pulse" />
                            <span className="text-rd-gold text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
                                Est. {SITE_CONFIG.yearEstablished} &middot; Accra, Ghana
                            </span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.div variants={itemVariants}>
                        <h1 className="text-[3rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold tracking-tight text-white mb-6">
                            <span className="block drop-shadow-2xl">Arrive in</span>
                            <span className="mt-2 block font-bold text-transparent bg-clip-text bg-gradient-to-r from-rd-gold via-[#ffe8a1] to-rd-gold drop-shadow-2xl pb-2">
                                Excellence<span className="text-rd-gold">.</span>
                            </span>
                        </h1>
                    </motion.div>

                    {/* Description Section */}
                    <motion.div variants={itemVariants} className="mt-4 mb-10 md:mt-8 md:mb-12 flex items-stretch">
                        <div className="w-1 bg-gradient-to-b from-rd-gold/80 to-rd-gold/20 mr-6 hidden md:block rounded-full" />
                        <p className="text-base md:text-xl text-white/70 font-light leading-relaxed max-w-md mx-auto md:mx-0 drop-shadow-md">
                            Bespoke automotive solutions for Ghana&apos;s most discerning clients. Where ultimate reliability meets executive status.
                        </p>
                    </motion.div>

                    {/* The Thumb-Zone Matrix: CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-auto pb-8 sm:pb-0"
                    >
                        <Button
                            size="lg"
                            className="group relative w-full sm:w-auto h-14 px-8 rounded-full bg-[#D4AF37] text-[#0a192f] hover:bg-[#f5d87a] font-bold text-base shadow-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center overflow-hidden"
                            asChild
                        >
                            <Link ref={magneticButtonRef} href="/dealership">
                                <span className="relative z-10 flex items-center">
                                    Browse Collection
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="group w-full sm:w-auto h-14 px-8 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 font-medium text-base transition-all duration-300 flex items-center justify-center"
                            asChild
                        >
                            <Link href={generateWhatsAppLink("I'm interested in VIP Concierge services.")} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 w-5 h-5" />
                                VIP Concierge
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Mobile Scroll Indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 md:hidden pointer-events-none"
            >
                <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <ChevronDown className="h-4 w-4 text-rd-gold/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
