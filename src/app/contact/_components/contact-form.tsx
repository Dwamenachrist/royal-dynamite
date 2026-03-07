"use client";

import { useState, useCallback } from "react";
import { CheckCircle, Loader2, Send, Sparkles, Car, KeyRound, Shield, Ship } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

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

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(field: keyof FormData, value: string): string | undefined {
    switch (field) {
        case "name":
            return value.trim().length < 2 ? "Please enter your full name" : undefined;
        case "email":
            return !validateEmail(value) ? "Please enter a valid email" : undefined;
        case "subject":
            return !value ? "Please select a service" : undefined;
        case "message":
            return value.trim().length < 10 ? "Please share a bit more detail" : undefined;
        default:
            return undefined;
    }
}

const SERVICE_OPTIONS = [
    { value: "sales", label: "Auto Sales", icon: Car },
    { value: "rentals", label: "Rentals", icon: KeyRound },
    { value: "transport", label: "VIP Transport", icon: Shield },
    { value: "freight", label: "Freight", icon: Ship },
] as const;

export function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = useCallback((field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => {
            if (prev[field]) {
                const next = { ...prev };
                delete next[field];
                return next;
            }
            return prev;
        });
    }, []);

    const handleBlur = useCallback(
        (field: keyof FormData) => {
            setTouched((prev) => new Set(prev).add(field));
            const error = validateField(field, formData[field]);
            setErrors((prev) => {
                if (error) return { ...prev, [field]: error };
                const next = { ...prev };
                delete next[field];
                return next;
            });
        },
        [formData]
    );

    const handleServiceSelect = useCallback((value: string) => {
        setFormData((prev) => ({ ...prev, subject: value }));
        setTouched((prev) => new Set(prev).add("subject"));
        setErrors((prev) => {
            const next = { ...prev };
            delete next.subject;
            return next;
        });
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newErrors: FormErrors = {};
        (["name", "email", "subject", "message"] as const).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched(new Set(["name", "email", "subject", "message"]));
            return;
        }

        setIsSubmitting(true);
        const serviceLabel = SERVICE_OPTIONS.find(s => s.value === formData.subject)?.label ?? formData.subject;
        const waMessage = [
            "🔔 New Website Enquiry",
            "",
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            formData.phone ? `Phone: ${formData.phone}` : null,
            `Service: ${serviceLabel}`,
            "",
            "Message:",
            formData.message,
            "",
            "— Sent from RoyalDynamite.com",
        ].filter(Boolean).join("\n");
        window.open(generateWhatsAppLink(waMessage), "_blank", "noopener,noreferrer");
        setIsSubmitting(false);
        setIsSubmitted(true);
    }

    function getInputClass(field: keyof FormData): string {
        const base = "concierge-input";
        if (!touched.has(field)) return base;
        if (errors[field]) return `${base} input-error`;
        if (formData[field].trim().length > 0) return `${base} input-success`;
        return base;
    }

    return (
        <div
            className="relative rounded-2xl overflow-hidden"
            style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Gold top accent */}
            <div
                className="absolute top-0 inset-x-0 h-[3px]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #D4AF37 30%, #f5d87a 50%, #D4AF37 70%, transparent)",
                }}
            />

            <div className="p-6 sm:p-8 lg:p-10">
                {/* ═══ UPGRADE 2: Live Status Indicator ═══ */}
                <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-xl"
                    style={{
                        background: "rgba(37, 211, 102, 0.06)",
                        border: "1px solid rgba(37, 211, 102, 0.15)",
                    }}
                >
                    <span className="relative flex h-3 w-3 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <p className="text-xs font-semibold text-green-400 tracking-wide">
                        Concierge Desk: <span className="text-green-300">Online</span>
                        <span className="text-white/40 font-normal ml-2">Avg. Reply: Under 2 Hrs</span>
                    </p>
                </div>

                {/* Form Header */}
                <div className="mb-8">
                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                        Send a Detailed Request
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                        Our advisors will respond to your bespoke requirements within 2 hours during business hours.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        /* ── Success State ── */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                            transition={{ type: "spring", stiffness: 90, damping: 20 }}
                            className="text-center py-12"
                        >
                            <div
                                className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center"
                                style={{
                                    background: "rgba(76, 175, 80, 0.12)",
                                    border: "1px solid rgba(76, 175, 80, 0.3)",
                                }}
                            >
                                <CheckCircle className="h-8 w-8 text-green-400" />
                            </div>
                            <h3 className="font-serif font-bold text-xl text-white mb-2">
                                Consultation Requested
                            </h3>
                            <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: '#94A3B8' }}>
                                Thank you for reaching out. A member of our concierge team
                                will be in touch shortly.
                            </p>
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                                    setTouched(new Set());
                                    setErrors({});
                                }}
                                className="mt-6 text-sm text-rd-gold/70 hover:text-rd-gold transition-colors duration-300 underline underline-offset-4"
                            >
                                Submit another request
                            </button>
                        </motion.div>
                    ) : (
                        /* ── Form ── */
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 90, damping: 20 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                {/* Name + Email row */}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="concierge-label">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={getInputClass("name")}
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            onBlur={() => handleBlur("name")}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? "name-error" : undefined}
                                        />
                                        <p
                                            id="name-error"
                                            className={`concierge-error-text ${errors.name && touched.has("name") ? "visible" : ""}`}
                                            role="alert"
                                        >
                                            {errors.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="concierge-label">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className={getInputClass("email")}
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            onBlur={() => handleBlur("email")}
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                        />
                                        <p
                                            id="email-error"
                                            className={`concierge-error-text ${errors.email && touched.has("email") ? "visible" : ""}`}
                                            role="alert"
                                        >
                                            {errors.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="concierge-label">
                                        Phone{" "}
                                        <span className="text-white/25 normal-case tracking-normal font-normal">
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        className="concierge-input"
                                        placeholder="+233 XX XXX XXXX"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                    />
                                </div>

                                {/* ═══ UPGRADE 1: Visual Service Selection Grid ═══ */}
                                <div>
                                    <label className="concierge-label">
                                        Service Category
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                                        {SERVICE_OPTIONS.map((service) => {
                                            const isSelected = formData.subject === service.value;
                                            const Icon = service.icon;
                                            return (
                                                <button
                                                    key={service.value}
                                                    type="button"
                                                    onClick={() => handleServiceSelect(service.value)}
                                                    className={`
                                                relative flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 rounded-xl
                                                transition-all duration-300 cursor-pointer group min-h-[88px]
                                                ${isSelected
                                                            ? "border-2 border-[#D4AF37] bg-[rgba(212,175,55,0.08)] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                                                            : "border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                                                        }
                                            `}
                                                >
                                                    <div className={`
                                                w-10 h-10 rounded-xl flex items-center justify-center
                                                transition-colors duration-300
                                                ${isSelected
                                                            ? "bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)]"
                                                            : "bg-white/5 border border-white/10 group-hover:border-white/15"
                                                        }
                                            `}>
                                                        <Icon className={`w-5 h-5 transition-colors duration-300 ${isSelected ? "text-[#D4AF37]" : "text-white/40 group-hover:text-white/60"}`} />
                                                    </div>
                                                    <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isSelected ? "text-[#D4AF37]" : "text-white/50 group-hover:text-white/70"}`}>
                                                        {service.label}
                                                    </span>
                                                    {isSelected && (
                                                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                                                            <CheckCircle className="w-3 h-3 text-[#0F172A]" />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <p
                                        id="subject-error"
                                        className={`concierge-error-text ${errors.subject && touched.has("subject") ? "visible" : ""}`}
                                        role="alert"
                                    >
                                        {errors.subject}
                                    </p>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="concierge-label">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        className={`${getInputClass("message")} concierge-textarea`}
                                        placeholder="Tell us about your needs — vehicle preferences, timeline, budget range, or any special requirements..."
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        onBlur={() => handleBlur("message")}
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? "message-error" : undefined}
                                    />
                                    <p
                                        id="message-error"
                                        className={`concierge-error-text ${errors.message && touched.has("message") ? "visible" : ""}`}
                                        role="alert"
                                    >
                                        {errors.message}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={!isSubmitting ? { scale: 1.015, transition: { type: "spring", stiffness: 400, damping: 20 } } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                                    className="concierge-cta mt-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Processing Your Request...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Send Request
                                        </>
                                    )}
                                </motion.button>

                                {/* Trust badge */}
                                <div className="pt-2 flex items-start gap-3 opacity-60 italic text-xs">
                                    <Sparkles className="h-4 w-4 text-rd-gold shrink-0 mt-0.5" />
                                    <p className="text-white/60">Every inquiry is handled by a senior advisor with dedicated attention. Average response within 2 hours.</p>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
