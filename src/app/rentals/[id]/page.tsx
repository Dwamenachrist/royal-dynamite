import React from "react"
import { notFound } from "next/navigation"
import { VehicleGallery } from "@/components/dealership/vehicle-gallery"
import { TrustBar } from "@/components/dealership/trust-bar"
import { SpecsTabs } from "@/components/dealership/specs-tabs"
import { MobileVehicleHeader } from "@/components/dealership/mobile-vehicle-header"
import { MobileVehicleFooter } from "@/components/dealership/mobile-vehicle-footer"
import { getVehicleById, getRentalVehicles } from "@/lib/mock-data"
import { generateWhatsAppLink } from "@/lib/constants"
import { StitchVehicleCard } from "@/components/stitch/vehicle-card"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, MessageSquare, Phone, ShieldCheck, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const vehicle = getVehicleById(id)
    if (!vehicle) return { title: "Vehicle Not Found | Royal Dynamite" }
    return {
        title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Rent | Royal Dynamite`,
        description: vehicle.description,
    }
}

export default async function RentalVehicleDetailPage({ params }: PageProps) {
    const { id } = await params
    const vehicle = getVehicleById(id)

    if (!vehicle) {
        return notFound()
    }

    // Get similar rental vehicles (same category, different ID)
    const allRentals = getRentalVehicles()
    const similarVehicles = allRentals
        .filter(v => v.category === vehicle.category && v.id !== vehicle.id)
        .slice(0, 3)

    // If not enough from same category, fill from other rentals
    const finalSimilar = similarVehicles.length >= 3
        ? similarVehicles
        : [...similarVehicles, ...allRentals.filter(v => v.id !== vehicle.id && !similarVehicles.find(s => s.id === v.id)).slice(0, 3 - similarVehicles.length)]

    const isRental = vehicle.status === "rent"
    const priceDisplay = isRental
        ? `GH₵ ${vehicle.dailyRate?.toLocaleString()}`
        : `GH₵ ${vehicle.price?.toLocaleString()}`

    const whatsappMessage = `Hello, I am interested in renting the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Is it available?`

    return (
        <div className="bg-[#0F172A] text-white font-display min-h-screen selection:bg-[#edbc1d] selection:text-black">
            {/* Background Decoration */}
            <div className="fixed top-0 right-0 w-1/2 h-screen bg-[#edbc1d]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-1/3 h-screen bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

            <main className="pt-24 pb-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex mb-6 text-sm text-gray-400">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="hover:text-[#edbc1d] transition-colors flex items-center gap-1">
                                    <Home className="w-4 h-4" /> Home
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li>
                                <Link href="/rentals" className="hover:text-[#edbc1d] transition-colors">
                                    Rentals
                                </Link>
                            </li>
                            <li><ChevronRight className="w-4 h-4 mx-1" /></li>
                            <li aria-current="page" className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left Column: Media Gallery (65%) */}
                        <div className="w-full lg:w-[65%] space-y-8">
                            <VehicleGallery images={vehicle.images} />

                            {/* Mobile Only Header (Title/Price/CTA) */}
                            <MobileVehicleHeader vehicle={vehicle} />

                            <TrustBar className="my-8" />
                            <SpecsTabs vehicle={vehicle} />

                            {/* Mobile Only Footer */}
                            <MobileVehicleFooter vehicle={vehicle} />
                        </div>

                        {/* Right Column: Sticky Details Panel (35%) - Desktop Only */}
                        <div className="hidden lg:block w-full lg:w-[35%]">
                            <RentalActionPanel vehicle={vehicle} whatsappMessage={whatsappMessage} />
                        </div>
                    </div>

                    {/* Similar Rentals */}
                    {finalSimilar.length > 0 && (
                        <div className="mt-24 border-t border-white/5 pt-12">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">More Rentals</h2>
                                <Link href="/rentals" className="text-[#edbc1d] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                                    View All Rentals <span>→</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {finalSimilar.map((v) => (
                                    <div key={v.id} className="h-full">
                                        <StitchVehicleCard vehicle={v} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

/* ─── Rental-specific Action Panel ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RentalActionPanel({ vehicle, whatsappMessage }: { vehicle: any; whatsappMessage: string }) {
    return (
        <div className="w-full relative">
            <div className="lg:sticky lg:top-24 space-y-6">
                <div className="glass-panel rounded-xl p-6 lg:p-8 shadow-2xl relative overflow-hidden border-t border-white/10 bg-[#0F172A]/60 backdrop-blur-xl">
                    {/* Subtle Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#edbc1d]/10 blur-[60px] rounded-full pointer-events-none"></div>

                    {/* Header */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-[#edbc1d]/80 text-xs font-bold uppercase tracking-widest">
                            <span>{vehicle.year} Model</span>
                            <span className="w-1 h-1 bg-[#edbc1d] rounded-full"></span>
                            <span>For Rent</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight uppercase font-display">
                            {vehicle.make} <span className="text-gray-400 font-light block text-2xl mt-1">{vehicle.model}</span>
                        </h1>
                    </div>

                    {/* Daily Rate */}
                    <div className="mb-8 border-b border-white/10 pb-6">
                        <span className="text-sm text-gray-400 font-medium block mb-1">Daily Rate</span>
                        <div className="text-4xl lg:text-5xl font-bold text-[#edbc1d] tracking-tight">
                            GH₵ {vehicle.dailyRate?.toLocaleString()}<span className="text-lg text-gray-500 font-normal">/day</span>
                        </div>
                        <span className="text-xs text-gray-500 mt-2 block">*Comprehensive insurance included</span>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <QuickSpec label="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
                        <QuickSpec label="Engine" value={vehicle.engineSize} />
                        <QuickSpec label="Fuel" value={vehicle.fuelType} />
                        <QuickSpec label="Trans." value={vehicle.transmission} />
                    </div>

                    {/* Availability Badge */}
                    {vehicle.isAvailable && (
                        <div className="flex items-center gap-2 mb-6 py-3 px-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-bold text-green-400 uppercase tracking-wider">Available Now</span>
                        </div>
                    )}

                    {/* VIP Action Block */}
                    <div className="space-y-3">
                        <Button
                            className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg py-6 rounded shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5"
                            asChild
                        >
                            <Link href="/rentals/apply">
                                APPLY TO RENT
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10 py-6 text-lg font-semibold backdrop-blur"
                            asChild
                        >
                            <a
                                href={generateWhatsAppLink(whatsappMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
                                WHATSAPP DIRECT
                            </a>
                        </Button>
                    </div>

                    {/* Pre-Qualification Notice */}
                    <div className="mt-6 p-4 border border-[#edbc1d]/20 rounded-xl bg-[#edbc1d]/5">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-[#edbc1d] shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-sm text-white">Pre-Qualification Required</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    A quick 5-minute form with valid ID — protects you and our fleet.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Consultant Profile */}
                    <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/5">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                            <div className="absolute inset-0 bg-gray-600 animate-pulse" />
                            <img src="https://i.pravatar.cc/150?u=ama" alt="Consultant" className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Fleet Manager</p>
                            <p className="text-sm font-bold text-white">Ama Serwaa</p>
                        </div>
                        <div className="ml-auto">
                            <button className="text-[#edbc1d] hover:text-white transition-colors">
                                <Phone className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mini Map/Location */}
                <div className="glass-panel rounded-xl p-1 overflow-hidden bg-[#0F172A]/60 backdrop-blur-xl border border-white/10">
                    <div className="bg-[#1e293b] h-32 w-full rounded relative group cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px), radial-gradient(#4b5563 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 10px 10px'
                        }}></div>
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600/30 transform -rotate-12"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-600/30 transform rotate-12"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-xl z-10">
                                <MapPin className="text-[#edbc1d] w-3 h-3" />
                                <span className="text-xs font-bold text-white">East Legon, Accra</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuickSpec({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                {label}
            </div>
            <span className="text-lg font-semibold text-white">{value}</span>
        </div>
    )
}
