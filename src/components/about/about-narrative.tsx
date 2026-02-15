"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Shield, Gem, Handshake } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

/* ────────────────────────────────────────────
   Stats Data
   ──────────────────────────────────────────── */
const stats = [
    { value: `${new Date().getFullYear() - SITE_CONFIG.yearEstablished}+`, label: "Years in Business" },
    { value: "500+", label: "Vehicles Handled" },
    { value: "4", label: "Core Services" },
    { value: "1,000+", label: "Happy Clients" },
];

/* ────────────────────────────────────────────
   Values Data
   ──────────────────────────────────────────── */
const values = [
    {
        icon: Shield,
        title: "Transparency",
        description:
            "Honest pricing, clear documentation, and no hidden surprises. Every transaction is fully documented.",
    },
    {
        icon: Gem,
        title: "Quality",
        description:
            "Carefully selected vehicles and professional service standards that exceed expectations.",
    },
    {
        icon: Handshake,
        title: "Reliability",
        description:
            "Consistent service you can count on. We honour every commitment we make to our clients.",
    },
];

/* ────────────────────────────────────────────
   Animation Variants
   ──────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const statPop = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

/* ════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════ */
export function AboutNarrative() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rd-gold/[0.03] blur-[120px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                {/* ── Our Story ───────────────────────── */}
                <div className="grid gap-12 lg:grid-cols-2 items-center mb-20 md:mb-28">
                    {/* Text Column */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUp}
                        custom={0}
                    >
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold/70 mb-4">
                            Our Story
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
                            A Decade of Driving <br className="hidden md:block" />
                            <span className="text-rd-gold">Excellence in Ghana</span>
                        </h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed text-[0.95rem]">
                            <p>
                                Founded in December {SITE_CONFIG.yearEstablished}, Royal Dynamite
                                Limited began as a small vehicle dealership with a clear mission: to
                                bring <strong className="text-white font-medium">trust and transparency</strong> to
                                the Ghanaian automotive market.
                            </p>
                            <p>
                                Over the years, we&apos;ve expanded our services to include vehicle
                                rentals, passenger transport, and freight forwarding — always
                                maintaining the same commitment to quality and customer satisfaction.
                            </p>
                            <p>
                                Today, we&apos;re proud to serve individuals and businesses across Ghana,
                                partnering with established organizations like{" "}
                                <strong className="text-white font-medium">
                                    {SITE_CONFIG.partners.join(" & ")}
                                </strong>{" "}
                                and building lasting relationships based on reliability and integrity.
                            </p>
                        </div>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUp}
                        custom={1}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?fm=jpg&q=80&w=1200&auto=format&fit=crop"
                                alt="Royal Dynamite Limited showroom"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                            {/* Gold border accent */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                        </div>
                        {/* Floating badge */}
                        <div
                            className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 px-5 py-3 rounded-xl"
                            style={{
                                background: "rgba(15, 34, 61, 0.9)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: "1px solid rgba(212, 175, 55, 0.25)",
                            }}
                        >
                            <span className="text-2xl md:text-3xl font-serif font-bold text-rd-gold">
                                {new Date().getFullYear() - SITE_CONFIG.yearEstablished}+
                            </span>
                            <span className="block text-[0.7rem] uppercase tracking-[0.15em] text-gray-400 mt-0.5">
                                Years of Trust
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* ── Stats Bar ───────────────────────── */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={statPop}
                            custom={i}
                            className="text-center py-6 px-4 rounded-xl cursor-default"
                            style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                            }}
                        >
                            <div className="text-3xl md:text-4xl font-serif font-bold text-rd-gold mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs uppercase tracking-[0.15em] text-gray-400 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Mission + Values ────────────────── */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    custom={2}
                    className="text-center mb-12"
                >
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold/70 mb-4">
                        Our Mission
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                        What Drives Us Every Day
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        To provide Ghanaians with access to quality vehicles and reliable logistics
                        services, backed by transparency, integrity, and exceptional customer care.
                    </p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-3">
                    {values.map((val, i) => (
                        <motion.div
                            key={val.title}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={fadeUp}
                            custom={3 + i}
                            className="group relative p-6 md:p-8 rounded-xl cursor-default transition-all duration-400"
                            style={{
                                background: "rgba(15, 30, 50, 0.4)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                            }}
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ boxShadow: "0 0 40px rgba(212, 175, 55, 0.06), inset 0 1px 0 rgba(212, 175, 55, 0.1)" }}
                            />

                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: "rgba(212, 175, 55, 0.08)",
                                    border: "1px solid rgba(212, 175, 55, 0.15)",
                                }}
                            >
                                <val.icon className="w-6 h-6 text-rd-gold" />
                            </div>
                            <h3 className="font-serif text-lg font-bold text-white mb-2">
                                {val.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {val.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
