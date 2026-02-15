"use client";

import { useState, useCallback } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    Loader2,
    MessageCircle,
    ArrowRight,
    Sparkles,
    Car,
    KeyRound,
    Shield,
    Ship,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SITE_CONFIG, generateWhatsAppLink } from "@/lib/constants";

/* ─── Types ─── */
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

/* ─── Validation helpers ─── */
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

/* ─── Service Selector Cards ─── */
const SERVICE_OPTIONS = [
    { value: "sales", label: "Auto Sales", icon: Car },
    { value: "rentals", label: "Rentals", icon: KeyRound },
    { value: "transport", label: "VIP Transport", icon: Shield },
    { value: "freight", label: "Freight", icon: Ship },
] as const;

/* ─── VIP Contact Channels ─── */
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


/* ═══════════════════════════════════════════
   CONTACT CONCIERGE PAGE
   ═══════════════════════════════════════════ */
export default function ContactPage() {
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
        <div className="min-h-screen">
            <PageHeader
                title="Private Concierge"
                description="Your exclusive gateway to premium service. Every inquiry receives dedicated, white-glove attention from our expert team."
                breadcrumb="Contact"
                heroImage="/images/concierge-hero.png"
                heroImageAlt="Royal Dynamite concierge opening car door for client"
                variant="full"
            />

            {/* ═══════ CONCIERGE SECTION ═══════ */}
            <section
                className="relative py-20 lg:py-28"
                style={{
                    background:
                        "linear-gradient(180deg, #0F172A 0%, #0d1527 40%, #0F172A 100%)",
                }}
            >
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#D4AF37_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                {/* Noise texture */}
                <div className="services-texture absolute inset-0 pointer-events-none" />

                <div className="relative container px-4 md:px-6 z-10">
                    {/* Section Label */}
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rd-gold mb-3">
                            Exclusive Access
                        </p>
                        <h2 className="text-3xl font-serif font-bold sm:text-4xl text-white">
                            How May We Assist You?
                        </h2>
                        <div className="w-16 h-1 bg-rd-gold mx-auto mt-5 rounded-full" />
                    </div>

                    {/* ─── SPLIT LAYOUT: Form + VIP Cards ─── */}
                    <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] max-w-6xl mx-auto">
                        {/* ── LEFT: Concierge Form ── */}
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

                            <div className="p-8 lg:p-10">
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

                                {isSubmitted ? (
                                    /* ── Success State ── */
                                    <div className="text-center py-12">
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
                                    </div>
                                ) : (
                                    /* ── Form ── */
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
                                                                relative flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl
                                                                transition-all duration-300 cursor-pointer group
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
                                        <button
                                            type="submit"
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
                                        </button>

                                        {/* Trust badge */}
                                        <div className="pt-2 flex items-start gap-3 opacity-60 italic text-xs">
                                            <Sparkles className="h-4 w-4 text-rd-gold shrink-0 mt-0.5" />
                                            <p className="text-white/60">Every inquiry is handled by a senior advisor with dedicated attention. Average response within 2 hours.</p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* ── RIGHT: VIP Direct Access ── */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rd-gold/70 mb-2">
                                    VIP Direct Access
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                                    Prefer a direct channel? Reach our team instantly through
                                    any of these exclusive lines.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 flex-1">
                                {VIP_CHANNELS.map((channel) => (
                                    <a
                                        key={channel.id}
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

                            {/* Confidence badge */}
                            <div
                                className="mt-6 rounded-xl p-4"
                                style={{
                                    background: "rgba(212, 175, 55, 0.06)",
                                    border: "1px solid rgba(212, 175, 55, 0.12)",
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                                        style={{
                                            background: "rgba(212, 175, 55, 0.1)",
                                        }}
                                    >
                                        <Sparkles className="h-4 w-4 text-rd-gold/60" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-rd-gold/70 mb-1">
                                            White-Glove Service
                                        </p>
                                        <p className="text-xs" style={{ color: '#94A3B8' }}>
                                            Every inquiry is handled by a senior advisor with
                                            dedicated attention. Average response within 2 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ═══ UPGRADE 4: Floating Map Card ═══ */}
                    <div className="mt-16 max-w-6xl mx-auto">
                        <div
                            className="relative rounded-3xl overflow-hidden shadow-2xl"
                            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                            {/* Map iframe */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.725035!2d-0.1870!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a1e9c8e0b15%3A0x2ad4f2e4e3e8c1a0!2sAirport%20Residential%20Area%2C%20Accra!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                                width="100%"
                                height="450"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Royal Dynamite Limited — Airport Residential Area, Accra"
                            />

                            {/* Floating Location Pin */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
                                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white animate-bounce shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="backdrop-blur-md px-4 py-2 rounded-lg mt-2" style={{ background: "rgba(30, 41, 59, 0.8)", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Royal Dynamite HQ</span>
                                </div>
                            </div>

                            {/* ═══ Floating Glass Card (Address/Info) ═══ */}
                            <div
                                className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                style={{
                                    background: "rgba(15, 23, 42, 0.75)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                    border: "1px solid rgba(212, 175, 55, 0.15)",
                                }}
                            >
                                <div>
                                    <h4 className="text-white font-bold mb-1">Airport Residential Area</h4>
                                    <p className="text-slate-300 text-sm">Accra, Ghana</p>
                                </div>
                                <a
                                    href="https://maps.google.com/?q=Airport+Residential+Area+Accra+Ghana"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-slate-900 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shrink-0"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>

                        {/* Address & Hours cards below map */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="glass-panel p-6 rounded-2xl bg-white/5">
                                <h4 className="text-xs font-bold uppercase text-[#D4AF37] mb-3 tracking-wider">Physical Address</h4>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Suite 402, Dynamite Towers<br />
                                    Airport Residential Area<br />
                                    Accra, Ghana
                                </p>
                            </div>
                            <div className="glass-panel p-6 rounded-2xl bg-white/5">
                                <h4 className="text-xs font-bold uppercase text-[#D4AF37] mb-3 tracking-wider">Opening Hours</h4>
                                <p className="text-sm leading-relaxed text-slate-400">
                                    Mon – Fri: 8:00 AM – 6:00 PM<br />
                                    Sat: 9:00 AM – 2:00 PM<br />
                                    Sun: Closed (VIP Appointments Only)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
