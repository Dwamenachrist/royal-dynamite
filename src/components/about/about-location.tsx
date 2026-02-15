"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

/* ────────────────────────────────────────────
   Contact Info Items
   ──────────────────────────────────────────── */
const contactDetails = [
    {
        icon: MapPin,
        label: "Address",
        value: SITE_CONFIG.address,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`,
    },
    {
        icon: Phone,
        label: "Phone",
        value: SITE_CONFIG.phone,
        href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
    },
    {
        icon: Mail,
        label: "Email",
        value: SITE_CONFIG.email,
        href: `mailto:${SITE_CONFIG.email}`,
    },
    {
        icon: Clock,
        label: "Business Hours",
        value: SITE_CONFIG.businessHours,
        href: null,
    },
];

/* ────────────────────────────────────────────
   Animation Variants
   ──────────────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

/* ════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════ */
export function AboutLocation() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`;

    return (
        <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
            {/* Subtle divider line at top */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Background glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-rd-gold/[0.02] blur-[100px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold/70 mb-4">
                        Come See Us
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Visit Our <span className="text-rd-gold">Showroom</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Experience our vehicles in person. Walk in, talk to our team,
                        and drive away with confidence.
                    </p>
                </motion.div>

                {/* Two-Column: Map + Contact */}
                <div className="grid gap-8 lg:grid-cols-5 items-stretch">
                    {/* Map — Takes 3 columns */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUp}
                        custom={0}
                        className="lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[360px]"
                        style={{
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                    >
                        {/* Dark-styled Google Maps embed */}
                        <iframe
                            title="Royal Dynamite Location"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            className="absolute inset-0 w-full h-full"
                            style={{
                                filter: "grayscale(1) invert(0.92) contrast(0.85) hue-rotate(180deg)",
                                border: "none",
                            }}
                            loading="lazy"
                            allowFullScreen={false}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        {/* Subtle vignette overlay on the map edges */}
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/[0.04] rounded-2xl" />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-950/10" />
                    </motion.div>

                    {/* Contact Details — Takes 2 columns */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        {contactDetails.map((item, i) => {
                            const Wrapper = item.href ? "a" : "div";
                            const wrapperProps = item.href
                                ? {
                                    href: item.href,
                                    target: item.href.startsWith("http") ? "_blank" : undefined,
                                    rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                                }
                                : {};

                            return (
                                <motion.div key={item.label} variants={fadeUp} custom={i + 1}>
                                    <Wrapper
                                        {...wrapperProps}
                                        className="concierge-card"
                                    >
                                        <div
                                            className="concierge-card-icon"
                                            style={{
                                                background: "rgba(212, 175, 55, 0.08)",
                                                border: "1px solid rgba(212, 175, 55, 0.15)",
                                            }}
                                        >
                                            <item.icon className="w-5 h-5 text-rd-gold" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-rd-gold/60 mb-0.5">
                                                {item.label}
                                            </span>
                                            <span className="block text-sm text-gray-200 font-medium leading-snug">
                                                {item.value}
                                            </span>
                                        </div>
                                    </Wrapper>
                                </motion.div>
                            );
                        })}

                        {/* Get Directions CTA */}
                        <motion.div variants={fadeUp} custom={contactDetails.length + 1} className="mt-2">
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="concierge-cta"
                            >
                                <MapPin className="w-5 h-5" />
                                Get Directions
                                <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
