"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    Mail,
    Send,
    CheckCircle,
    Loader2,
    MessageCircle,
    ArrowRight,
    Car,
    KeyRound,
    Shield,
    Ship,
    MapPin,
} from "lucide-react";
import { SITE_CONFIG, generateWhatsAppLink } from "@/lib/constants";

// Re-use types and options from page.tsx (or move to a shared file later if needed)
interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const SERVICE_OPTIONS = [
    { value: "sales", label: "Auto Sales", icon: Car },
    { value: "rentals", label: "Rentals", icon: KeyRound },
    { value: "transport", label: "VIP Transport", icon: Shield },
    { value: "freight", label: "Freight", icon: Ship },
] as const;

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
        label: "Client Services",
        value: SITE_CONFIG.email,
        href: `mailto:${SITE_CONFIG.email}`,
        iconBg: "rgba(212, 175, 55, 0.12)",
        iconBorder: "rgba(212, 175, 55, 0.25)",
        iconColor: "#D4AF37",
        variant: "",
    },
] as const;

const HEAVY_QUART = [0.165, 0.84, 0.44, 1.0] as const;

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: HEAVY_QUART }
    }
};

interface MobileContactViewProps {
    formData: FormData;
    errors: FormErrors;
    touched: Set<keyof FormData>;
    isSubmitting: boolean;
    isSubmitted: boolean;
    handleChange: (field: keyof FormData, value: string) => void;
    handleBlur: (field: keyof FormData) => void;
    handleServiceSelect: (value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    getInputClass: (field: keyof FormData) => string;
    setIsMapActive: (val: boolean) => void;
    isMapActive: boolean;
    resetForm: () => void;
}

export default function MobileContactView({
    formData,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleServiceSelect,
    handleSubmit,
    getInputClass,
    setIsMapActive,
    isMapActive,
    resetForm
}: MobileContactViewProps) {
    return (
        <section className="relative py-12 px-4 bg-[#0F172A]">
            {/* Subtle dot pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Section Label */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.0, ease: HEAVY_QUART }}
                className="text-center mb-10"
            >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">
                    Exclusive Access
                </p>
                <h2 className="text-3xl font-serif font-bold text-white">
                    How May We Assist?
                </h2>
                <div className="w-12 h-1 bg-rd-gold mx-auto mt-4 rounded-full" />
            </motion.div>

            {/* VIP Channels Horizontal Snap (Mobile Only) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: HEAVY_QUART }}
                className="mb-12"
            >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rd-gold/70 mb-4 px-2">
                    Instant VIP Channels
                </p>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 [&::-webkit-scrollbar]:hidden -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {VIP_CHANNELS.map((channel) => (
                        <a
                            key={channel.id}
                            href={channel.href}
                            target={"external" in channel && channel.external ? "_blank" : undefined}
                            rel={"external" in channel && channel.external ? "noopener noreferrer" : undefined}
                            className={`concierge-card ${channel.variant} snap-center shrink-0 w-[85vw] min-h-[88px]`}
                        >
                            <div
                                className="concierge-card-icon"
                                style={{
                                    background: channel.iconBg,
                                    border: `1px solid ${channel.iconBorder}`,
                                }}
                            >
                                <channel.icon className="h-5 w-5" style={{ color: channel.iconColor }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-0.5" style={{ color: '#94A3B8' }}>
                                    {channel.label}
                                </p>
                                <p className="text-sm font-medium truncate" style={{ color: '#E2E8F0' }}>
                                    {channel.value}
                                </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-rd-gold transition-colors duration-300 shrink-0" />
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Concierge Form */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-5%" }}
                variants={staggerContainer}
                className="relative rounded-2xl overflow-hidden mb-12"
                style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                {/* Gold top accent */}
                <div
                    className="absolute top-0 inset-x-0 h-[3px]"
                    style={{
                        background: "linear-gradient(90deg, transparent, #D4AF37 30%, #f5d87a 50%, #D4AF37 70%, transparent)",
                    }}
                />

                <div className="p-6">
                    {/* Live Status Indicator */}
                    <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-green-400 tracking-wide">Concierge: Online</span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: HEAVY_QUART }}
                                className="text-center py-10"
                            >
                                <div className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center bg-green-500/10 border border-green-500/30">
                                    <CheckCircle className="h-8 w-8 text-green-400" />
                                </div>
                                <h3 className="font-serif font-bold text-xl text-white mb-2">Request Sent</h3>
                                <p className="text-sm leading-relaxed text-slate-400 max-w-xs mx-auto">
                                    Our team will contact you shortly.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="mt-6 text-sm text-rd-gold/70 hover:text-rd-gold transition-colors duration-300 underline underline-offset-4"
                                >
                                    Submit another request
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="space-y-5"
                                noValidate
                            >
                                <motion.div variants={itemVariant}>
                                    <label htmlFor="mobile-name" className="concierge-label">Full Name</label>
                                    <input
                                        id="mobile-name"
                                        type="text"
                                        className={getInputClass("name")}
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        onBlur={() => handleBlur("name")}
                                    />
                                    {errors.name && touched.has("name") && (
                                        <p className="concierge-error-text visible mt-1">{errors.name}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={itemVariant}>
                                    <label htmlFor="mobile-email" className="concierge-label">Email Address</label>
                                    <input
                                        id="mobile-email"
                                        type="email"
                                        className={getInputClass("email")}
                                        placeholder="you@company.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        onBlur={() => handleBlur("email")}
                                    />
                                    {errors.email && touched.has("email") && (
                                        <p className="concierge-error-text visible mt-1">{errors.email}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={itemVariant}>
                                    <label htmlFor="mobile-phone" className="concierge-label">Phone <span className="normal-case opacity-50">(optional)</span></label>
                                    <input
                                        id="mobile-phone"
                                        type="tel"
                                        className="concierge-input"
                                        placeholder="+233 XX XXX XXXX"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                    />
                                </motion.div>

                                <motion.div variants={itemVariant}>
                                    <label className="concierge-label mb-2 block">Service Required</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {SERVICE_OPTIONS.map((service) => {
                                            const isSelected = formData.subject === service.value;
                                            const Icon = service.icon;
                                            return (
                                                <button
                                                    key={service.value}
                                                    type="button"
                                                    onClick={() => handleServiceSelect(service.value)}
                                                    className={`
                                                        relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl transition-all duration-300
                                                        ${isSelected ? "border-2 border-[#D4AF37] bg-[#D4AF37]/10" : "border border-white/10 bg-white/5"}
                                                    `}
                                                >
                                                    <Icon className={`w-5 h-5 ${isSelected ? "text-[#D4AF37]" : "text-white/40"}`} />
                                                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isSelected ? "text-[#D4AF37]" : "text-white/50"}`}>
                                                        {service.label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.subject && touched.has("subject") && (
                                        <p className="concierge-error-text visible mt-1">{errors.subject}</p>
                                    )}
                                </motion.div>

                                <motion.div variants={itemVariant}>
                                    <label htmlFor="mobile-message" className="concierge-label">Request Details</label>
                                    <textarea
                                        id="mobile-message"
                                        className={`${getInputClass("message")} concierge-textarea min-h-[100px]`}
                                        placeholder="How can our concierge assist you?"
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        onBlur={() => handleBlur("message")}
                                    />
                                    {errors.message && touched.has("message") && (
                                        <p className="concierge-error-text visible mt-1">{errors.message}</p>
                                    )}
                                </motion.div>

                                <motion.button
                                    variants={itemVariant}
                                    type="submit"
                                    className="concierge-cta w-full py-4 mt-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" />
                                            Send Request
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Mobile Map Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: HEAVY_QUART }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[300px]"
            >
                {!isMapActive && (
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                        onClick={() => setIsMapActive(true)}
                    >
                        <div className="bg-black/80 px-6 py-3 rounded-full border border-[#D4AF37]/30 text-white text-sm font-medium flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                            <MapPin className="w-4 h-4 text-rd-gold animate-bounce" />
                            Tap to Explore HQ
                        </div>
                    </div>
                )}

                <iframe
                    src="https://maps.google.com/maps?q=Airport%20Bulldog,%20Accra,%20Ghana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block", pointerEvents: isMapActive ? "auto" : "none" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Royal Dynamite HQ"
                />

                <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-[#D4AF37]/20 flex justify-between items-center">
                    <div>
                        <h4 className="text-white text-sm font-bold">Airport Bulldog</h4>
                        <p className="text-slate-400 text-xs">Accra, Ghana</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
