"use client";

import { motion, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { Shield, Car, Clock, CheckCircle } from "lucide-react";

export function PremiumTrustBar() {
    const prefersReducedMotion = useReducedMotion();

    const stats = [
        { icon: Shield, value: 10, suffix: "+", label: "Years in Business" },
        { icon: Car, value: 500, suffix: "+", label: "Vehicles Sold" },
        { icon: Clock, value: 24, suffix: "/7", label: "Customer Support" },
        { icon: CheckCircle, value: 100, suffix: "%", label: "Documentation" },
    ];

    return (
        <section className="relative">
            {/* PREMIUM TRUST BAR: Standalone section below hero */}
            <div
                className="pt-16 pb-16 md:pt-20 md:pb-20"
                style={{
                    background: 'linear-gradient(180deg, #0a192f 0%, #0F223D 30%, #132b4d 60%, #D4AF37 100%)',
                }}
            >
                {/* Texture overlay with matching rounded corners */}
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.3)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 container px-4 md:px-6 lg:px-12">
                    <motion.p
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-sm uppercase tracking-[0.2em] text-rd-gold/90 font-semibold mb-10"
                    >
                        Trusted Across Ghana
                    </motion.p>

                    {/* Stats Grid — informational only, NOT clickable */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: 0.6 }}
                            >
                                <div className="bg-white/[0.06] border border-white/[0.10] rounded-2xl p-6 md:p-8 text-center">
                                    {/* Gold Outline Icon */}
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-rd-gold/30 bg-rd-gold/[0.06] mb-5">
                                        <stat.icon className="h-6 w-6 text-rd-gold" strokeWidth={1.5} />
                                    </div>

                                    {/* Counter Animation */}
                                    <p className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                                        {prefersReducedMotion ? (
                                            `${stat.value}${stat.suffix}`
                                        ) : (
                                            <CountUp
                                                end={stat.value}
                                                suffix={stat.suffix}
                                                duration={2}
                                                enableScrollSpy
                                                scrollSpyOnce
                                            />
                                        )}
                                    </p>

                                    {/* Label — improved contrast */}
                                    <p className="text-xs text-white/70 font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
