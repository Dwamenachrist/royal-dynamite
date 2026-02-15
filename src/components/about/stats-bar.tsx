"use client"

import React from "react"
import { motion } from "framer-motion"

export function StatsBar() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    return (
        <section className="py-20 relative border-y border-white/5 bg-background-dark/50 overflow-hidden">
            {/* Carbon Fiber Texture Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="glass-panel rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left border border-white/5"
                >

                    <StatItem value="10+" label="Years of Excellence" />

                    <div className="hidden md:block w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                    <StatItem value="500+" label="VIP Clients Served" />

                    <div className="hidden md:block w-[1px] h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

                    <StatItem value="24/7" label="Concierge Support" />

                </motion.div>
            </div>
        </section>
    )
}

function StatItem({ value, label }: { value: string, label: string }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    }

    return (
        <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start group"
        >
            <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-[#eecf6d] to-primary mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                {value}
            </span>
            <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold">
                {label}
            </span>
        </motion.div>
    )
}
