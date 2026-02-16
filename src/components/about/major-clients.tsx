"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const CLIENTS = [
    "Yakman Group of Companies",
    "Kwarteng and Co Consult",
    "Double C Enterprise",
    "Askraf International Company Ltd",
    "Agye Nyame Company",
];

export function MajorClients() {
    return (
        <section className="py-24 bg-background-dark relative overflow-hidden">
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3"
                    >
                        Trusted Partnerships
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
                    >
                        Major Clients & Customers
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-24 h-1 bg-rd-gold mx-auto rounded-full"
                    />
                </div>

                {/* Animated Connecting Timeline */}
                <div className="relative">
                    {/* Connecting Line - Horizontal on Desktop */}
                    <div className="absolute top-[50%] left-0 w-full h-[1px] bg-white/10 hidden md:block -translate-y-1/2" />

                    {/* Travelling Dot Animation */}
                    <div className="absolute top-[50%] left-0 w-full h-[1px] hidden md:block -translate-y-1/2 overflow-hidden">
                        <motion.div
                            className="w-[100px] h-full bg-gradient-to-r from-transparent via-rd-gold to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {CLIENTS.map((client, index) => (
                            <motion.div
                                key={client}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative flex flex-col items-center"
                            >
                                {/* Node Dot */}
                                <div className="w-4 h-4 rounded-full bg-background-dark border-2 border-rd-gold mb-6 relative z-10 hidden md:block group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                                    <div className="absolute inset-0 bg-rd-gold rounded-full opacity-0 group-hover:animate-ping" />
                                </div>

                                <div className="absolute top-[50%] left-0 md:hidden w-[1px] h-full bg-white/10 " />

                                <div className="relative w-full h-full bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:bg-white/[0.06] hover:border-rd-gold/30 transition-all duration-500 flex flex-col items-center text-center group-hover:-translate-y-2">
                                    <div className="w-10 h-10 rounded-full bg-rd-gold/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500 border border-rd-gold/20">
                                        <Building2 className="w-5 h-5 text-rd-gold" />
                                    </div>
                                    <h3 className="text-sm font-serif font-medium text-slate-200 group-hover:text-rd-gold transition-colors duration-300 leading-tight">
                                        {client}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
