"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";

const CLIENTS = [
    "Yakman Group of Companies",
    "Kwarteng and Co Consult",
    "Double C Enterprise",
    "Askraf International Company Ltd",
    "Agye Nyame Company",
];

export function MajorClients() {
    return (
        <section className="relative py-20 overflow-hidden" style={{ background: '#0a1628' }}>
            {/* Subtle dot-grid */}
            <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
            {/* Central bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-rd-gold/[0.05] blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

                {/* Header */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-bold uppercase tracking-[0.28em] text-rd-gold mb-3"
                >
                    Trusted Partnerships
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 }}
                    className="text-2xl md:text-3xl font-serif font-bold text-white mb-2"
                >
                    Major Clients &amp; Customers
                </motion.h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ delay: 0.18, duration: 0.8, ease: [0.165, 0.84, 0.44, 1.0] as [number, number, number, number] }}
                    className="w-16 h-[2px] bg-rd-gold mx-auto rounded-full mb-12"
                    style={{ willChange: "transform" }}
                />

                {/* Client chips - Mobile Tactile Matrix */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:pb-0 [&::-webkit-scrollbar]:hidden mask-edge-fade md:mask-none"
                >
                    {CLIENTS.map((client) => (
                        <motion.div
                            key={client}
                            variants={{
                                hidden: { opacity: 0, x: 20, scale: 0.95 },
                                visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1.0] as [number, number, number, number] } },
                            }}
                            className="snap-start shrink-0 group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] transition-all duration-500 cursor-default lg:hover:border-rd-gold/35 lg:hover:bg-rd-gold/[0.05]"
                            style={{ willChange: "transform, opacity" }}
                        >
                            <Crown className="w-3 h-3 text-rd-gold/40 group-hover:text-rd-gold/80 transition-colors duration-300 shrink-0" />
                            <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors duration-300 whitespace-nowrap">
                                {client}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footnote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 text-[10px] uppercase tracking-[0.22em] text-white/20"
                >
                    And many more valued partners across Ghana
                </motion.p>

            </div>
        </section>
    );
}
