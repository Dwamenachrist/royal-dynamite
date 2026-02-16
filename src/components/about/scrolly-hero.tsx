"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Image from "next/image"
import { Shield, Car, Ship, Crown, Key } from "lucide-react"

export function ScrollyHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // -- PHYSICS ENGINE: HEAVY GLASS --
    // High stiffness + high damping = heavy, precise snap with micro-recoil
    const physicsTransition = { type: "spring", stiffness: 300, damping: 40, mass: 1.2 }

    // -- PHASE 1 & 2: MAGNETIC PULL (0% -> 70%) --
    // Diamond Layout Targets with "Heavy" interpolation

    // Top: Dealership
    const dealershipY = useTransform(scrollYProgress, [0.1, 0.6], ["-120vh", "-350px"])
    // Left: Transport
    const transportX = useTransform(scrollYProgress, [0.1, 0.6], ["-120vw", "-450px"])
    // Right: Freight
    const freightX = useTransform(scrollYProgress, [0.1, 0.6], ["120vw", "450px"])
    // Bottom: Rentals
    const rentalsY = useTransform(scrollYProgress, [0.1, 0.6], ["120vh", "350px"])

    // Opacity
    const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])

    // Rotation Snap (Micro-adjustments for heavy feel)
    const rotateLeft = useTransform(scrollYProgress, [0.2, 0.6], [-10, 0])
    const rotateRight = useTransform(scrollYProgress, [0.2, 0.6], [10, 0])

    // -- PHASE 3: THE SNAP (60% -> 70%) --
    // A tight, microscopic bounce to simulate heavy mass colliding
    const emblemScale = useTransform(scrollYProgress, [0.6, 0.65, 0.75], [1, 1.15, 1])
    const emblemGlow = useTransform(scrollYProgress, [0.6, 0.75], ["drop-shadow(0 0 0px var(--gold))", "drop-shadow(0 0 30px var(--gold))"])

    // -- PHASE 4: CLEAN EXIT (80% -> 90%) --
    // CRITICAL FIX: Accelerate fade out to prevent collision with Firm Intro.
    // Move slightly UP (-20%) to "lift" off phase, but Opacity kills it before overlap.
    const heroScale = useTransform(scrollYProgress, [0.8, 0.9], [1, 1.5]) // Capped scale (no more ghost debris)
    const heroOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]) // Gone by 0.9
    const heroY = useTransform(scrollYProgress, [0.8, 0.9], ["0%", "-20%"]) // Lift off

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-background-dark hidden lg:block">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Global Scale/Opacity Wrapper for Exit */}
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-background-dark/90 z-10"></div>
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJxBjUl8Dg66D9DsMBxQrbPtPNL3HCfRyEyHXzyiJamEEmOnp_ms0ZXugo4P1FXA8K1LraWJlOrzyu1GcE7zSX9z6_IDqtBN51ggdGguFp73SbFyyuJzE9NK8RggCRadfCM-UoAu0A1gzEtJST8OYGYZSwbo8acJJX6Wg9EsaYrmj0VbzG_Bf9Am1KrlJRXY-iU5o0TnTPJTjn1zefn4oIK25m0Xv-pqqvZ-1_V8YCbL7h_72AmyZGrjLLNEnCmHUe-0cxolX1sK8O"
                            alt="Atmosphere"
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                    </div>

                    {/* Central Emblem - ELEVATED Z-INDEX (30) to sit ABOVE cards */}
                    <motion.div
                        style={{ scale: emblemScale, filter: emblemGlow }}
                        className="absolute z-30 flex flex-col items-center justify-center"
                    >
                        <div className="w-40 h-40 rounded-full border-2 border-primary/30 flex items-center justify-center bg-background-dark/80 backdrop-blur-md">
                            <Crown className="w-20 h-20 text-primary" strokeWidth={1} />
                        </div>
                        <h1 className="mt-8 text-6xl font-display font-bold text-white tracking-widest uppercase text-center relative">
                            <span className="text-white relative z-10">Royal</span>
                            <span className="text-gradient-gold relative z-10 ml-4">Dynamite</span>
                        </h1>
                        <p className="text-primary/60 text-xs tracking-[0.6em] mt-3 uppercase">The Ecosystem</p>
                    </motion.div>

                    {/* --- DIAMOND LAYOUT CARDS (Z-INDEX 20) --- */}

                    {/* TOP: Dealership */}
                    <motion.div style={{ y: dealershipY, opacity: cardsOpacity }} className="absolute z-20">
                        <GlassCard title="Dealership" subtitle="Curated Excellence" icon={Car} image="https://lh3.googleusercontent.com/aida-public/AB6AXuAdgAH7Bh7BRErwZhbeNKXFoJkJC53XaPn95wAkX2GZVJ7DlVr8n3kgdMbrKg3lVGKdGIgJ3YbrpDB953RupxDdiaNDm707ug89z7in3lWmHLQy6H_-EgYXFv53IUckEDuiRC1N1YqVzPU0kdkWaBlNCBdUhrWbTty2Tx4ca5L39eMn3t8pcHBJsg-4rim0M0gjeiEkUqgIS9cIW5W0Eb1I5zmXK1kFARji1ZxKH2_dHczeKGKl1UNGwLvsTqWCnacBmI8847Ja3R6s" />
                    </motion.div>

                    {/* LEFT: Transport */}
                    <motion.div style={{ x: transportX, opacity: cardsOpacity, rotate: rotateLeft }} className="absolute z-20">
                        <GlassCard title="Transport" subtitle="Elite Mobility" icon={Shield} image="https://lh3.googleusercontent.com/aida-public/AB6AXuA2rVqHe0N0R6LoxiAHGRo47u46_f2XTc9al-IeymrZIuLgf9pqTttMdZNK2mYlPH78MD_nqWC9RG8J7wuYgr1S_JZzxTifXmEckUIHlAeywuF3WmRjlDNKtn5lLXsXz-KmzaSZUWQQOQn_tc8_Rz5KfIyiDeqwoNyhmUHfsJruMD6aNHNb_9VQ8Wv842AGqWrUONCWN4EG1SWawH7WQ-ZPxMGin1S_O3Tm6Hi1aO6I77UAGRtsxFeLfL0hwJnN18vZ3vjOiSqZjfZQ" />
                    </motion.div>

                    {/* RIGHT: Freight */}
                    <motion.div style={{ x: freightX, opacity: cardsOpacity, rotate: rotateRight }} className="absolute z-20">
                        <GlassCard title="Freight" subtitle="Global Logistics" icon={Ship} image="https://lh3.googleusercontent.com/aida-public/AB6AXuBFbX-t3B-RcOWOjsA4wSXP8u-84q2EBqbZ0vinn3dN_5rUFnoX2b8_f3BZ6gqpfJj4yakm7TXwYyVzTKk4KJmXx2pDj9kJIB_Z0QY06IemDBHHZp19QF6XL-O-280KuXJazG569ydY6eBH5QmNdPVJ4o5lHRqfv3BIS2M6GJ0H_Lrh01lnI8uGSa-NJO2ty3BMjtrRmDHuWPjWFgExTg2WTzIj9kU2wFVP1N50Nt4J6uv8d44uOYQlKXHm8O6cZNcmhCXurcBhtd_q" />
                    </motion.div>

                    {/* BOTTOM: Rentals */}
                    <motion.div style={{ y: rentalsY, opacity: cardsOpacity }} className="absolute z-20">
                        <GlassCard title="Rentals" subtitle="Luxury On Demand" icon={Key} image="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop" />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    )
}

function GlassCard({ title, subtitle, image, icon: Icon }: { title: string, subtitle: string, image: string, icon: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return (
        <div className="w-[280px] h-[200px] relative rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl group transition-all duration-500 hover:border-primary/50">
            <div className="absolute inset-0">
                <Image src={image} alt={title} fill className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center gap-3 mb-1">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider pl-8">{subtitle}</p>
            </div>
        </div>
    )
}
