"use client"

import React from "react"
import Image from "next/image"
import { FileText, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { generateWhatsAppLink } from "@/lib/constants"
import { motion } from "framer-motion"

export function BookingCTASection() {
    return (
        <section className="py-20 relative overflow-hidden" id="booking">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu-GEKNL3TVVZ2gadvExpRwqYNOLwDadtH9OkQXrF9d14omEDC-jULpD-Isauu8oDZXmIio_qlxSbFwemnA_LJ52087N4yrX2JXfP1sc4y2hgs3TNCU8jrqL9wUdf_B9x5D5i5s8e2wl9eSZcWQPPErDwdcFlMfbIg65or_f_pmkI9ciPfo68hKccAuTy8ilFhrNJzo1zeSd5HluZH4VlYmo2tIu-QO1luWvqMTa5if7voC_fIgqXA8ZQPMJ8ebtAHaF2bSc06Lz-1"
                    alt="Abstract blurred city lights"
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
                                Book Now
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                Ready for an exceptional journey?
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
                                Whether it&apos;s an airport transfer, a corporate roadshow, or a special event,
                                Royal Dynamite ensures you arrive in style.
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
                                        Request Custom Quote
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
                                    href={generateWhatsAppLink("Hello, I'd like to book a VIP transport service.")}
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
                                        VIP WhatsApp Booking
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
