"use client"

import { Phone, Mail, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { SITE_CONFIG, generateWhatsAppLink } from "@/lib/constants";
import { motion } from "framer-motion";

const VIP_CHANNELS = [
    {
        id: "phone",
        icon: Phone,
        label: "Speak to a Specialist",
        value: SITE_CONFIG.phone,
        href: `tel:${SITE_CONFIG.phone}`,
        iconBg: "rgba(212, 175, 55, 0.12)",
        iconBorder: "rgba(212, 175, 55, 0.25)",
        iconColor: "#D4AF37",
        variant: "",
    },
    {
        id: "whatsapp",
        icon: MessageCircle,
        label: "Instant VIP Chat",
        value: "WhatsApp Direct",
        href: generateWhatsAppLink("Hello, I'd like a private consultation regarding your premium services."),
        iconBg: "rgba(37, 211, 102, 0.12)",
        iconBorder: "rgba(37, 211, 102, 0.25)",
        iconColor: "#25D366",
        variant: "concierge-card-whatsapp",
        external: true,
    },
    {
        id: "email",
        icon: Mail,
        label: "Client Services Email",
        value: SITE_CONFIG.email,
        href: `mailto:${SITE_CONFIG.email}`,
        iconBg: "rgba(212, 175, 55, 0.12)",
        iconBorder: "rgba(212, 175, 55, 0.25)",
        iconColor: "#D4AF37",
        variant: "",
    },
] as const;

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
};

export function VipChannels() {
    return (
        <div className="flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
                className="mb-6"
            >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rd-gold/70 mb-2">
                    VIP Direct Access
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                    Prefer a direct channel? Reach our team instantly through
                    any of these exclusive lines.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-col gap-4 flex-1"
            >
                {VIP_CHANNELS.map((channel) => (
                    <motion.a
                        key={channel.id}
                        variants={itemVariants}
                        whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 30 } }}
                        whileTap={{ scale: 0.98 }}
                        href={channel.href}
                        target={("external" in channel && channel.external) ? "_blank" : undefined}
                        rel={("external" in channel && channel.external) ? "noopener noreferrer" : undefined}
                        className={`concierge-card ${channel.variant}`}
                    >
                        <div
                            className="concierge-card-icon"
                            style={{
                                background: channel.iconBg,
                                border: `1px solid ${channel.iconBorder}`,
                            }}
                        >
                            <channel.icon
                                className="h-5 w-5"
                                style={{ color: channel.iconColor }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-0.5" style={{ color: "#94A3B8" }}>
                                {channel.label}
                            </p>
                            <p className="text-sm font-medium truncate" style={{ color: "#E2E8F0" }}>
                                {channel.value}
                            </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-rd-gold transition-colors duration-300 shrink-0" />
                    </motion.a>
                ))}
            </motion.div>

            {/* Confidence badge */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.3 }}
                className="mt-6 rounded-xl p-4"
                style={{
                    background: "rgba(212, 175, 55, 0.06)",
                    border: "1px solid rgba(212, 175, 55, 0.12)",
                }}
            >
                <div className="flex items-start gap-3">
                    <div
                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                        style={{ background: "rgba(212, 175, 55, 0.1)" }}
                    >
                        <Sparkles className="h-4 w-4 text-rd-gold/60" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-rd-gold/70 mb-1">White-Glove Service</p>
                        <p className="text-xs" style={{ color: "#94A3B8" }}>
                            Every inquiry is handled by a senior advisor with
                            dedicated attention. Average response within 2 hours.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
