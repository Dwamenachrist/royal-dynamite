"use client"

import React, { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Shield, Car, Ship, Crown, Key, ChevronDown } from "lucide-react"

const CARDS = [
    {
        id: "dealership",
        title: "Dealership",
        subtitle: "Curated Excellence",
        icon: Car,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdgAH7Bh7BRErwZhbeNKXFoJkJC53XaPn95wAkX2GZVJ7DlVr8n3kgdMbrKg3lVGKdGIgJ3YbrpDB953RupxDdiaNDm707ug89z7in3lWmHLQy6H_-EgYXFv53IUckEDuiRC1N1YqVzPU0kdkWaBlNCBdUhrWbTty2Tx4ca5L39eMn3t8pcHBJsg-4rim0M0gjeiEkUqgIS9cIW5W0Eb1I5zmXK1kFARji1ZxKH2_dHczeKGKl1UNGwLvsTqWCnacBmI8847Ja3R6s"
    },
    {
        id: "rentals",
        title: "Rentals",
        subtitle: "Luxury On Demand",
        icon: Key,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJxBjUl8Dg66D9DsMBxQrbPtPNL3HCfRyEyHXzyiJamEEmOnp_ms0ZXugo4P1FXA8K1LraWJlOrzyu1GcE7zSX9z6_IDqtBN51ggdGguFp73SbFyyuJzE9NK8RggCRadfCM-UoAu0A1gzEtJST8OYGYZSwbo8acJJX6Wg9EsaYrmj0VbzG_Bf9Am1KrlJRXY-iU5o0TnTPJTjn1zefn4oIK25m0Xv-pqqvZ-1_V8YCbL7h_72AmyZGrjLLNEnCmHUe-0cxolX1sK8O"
    },
    {
        id: "transport",
        title: "Transport",
        subtitle: "Elite Mobility",
        icon: Shield,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2rVqHe0N0R6LoxiAHGRo47u46_f2XTc9al-IeymrZIuLgf9pqTttMdZNK2mYlPH78MD_nqWC9RG8J7wuYgr1S_JZzxTifXmEckUIHlAeywuF3WmRjlDNKtn5lLXsXz-KmzaSZUWQQOQn_tc8_Rz5KfIyiDeqwoNyhmUHfsJruMD6aNHNb_9VQ8Wv842AGqWrUONCWN4EG1SWawH7WQ-ZPxMGin1S_O3Tm6Hi1aO6I77UAGRtsxFeLfL0hwJnN18vZ3vjOiSqZjfZQ"
    },
    {
        id: "freight",
        title: "Freight",
        subtitle: "Global Logistics",
        icon: Ship,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFbX-t3B-RcOWOjsA4wSXP8u-84q2EBqbZ0vinn3dN_5rUFnoX2b8_f3BZ6gqpfJj4yakm7TXwYyVzTKk4KJmXx2pDj9kJIB_Z0QY06IemDBHHZp19QF6XL-O-280KuXJazG569ydY6eBH5QmNdPVJ4o5lHRqfv3BIS2M6GJ0H_Lrh01lnI8uGSa-NJO2ty3BMjtrRmDHuWPjWFgExTg2WTzIj9kU2wFVP1N50Nt4J6uv8d44uOYQlKXHm8O6cZNcmhCXurcBhtd_q"
    }
]

export function MobileDiamondHero() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollContainerRef = React.useRef<HTMLDivElement>(null)

    // Global scroll for subtle parallax on mobile exit
    const { scrollYProgress } = useScroll()
    const yBg = useTransform(scrollYProgress, [0, 0.2], ["0%", "10%"])
    const yEmblem = useTransform(scrollYProgress, [0, 0.2], ["0px", "-50px"])
    const opacityEmblem = useTransform(scrollYProgress, [0, 0.15], [1, 0])

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget
        const scrollLeft = target.scrollLeft
        // Calculate index based on scroll position vs total scrollable width
        const index = Math.round((scrollLeft / target.scrollWidth) * CARDS.length)
        if (index !== currentIndex && index >= 0 && index < CARDS.length) {
            setCurrentIndex(index)
        }
    }

    const scrollTo = (index: number) => {
        if (!scrollContainerRef.current) return
        const target = scrollContainerRef.current
        const cardWidth = target.scrollWidth / CARDS.length
        target.scrollTo({ left: index * cardWidth, behavior: "smooth" })
        setCurrentIndex(index)
    }

    return (
        <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center bg-background-dark pt-16 pb-12 lg:hidden">
            {/* Background */}
            <motion.div
                style={{ y: yBg }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJxBjUl8Dg66D9DsMBxQrbPtPNL3HCfRyEyHXzyiJamEEmOnp_ms0ZXugo4P1FXA8K1LraWJlOrzyu1GcE7zSX9z6_IDqtBN51ggdGguFp73SbFyyuJzE9NK8RggCRadfCM-UoAu0A1gzEtJST8OYGYZSwbo8acJJX6Wg9EsaYrmj0VbzG_Bf9Am1KrlJRXY-iU5o0TnTPJTjn1zefn4oIK25m0Xv-pqqvZ-1_V8YCbL7h_72AmyZGrjLLNEnCmHUe-0cxolX1sK8O"
                    alt="Atmosphere"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            </motion.div>

            {/* Emblem Header */}
            <motion.div
                style={{ y: yEmblem, opacity: opacityEmblem }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1.0] as [number, number, number, number] }}
                className="relative z-30 flex flex-col items-center justify-center mb-10 w-full px-4 pt-10"
            >
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center bg-background-dark/80 backdrop-blur-md relative mb-6">
                    <div className="absolute inset-0 rounded-full shadow-[0_0_20px_var(--color-primary)] opacity-40" />
                    <Crown className="w-8 h-8 text-primary" strokeWidth={1} />
                </div>
                <h1 className="text-2xl font-display font-bold text-white tracking-widest uppercase text-center relative flex flex-col items-center gap-1">
                    <span className="text-white">Royal</span>
                    <span className="text-gradient-gold">Dynamite</span>
                </h1>
                <p className="text-primary/60 text-[9px] tracking-[0.4em] mt-3 uppercase font-semibold">The Ecosystem</p>
            </motion.div>

            {/* Native Scroll-Snap Deck */}
            <motion.div
                style={{ y: yBg }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.165, 0.84, 0.44, 1.0] as [number, number, number, number] }}
                className="relative z-20 w-full overflow-hidden mb-8"
            >
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-[10vw] pb-10 pt-4 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="snap-center shrink-0 w-[80vw] max-w-[320px] aspect-[3/4] relative rounded-2xl overflow-hidden bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-end p-6 select-none ring-1 ring-inset ring-white/5 transition-transform active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-cover opacity-70"
                                    draggable={false}
                                    priority
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[#060D1A]/60 to-transparent pointer-events-none" />
                            </div>

                            <div className="relative z-10 pl-2">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-rd-gold/10 border border-rd-gold/20 flex items-center justify-center backdrop-blur-md">
                                            {React.createElement(card.icon, { className: "w-5 h-5 text-rd-gold" })}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-wide mb-1 drop-shadow-md">{card.title}</h3>
                                <p className="text-[10px] text-rd-gold uppercase tracking-widest font-semibold">{card.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Pagination Controls */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="relative z-30 flex items-center justify-center gap-3 mt-10"
            >
                {CARDS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollTo(idx)}
                        className={`transition-all duration-300 rounded-full h-1.5 ${idx === currentIndex ? "w-8 bg-rd-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: opacityEmblem }}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: [0, 10, 0]
                }}
                transition={{
                    opacity: { duration: 1, delay: 1.5 },
                    y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
            >
                <span className="text-[8px] uppercase tracking-[0.3em] text-rd-gold/50 font-medium">Scroll</span>
                <ChevronDown className="w-5 h-5 text-rd-gold/40" strokeWidth={1.5} />
            </motion.div>
        </section>
    )
}
