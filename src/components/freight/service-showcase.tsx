"use client"

import React from "react"
import Image from "next/image"
import { Plane, Truck, Car, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface FreightService {
    title: string
    image: string
    type: string
    iconName: "plane" | "truck" | "car"
    description: string
    popular: boolean
}

const iconMap: Record<FreightService["iconName"], LucideIcon> = {
    plane: Plane,
    truck: Truck,
    car: Car,
}

const freightServices: FreightService[] = [
    {
        title: "Global Air & Sea Freight",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
        type: "Express & Standard",
        iconName: "plane",
        description: "Comprehensive air and ocean freight solutions connecting Ghana to global markets. From urgent air cargo to cost-effective sea containers.",
        popular: false,
    },
    {
        title: "Premium Road Haulage",
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop",
        type: "Cross-Border",
        iconName: "truck",
        description: "Reliable cross-border transport across West Africa. Our modern fleet ensures your goods arrive safely and on schedule.",
        popular: true,
    },
    {
        title: "Specialized Vehicle Transport",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1474&auto=format&fit=crop",
        type: "Safe Relocation",
        iconName: "car",
        description: "Safe & secure vehicle relocation services. We specialize in transporting luxury, classic, and high-performance vehicles without a scratch.",
        popular: false,
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 90, damping: 20 },
    },
}

export function FreightShowcase() {
    return (
        <section className="py-20 bg-background-dark relative overflow-hidden" id="services">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 90, damping: 20 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-3">
                        Operational Excellence
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">LOGISTICS SOLUTIONS</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Desktop: asymmetric grid — popular card elevated */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="hidden lg:grid lg:grid-cols-[1fr_1.08fr_1fr] gap-6 items-start"
                >
                    {freightServices.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={cardVariants}
                            style={item.popular ? { marginTop: "-1.5rem" } : {}}
                        >
                            <ServiceCard item={item} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile: horizontal snap scroll */}
                <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-2 px-2 no-scrollbar">
                    {freightServices.map((item) => (
                        <div key={item.title} className="snap-center shrink-0 w-[88vw] max-w-[360px]">
                            <ServiceCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ServiceCard({ item }: { item: FreightService }) {
    const Icon = iconMap[item.iconName]

    return (
        <motion.div
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            className={`glass-panel border ${item.popular ? "border-primary/40" : "border-glass-stroke"} rounded-2xl overflow-hidden group flex flex-col h-full relative`}
        >
            {item.popular && (
                <div className="absolute top-4 right-4 z-20 bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    HIGH DEMAND
                </div>
            )}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 34vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-primary text-background-dark text-xs font-bold rounded uppercase flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {item.type}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h4 className={`text-xl font-bold ${item.popular ? "text-primary" : "text-white"}`}>
                        {item.title}
                    </h4>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-grow">{item.description}</p>

                <Button
                    className={`w-full min-h-[48px] text-sm font-bold tracking-widest uppercase
                        ${item.popular
                            ? "btn-primary hover:bg-white hover:text-background-dark"
                            : "btn-secondary"
                        }`}
                    asChild
                >
                    <Link href="/contact">Learn More</Link>
                </Button>
            </div>
        </motion.div>
    )
}
