"use client"

import React from "react"
import { motion, animate } from "framer-motion"

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
    // Extract numeric part and suffix
    const numericPart = parseInt(value.replace(/\D/g, '')) || 0
    const suffix = value.replace(/[0-9]/g, '')

    return (
        <div className="flex flex-col items-center md:items-start group">
            <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-[#eecf6d] to-primary mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg font-display">
                <Counter from={0} to={numericPart} duration={2} />
                <span>{suffix}</span>
            </div>
            <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold">
                {label}
            </span>
        </div>
    )
}

function Counter({ from, to, duration }: { from: number, to: number, duration: number }) {
    const nodeRef = React.useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
        const node = nodeRef.current
        if (!node) return

        const controls = animate(from, to, {
            duration,
            onUpdate(value) {
                node.textContent = value.toFixed(0)
            },
            ease: "easeOut"
        })

        return () => controls.stop()
    }, [from, to, duration])

    return <span ref={nodeRef} />
}
