"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    User,
    Smartphone,
    Mail,
    CreditCard,
    Calendar,
    Car,
    Send,
    MessageSquare,
    Phone,
    ChevronRight,
    Home,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink, SITE_CONFIG } from "@/lib/constants";

export default function RentalApplicationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    }

    const inputClasses =
        "w-full bg-[#0a192f]/80 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/30 transition-all";
    const labelClasses = "text-sm font-semibold text-gray-300 flex items-center gap-2";
    const selectClasses =
        "w-full bg-[#0a192f]/80 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#edbc1d]/50 focus:ring-1 focus:ring-[#edbc1d]/30 transition-all appearance-none cursor-pointer";

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
                                    Application <span className="text-[#edbc1d]">Submitted</span>
                                </h1>
                                <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
                                    Thank you for your rental application. Our team will review your
                                    information and contact you within{" "}
                                    <span className="text-[#edbc1d] font-bold">24-48 hours</span>.
                                </p>
                            </div>

                            {/* Quick Actions */}
                            <div className="pt-6 border-t border-white/10 space-y-3">
                                <p className="text-xs text-gray-500 uppercase tracking-widest">
                                    Need a faster response?
                                </p>
                                <Button
                                    asChild
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-xl"
                                >
                                    <a
                                        href={generateWhatsAppLink(
                                            "Hi, I just submitted a rental application. I'd like to confirm the status of my request."
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Chat on WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10 py-5 rounded-xl"
                                >
                                    <Link href="/rentals">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Rentals
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[#0F172A] text-white font-display min-h-screen selection:bg-[#edbc1d] selection:text-black">
            {/* Background Decoration */}
            <div className="fixed top-0 right-0 w-1/2 h-screen bg-[#edbc1d]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-1/3 h-screen bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

            <main className="pt-24 pb-12 relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex mb-8 text-sm text-gray-400">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href="/"
                                    className="hover:text-[#edbc1d] transition-colors flex items-center gap-1"
                                >
                                    <Home className="w-4 h-4" /> Home
                                </Link>
                            </li>
                            <li>
                                <ChevronRight className="w-4 h-4 mx-1" />
                            </li>
                            <li>
                                <Link href="/rentals" className="hover:text-[#edbc1d] transition-colors">
                                    Rentals
                                </Link>
                            </li>
                            <li>
                                <ChevronRight className="w-4 h-4 mx-1" />
                            </li>
                            <li aria-current="page" className="text-white font-medium">
                                Apply to Rent
                            </li>
                        </ol>
                    </nav>

                    {/* Form Card */}
                    <div className="bg-[#112240]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase">
                                Rental <span className="text-[#edbc1d]">Pre-Qualification</span>
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                                Complete this form to start your rental application. All fields are
                                required for verification purposes.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[#edbc1d] uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Personal Information
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className={labelClasses}>
                                            First Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            required
                                            placeholder="e.g. Kwame"
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className={labelClasses}>
                                            Last Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            required
                                            placeholder="e.g. Asante"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className={labelClasses}>
                                        <Smartphone className="w-4 h-4 text-[#edbc1d]" />
                                        Phone Number <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        placeholder="+233 XX XXX XXXX"
                                        className={inputClasses}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className={labelClasses}>
                                        <Mail className="w-4 h-4 text-[#edbc1d]" />
                                        Email Address <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="kwame@example.com"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* ID Verification */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[#edbc1d] uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    ID Verification
                                </h3>

                                <div className="space-y-2">
                                    <label htmlFor="idType" className={labelClasses}>
                                        <CreditCard className="w-4 h-4 text-[#edbc1d]" />
                                        ID Type <span className="text-red-400">*</span>
                                    </label>
                                    <select id="idType" required className={selectClasses} defaultValue="">
                                        <option value="" disabled className="bg-[#0a192f] text-gray-500">
                                            Select ID type
                                        </option>
                                        <option value="ghana-card" className="bg-[#0a192f] text-white">
                                            Ghana Card
                                        </option>
                                        <option value="passport" className="bg-[#0a192f] text-white">
                                            Passport
                                        </option>
                                        <option value="drivers-license" className="bg-[#0a192f] text-white">
                                            Driver&apos;s License
                                        </option>
                                        <option value="voters-id" className="bg-[#0a192f] text-white">
                                            Voter&apos;s ID
                                        </option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="idNumber" className={labelClasses}>
                                        ID Number <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        id="idNumber"
                                        type="text"
                                        required
                                        placeholder="Enter your ID number"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10" />

                            {/* Rental Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-[#edbc1d] uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Rental Details
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="startDate" className={labelClasses}>
                                            Pickup Date <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            required
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="endDate" className={labelClasses}>
                                            Return Date <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            id="endDate"
                                            type="date"
                                            required
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="vehiclePreference" className={labelClasses}>
                                        <Car className="w-4 h-4 text-[#edbc1d]" />
                                        Vehicle Preference{" "}
                                        <span className="text-gray-500 font-normal">(Optional)</span>
                                    </label>
                                    <select
                                        id="vehiclePreference"
                                        className={selectClasses}
                                        defaultValue=""
                                    >
                                        <option value="" className="bg-[#0a192f] text-gray-500">
                                            Select vehicle type
                                        </option>
                                        <option value="any" className="bg-[#0a192f] text-white">
                                            Any Available
                                        </option>
                                        <option value="sedan" className="bg-[#0a192f] text-white">
                                            Sedan
                                        </option>
                                        <option value="suv" className="bg-[#0a192f] text-white">
                                            SUV
                                        </option>
                                        <option value="van" className="bg-[#0a192f] text-white">
                                            Van (12+ seats)
                                        </option>
                                        <option value="bus" className="bg-[#0a192f] text-white">
                                            Bus (30+ seats)
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="rounded-xl bg-[#0a192f]/80 border border-white/10 p-4 text-sm text-gray-400">
                                <p>
                                    By submitting this form, you agree to our{" "}
                                    <Link
                                        href="/terms"
                                        className="underline text-[#edbc1d]/80 hover:text-[#edbc1d]"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy"
                                        className="underline text-[#edbc1d]/80 hover:text-[#edbc1d]"
                                    >
                                        Privacy Policy
                                    </Link>
                                    . Your information will only be used for rental verification
                                    purposes.
                                </p>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg py-6 rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Send className="w-5 h-5" />
                                        Submit Application
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
                                    href={generateWhatsAppLink(
                                        "Hi, I'd like to apply for a vehicle rental. Can you help me get started?"
                                    )}
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

                    {/* Back to Rentals */}
                    <div className="mt-6">
                        <Link
                            href="/rentals"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#edbc1d] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to rental fleet
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
