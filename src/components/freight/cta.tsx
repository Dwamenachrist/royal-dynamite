"use client"

import React from "react"
import Image from "next/image"
import { FileText, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { generateWhatsAppLink } from "@/lib/constants"
import { motion } from "framer-motion"

export function FreightCTA() {
    return (
        <section className="py-20 relative overflow-hidden" id="contact">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1494412651409-ae1e0ee87a00?q=80&w=2070&auto=format&fit=crop"
                    alt="Logistics Operations"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-background-dark/92" />
            </div>

            <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                <div className="glass-panel rounded-2xl border-t border-primary/25 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">

                        {/* Left: headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ type: "spring", stiffness: 80, damping: 20 }}
                            className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]/70 mb-4">
                                Get a Quote
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                Complex Shipment? Talk to Our Logistics Experts.
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
                                We specialize in handling intricate logistics challenges. Get a tailored solution
                                today and experience the Royal Dynamite difference.
                            </p>
                        </motion.div>

                        <div className="hidden lg:block w-px bg-white/[0.06] self-stretch" />
                        <div className="lg:hidden h-px bg-white/[0.06]" />

                        {/* Right: actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
                            className="flex flex-col gap-4 p-8 md:p-12 lg:p-14 justify-center lg:min-w-[320px]"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <Link
                                    href="/contact"
                                    className="flex items-center justify-between gap-3 w-full min-h-[56px] px-6 py-4
                                               bg-[#D4AF37] text-[#0a192f] rounded-xl font-bold text-sm tracking-wide
                                               hover:bg-[#e8c84a] transition-colors duration-200 group"
                                >
                                    <span className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 shrink-0" />
                                        Start Your Quote Online
                                    </span>
                                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <a
                                    href={generateWhatsAppLink("Hello, I need a freight quotation for a shipment to Ghana.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between gap-3 w-full min-h-[56px] px-6 py-4
                                               bg-white/[0.05] border border-green-500/25 text-green-400 rounded-xl
                                               font-bold text-sm tracking-wide
                                               hover:bg-green-500/10 hover:border-green-500/50 transition-colors duration-200 group"
                                >
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                            <MessageCircle className="w-3 h-3" />
                                        </div>
                                        Speak to an Agent
                                    </span>
                                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
