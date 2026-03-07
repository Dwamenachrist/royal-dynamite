"use client"

import React from "react"
import { Shield, Car, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        icon: Shield,
        title: "Professional Chauffeurs",
        description: "Highly trained, discreet, and knowledgeable drivers dedicated to your safety and punctuality across Accra and beyond.",
        delay: 0,
    },
    {
        icon: Car,
        title: "Immaculate Fleet",
        description: "A curated selection of the latest luxury sedans and SUVs, meticulously maintained for the smoothest ride possible.",
        delay: 0.1,
    },
    {
        icon: CheckCircle,
        title: "Reliable & Secure",
        description: "Your security is paramount. We offer real-time tracking, 24/7 support, and strict confidentiality protocols.",
        delay: 0.2,
    },
]

export function ValuePropSection() {
    return (
        <section className="relative z-20 -mt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ type: "spring", stiffness: 90, damping: 20, delay: feature.delay }}
                            whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            className="glass-panel p-8 rounded-2xl group transition-colors hover:border-primary/30"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors border border-primary/20">
                                <Icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
