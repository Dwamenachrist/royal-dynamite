"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, generateWhatsAppLink } from "@/lib/constants";

export function InteractiveHero() {
    const containerRef = useRef<HTMLElement>(null);
    const magneticButtonRef = useRef<HTMLAnchorElement>(null);
    const [displayText, setDisplayText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const fullText = "Excellence";
    const prefersReducedMotion = useReducedMotion();

    // Parallax: Image moves down as user scrolls (bounded 0-200px over 1000px scroll)
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 200]);

    // Typewriter effect with randomized delay
    useEffect(() => {
        let currentIndex = 0;
        let timeoutId: NodeJS.Timeout;

        // Initial start delay
        const startTimeout = setTimeout(() => {
            const typeNextChar = () => {
                if (currentIndex < fullText.length) {
                    setDisplayText(fullText.slice(0, currentIndex + 1));
                    currentIndex++;

                    // Random delay between 50ms and 150ms for realism
                    const randomDelay = Math.random() * 100 + 50;
                    timeoutId = setTimeout(typeNextChar, randomDelay);
                } else {
                    setIsTypingComplete(true);
                }
            };
            typeNextChar();
        }, 800);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(timeoutId);
        };
    }, []);

    // Enhanced Magnetic cursor effect (preserved from previous implementation)
    useEffect(() => {
        const button = magneticButtonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;

            const distanceX = e.clientX - buttonCenterX;
            const distanceY = e.clientY - buttonCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            const magneticRadius = 100;
            if (distance < magneticRadius) {
                const strength = 0.4;
                const x = distanceX * strength;
                const y = distanceY * strength;
                button.style.transform = `translate(${x}px, ${y}px)`;
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
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100vh] flex items-center overflow-hidden bg-rd-navy">
            {/* Background Image with Ken Burns Effect & Parallax */}
            <div className="absolute inset-0 bg-rd-navy">
                <motion.div
                    style={{ y }} // Apply Parallax
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 20, ease: "easeOut" }}
                    className="relative h-[120%] w-full -top-[10%]" // Increase height for parallax room
                >
                    <Image
                        src="/hero-premium-fleet.png"
                        alt="Royal Dynamite Premium Fleet"
                        fill
                        className={`object-cover object-center transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        priority
                        quality={90}
                        sizes="100vw"
                        onLoad={() => setIsLoaded(true)}
                    />
                </motion.div>

                {/* Gradients */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: "linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.5) 45%, transparent 70%)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-rd-navy/40 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container px-4 md:px-6 lg:px-12 pt-20 pb-24 md:pt-24 md:pb-48">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-rd-gold/20 bg-rd-gold/[0.08] backdrop-blur-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-rd-gold animate-pulse" />
                        <span className="text-rd-gold text-xs font-semibold tracking-[0.2em] uppercase">
                            Est. {SITE_CONFIG.yearEstablished} &middot; Accra, Ghana
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-[0.95] mb-6">
                            <span className="block drop-shadow-2xl">Arrive in</span>
                            <span className="block mt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-rd-gold via-[#f5d87a] to-rd-gold drop-shadow-2xl h-[1.1em] flex items-center">
                                {displayText}
                                {/* Cursor: Blinks while typing, then stays solid or disappears? Code implies it disappears if !isTypingComplete check used, but Moyo ref has it blink. 
                                    Let's keep it blinking if not complete, or maybe always blinking? 
                                    The reference code shows: {!isTypingComplete && (<span ... animate-pulse ... />)} 
                                    So it DISAPPEARS after typing. */}
                                {!isTypingComplete && (
                                    <span className="w-1.5 h-[0.8em] bg-rd-gold animate-cursor-blink ml-1 inline-block align-middle" />
                                )}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Description with Gold Stick Reveal */}
                    <div className="mt-8 mb-12 flex items-stretch overflow-hidden min-h-[5rem]">
                        {/* The Gold Stick */}
                        <motion.div
                            initial={{ scaleY: 0, originY: 0 }}
                            animate={{ scaleY: isTypingComplete ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-1.5 bg-rd-gold mr-6 h-auto self-stretch shrink-0"
                        />

                        {/* The Subtext Reveal */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: isTypingComplete ? 1 : 0,
                                x: isTypingComplete ? 0 : -20
                            }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex items-center"
                        >
                            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed drop-shadow-lg">
                                Bespoke automotive solutions for Ghana&apos;s most discerning clients. Where reliability meets executive status.
                            </p>
                        </motion.div>
                    </div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isTypingComplete ? 1 : 0 }} // Wait for text to finish? Or just standard delay? Let's verify.
                        // User might want standard delay. Let's use a fixed delay to ensure they appear eventually.
                        transition={{ duration: 0.6, delay: 0.4 }} // Stagger shortly after text finishes
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button
                            size="lg"
                            className="group relative h-14 px-8 rounded-full bg-rd-gold text-rd-navy hover:bg-[#f5d87a] font-bold text-base shadow-[0_0_32px_rgba(212,175,55,0.35)] hover:shadow-[0_0_48px_rgba(212,175,55,0.5)] transition-all duration-300 overflow-hidden"
                            asChild
                        >
                            <Link
                                ref={magneticButtonRef}
                                href="/dealership"
                                className="transition-transform duration-200 ease-out will-change-transform block"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                                <span className="relative flex items-center">
                                    Browse Collection{" "}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 rounded-full border-white/25 text-white bg-white/[0.08] backdrop-blur-sm hover:bg-white/[0.15] hover:border-white/40 hover:scale-105 font-medium text-base transition-all duration-300"
                            asChild
                        >
                            <a
                                href={generateWhatsAppLink(
                                    "Hello, I'd like to inquire about Royal Dynamite's premium services."
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                VIP Concierge
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
