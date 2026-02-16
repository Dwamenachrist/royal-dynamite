"use client"

import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { getVehicleById } from "@/lib/mock-data"
import { generateWhatsAppLink, SITE_CONFIG } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
    ChevronRight,
    Home,
    ArrowLeft,
    MessageSquare,
    Phone,
    CheckCircle2,
    Send,
    User,
    Mail,
    Smartphone,
    MessageCircle,
    Car,
} from "lucide-react"

interface FormData {
    fullName: string
    phone: string
    email: string
    message: string
}

interface FormErrors {
    fullName?: string
    phone?: string
    email?: string
    message?: string
}

export default function EnquirePage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const vehicle = getVehicleById(id)

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        phone: "",
        email: "",
        message: `I'm interested in the ${vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "vehicle"}. Please share availability and any additional details.`,
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    if (!vehicle) {
        return (
            <div className="bg-[#0F172A] text-white min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Vehicle Not Found</h1>
                    <p className="text-gray-400">This vehicle may no longer be available.</p>
                    <Button asChild className="bg-[#edbc1d] text-black hover:bg-yellow-400">
                        <Link href="/dealership">Browse All Vehicles</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const priceDisplay = vehicle.price
        ? `GH₵ ${vehicle.price.toLocaleString()}`
        : "Contact for Price"

    const whatsappMessage = `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.price ? ` listed at GH₵ ${vehicle.price.toLocaleString()}` : ""}. Please send me more details.`

    function validate(): boolean {
        const newErrors: FormErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[\d\s+\-()]{7,}$/.test(formData.phone.trim())) {
            newErrors.phone = "Please enter a valid phone number"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!validate()) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    function handleChange(field: keyof FormData, value: string) {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error on change
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    // Success State
    if (isSubmitted) {
        return (
            <div className="bg-[#0F172A] text-white font-display min-h-screen selection:bg-[#edbc1d] selection:text-black">
                <div className="fixed top-0 right-0 w-1/2 h-screen bg-[#edbc1d]/5 blur-[120px] rounded-full pointer-events-none" />

                <main className="pt-24 pb-12 relative">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="bg-[#112240]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 text-center space-y-6">
                            {/* Success Icon */}
                            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-400" />
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-3xl font-extrabold uppercase">
                                    Enquiry <span className="text-[#edbc1d]">Sent</span>
                                </h1>
                                <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
                                    Thank you, <span className="text-white font-semibold">{formData.fullName}</span>.
                                    A vehicle specialist will contact you within <span className="text-[#edbc1d] font-bold">1 hour</span> regarding the{" "}
                                    <span className="text-white font-semibold">
                                        {vehicle.year} {vehicle.make} {vehicle.model}
                                    </span>.
                                </p>
                            </div>

                            {/* Quick Actions */}
                            <div className="pt-6 border-t border-white/10 space-y-3">
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Need an instant response?</p>
                                <Button
                                    asChild
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-xl"
                                >
                                    <a
                                        href={generateWhatsAppLink(whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Chat on WhatsApp Now
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10 py-5 rounded-xl"
                                >
                                    <Link href={`/dealership/${vehicle.id}`}>
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Vehicle
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    // Form State
    return (
        <div className="bg-[#0F172A] text-white font-display min-h-screen selection:bg-[#edbc1d] selection:text-black">
            {/* Background Decoration */}
            <div className="fixed top-0 right-0 w-1/2 h-screen bg-[#edbc1d]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-1/3 h-screen bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

            <main className="pt-24 pb-12 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex mb-8 text-sm text-gray-400">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="hover:text-[#edbc1d] transition-colors flex items-center gap-1">
                                    <Home className="w-4 h-4" /> Home
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li>
                                <Link href="/dealership" className="hover:text-[#edbc1d] transition-colors">
                                    Dealership
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li>
                                <Link href={`/dealership/${vehicle.id}`} className="hover:text-[#edbc1d] transition-colors">
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li aria-current="page" className="text-white font-medium">
                                Enquire
                            </li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        {/* Left: Vehicle Summary Card (2 cols) */}
                        <div className="lg:col-span-2">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Vehicle Card */}
                                <div className="bg-[#112240]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                                    {/* Vehicle Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={vehicle.images?.[0] || "/placeholder.svg"}
                                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent" />
                                    </div>

                                    <div className="p-6 space-y-4">
                                        {/* Vehicle Name */}
                                        <div>
                                            <div className="flex items-center gap-2 text-[#edbc1d]/80 text-xs font-bold uppercase tracking-widest mb-1">
                                                <Car className="w-3 h-3" />
                                                <span>{vehicle.year} Model</span>
                                            </div>
                                            <h2 className="text-xl font-extrabold text-white uppercase">
                                                {vehicle.make}{" "}
                                                <span className="text-gray-400 font-light">{vehicle.model}</span>
                                            </h2>
                                        </div>

                                        {/* Price */}
                                        <div className="pt-4 border-t border-white/10">
                                            <span className="text-xs text-gray-400 block mb-1">Asking Price</span>
                                            <div className="text-3xl font-bold text-[#edbc1d] tracking-tight">
                                                {priceDisplay}
                                            </div>
                                        </div>

                                        {/* Quick Specs */}
                                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                                            <div>
                                                <span className="text-xs text-gray-400">Mileage</span>
                                                <p className="text-sm font-semibold text-white">{vehicle.mileage?.toLocaleString()} km</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-400">Transmission</span>
                                                <p className="text-sm font-semibold text-white">{vehicle.transmission}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-400">Fuel</span>
                                                <p className="text-sm font-semibold text-white">{vehicle.fuelType}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-400">Engine</span>
                                                <p className="text-sm font-semibold text-white">{vehicle.engineSize}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back to Vehicle */}
                                <Link
                                    href={`/dealership/${vehicle.id}`}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#edbc1d] transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back to vehicle details
                                </Link>
                            </div>
                        </div>

                        {/* Right: Enquiry Form (3 cols) */}
                        <div className="lg:col-span-3">
                            <div className="bg-[#112240]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10">
                                {/* Form Header */}
                                <div className="mb-8">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold uppercase">
                                        Request <span className="text-[#edbc1d]">Information</span>
                                    </h1>
                                    <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                                        Fill in your details below and a vehicle specialist will reach out within <span className="text-[#edbc1d] font-semibold">1 hour</span>.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                            <User className="w-4 h-4 text-[#edbc1d]" />
                                            Full Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="fullName"
                                            type="text"
                                            placeholder="e.g. Kwame Asante"
                                            value={formData.fullName}
                                            onChange={(e) => handleChange("fullName", e.target.value)}
                                            className={`w-full bg-[#0a192f]/80 border ${errors.fullName ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/30 transition-all`}
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                            <Smartphone className="w-4 h-4 text-[#edbc1d]" />
                                            Phone Number <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="e.g. +233 24 400 0000"
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                            className={`w-full bg-[#0a192f]/80 border ${errors.phone ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/30 transition-all`}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[#edbc1d]" />
                                            Email Address <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="e.g. kwame@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            className={`w-full bg-[#0a192f]/80 border ${errors.email ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/30 transition-all`}
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4 text-[#edbc1d]" />
                                            Message <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            placeholder="Tell us what you'd like to know..."
                                            value={formData.message}
                                            onChange={(e) => handleChange("message", e.target.value)}
                                            className={`w-full bg-[#0a192f]/80 border ${errors.message ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/30 transition-all resize-none`}
                                        />
                                        {errors.message && (
                                            <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg py-6 rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send className="w-5 h-5" />
                                                Send Enquiry
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                {/* Alternative Channels */}
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 text-center">
                                        Prefer instant communication?
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <a
                                            href={generateWhatsAppLink(whatsappMessage)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-600/10 border border-green-500/20 text-green-400 hover:bg-green-600/20 transition-all text-sm font-semibold"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            WhatsApp Us
                                        </a>
                                        <a
                                            href={`tel:${SITE_CONFIG.phone}`}
                                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all text-sm font-semibold"
                                        >
                                            <Phone className="w-4 h-4" />
                                            {SITE_CONFIG.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
