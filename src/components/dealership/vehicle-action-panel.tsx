import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { generateWhatsAppLink } from "@/lib/constants"

interface VehicleActionPanelProps {
    vehicle: any // eslint-disable-line @typescript-eslint/no-explicit-any
    className?: string
}

export function VehicleActionPanel({ vehicle, className }: VehicleActionPanelProps) {
    return (
        <div className={cn("w-full relative", className)}>
            <div className="lg:sticky lg:top-24 space-y-6">
                <div className="glass-panel rounded-xl p-6 lg:p-8 shadow-2xl relative overflow-hidden border-t border-white/10 bg-[#0F172A]/60 backdrop-blur-xl">
                    {/* Subtle Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#edbc1d]/10 blur-[60px] rounded-full pointer-events-none"></div>

                    {/* Header */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-[#edbc1d]/80 text-xs font-bold uppercase tracking-widest">
                            <span>{vehicle.year} Model</span>
                            <span className="w-1 h-1 bg-[#edbc1d] rounded-full"></span>
                            <span>{vehicle.status === 'sale' ? 'Unregistered' : 'For Rent'}</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight uppercase font-display">
                            {vehicle.make} <span className="text-gray-400 font-light block text-2xl mt-1">{vehicle.model}</span>
                        </h1>
                    </div>

                    {/* Price */}
                    <div className="mb-8 border-b border-white/10 pb-6">
                        <span className="text-sm text-gray-400 font-medium block mb-1">Asking Price</span>
                        <div className="text-4xl lg:text-5xl font-bold text-[#edbc1d] tracking-tight">
                            {vehicle.price ? `GH₵ ${vehicle.price.toLocaleString()}` : `GH₵ ${vehicle.dailyRate}/day`}
                        </div>
                        <span className="text-xs text-gray-500 mt-2 block">*Price includes all import duties and taxes</span>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <QuickSpec label="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} icon="speed" />
                        <QuickSpec label="Engine" value={vehicle.engineSize} icon="settings" />
                        <QuickSpec label="Fuel" value={vehicle.fuelType} icon="local_gas_station" />
                        <QuickSpec label="Trans." value={vehicle.transmission} icon="auto_mode" />
                    </div>

                    {/* VIP Action Block */}
                    <div className="space-y-3">
                        <Button
                            asChild
                            className="w-full bg-gradient-to-r from-[#edbc1d] to-yellow-500 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg py-6 rounded shadow-lg shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5"
                        >
                            <Link href={`/dealership/${vehicle.id}/enquire`}>
                                ENQUIRE NOW
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full bg-white/5 hover:bg-[#25D366] text-white hover:text-white border-white/10 hover:border-[#25D366] py-6 text-lg font-semibold backdrop-blur transition-all duration-300 group"
                        >
                            <a
                                href={generateWhatsAppLink(
                                    `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.price ? ` listed at GH₵ ${vehicle.price.toLocaleString()}` : ''}. Please send me more details.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp className="w-5 h-5 mr-2 text-[#25D366] group-hover:text-white transition-colors" />
                                WHATSAPP DIRECT
                            </a>
                        </Button>
                    </div>

                    {/* Consultant Profile */}
                    <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/5">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                            <div className="absolute inset-0 bg-gray-600 animate-pulse" /> {/* Placeholder if image fail */}
                            {/* Using a placeholder avatar for now */}
                            <img src="https://i.pravatar.cc/150?u=kwame" alt="Consultant" className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Sales Consultant</p>
                            <p className="text-sm font-bold text-white">Kwame Mensah</p>
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
                    <div className="bg-[#1e293b] h-32 w-full rounded relative group cursor-pointer overflow-hidden relative">
                        {/* CSS Based Map Pattern */}
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
                                <span className="text-xs font-bold text-white">Adenta - Bulldog, Accra</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuickSpec({ label, value, icon }: { label: string, value: string, icon: string }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider">
                {/* Fallback to text if material icons not loaded, or use lucide equivalent if provided */}
                {/* <span className="material-icons text-sm">{icon}</span>  */}
                {label}
            </div>
            <span className="text-lg font-semibold text-white">{value}</span>
        </div>
    )
}
