"use client"

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

// Isolated perpetual animation — prevents parent re-renders
const BouncingPin = React.memo(function BouncingPin() {
    return (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(212,175,55,0.6)]"
        >
            <MapPin className="w-6 h-6" />
        </motion.div>
    );
});

const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 90, damping: 20, delay: i * 0.12 },
    }),
};

export function LocationMap() {
    return (
        <div className="mt-16 max-w-6xl mx-auto">
            <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
                {/* Map iframe */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.54736340478!2d-0.163333!3d5.716667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9ca81794025d%3A0x6b4c107e008479e0!2sAdenta%20Bulldog!5e0!3m2!1sen!2sgh!4v1715000000000!5m2!1sen!2sgh"
                    width="100%"
                    height="300"
                    className="sm:h-[450px]"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Royal Dynamite Limited — Adenta - Bulldog, Accra"
                />

                {/* Floating Location Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
                    <BouncingPin />
                    <div
                        className="backdrop-blur-md px-4 py-2 rounded-lg mt-2"
                        style={{
                            background: "rgba(30, 41, 59, 0.8)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                        }}
                    >
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Royal Dynamite HQ</span>
                    </div>
                </div>

                {/* Floating Glass Card */}
                <div
                    className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    style={{
                        background: "rgba(15, 23, 42, 0.75)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(212, 175, 55, 0.15)",
                    }}
                >
                    <div>
                        <h4 className="text-white font-bold mb-1">Adenta - Bulldog</h4>
                        <p className="text-slate-300 text-sm">Accra, Ghana</p>
                    </div>
                    <motion.a
                        whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                        whileTap={{ scale: 0.97 }}
                        href="https://maps.google.com/?q=Adenta+Bulldog+Accra+Ghana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-slate-900 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 shrink-0"
                    >
                        Get Directions
                    </motion.a>
                </div>
            </div>

            {/* Address & Hours cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                    {
                        label: "Physical Address",
                        content: (
                            <p className="text-sm leading-relaxed text-slate-400">
                                Adenta - Bulldog<br />
                                Accra, Ghana
                            </p>
                        ),
                    },
                    {
                        label: "Opening Hours",
                        content: (
                            <p className="text-sm leading-relaxed text-slate-400">
                                Mon – Fri: 8:00 AM – 6:00 PM<br />
                                Sat: 9:00 AM – 2:00 PM<br />
                                Sun: Closed (VIP Appointments Only)
                            </p>
                        ),
                    },
                ].map((card, i) => (
                    <motion.div
                        key={card.label}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        className="glass-panel p-6 rounded-2xl bg-white/5"
                    >
                        <h4 className="text-xs font-bold uppercase text-[#D4AF37] mb-3 tracking-wider">
                            {card.label}
                        </h4>
                        {card.content}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
