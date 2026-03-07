"use client"

import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

type Vehicle = {
    id: string
    make: string
    model: string
    year: number | string
    daily_rate: number | null
    images?: string[] | null
    transmission?: string | null
    status: string
    featured: boolean | null
}

export function FeaturedVehiclesCarousel({ vehicles }: { vehicles: Vehicle[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start", skipSnaps: false },
        [Autoplay({ delay: 6000, stopOnInteraction: true })]
    )

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    if (!vehicles || vehicles.length === 0) return null

    return (
        <section className="relative py-24 overflow-hidden" style={{ background: '#020617' }}>
            {/* Cinematic Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rd-gold/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            </div>

            <div className="relative z-10 pl-4 md:pl-12 lg:pl-24 mb-12 flex flex-col md:flex-row md:items-end justify-between pr-4 md:pr-12 lg:pr-24 gap-6">
                <div>
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-rd-gold mb-4 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-rd-gold inline-block"></span>
                        Spotlight Collection
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
                        Featured Fleet
                    </h3>
                </div>

                {/* Navigation Buttons Desktop */}
                <div className="hidden md:flex gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="rounded-full border-white/10 bg-white/5 hover:bg-rd-gold/20 hover:text-rd-gold hover:border-rd-gold/50 text-white h-14 w-14 transition-all duration-300"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="rounded-full border-white/10 bg-white/5 hover:bg-rd-gold/20 hover:text-rd-gold hover:border-rd-gold/50 text-white h-14 w-14 transition-all duration-300"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Embla Viewport */}
            <div className="relative z-10 pl-4 md:pl-12 lg:pl-24">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-6" style={{ touchAction: "pan-y pinch-zoom" }}>
                        {vehicles.map((vehicle) => (
                            <div className="flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_40%] pl-6 min-w-0 transition-transform duration-500 cursor-grab active:cursor-grabbing" key={vehicle.id}>
                                <Link href={`/dealership`} className="block group relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] bg-[#0F172A] border border-white/5 hover:border-rd-gold/40 transition-all duration-500 shadow-2xl">
                                    <Image
                                        src={vehicle.images?.[0] || "/placeholder-car.png"}
                                        alt={`${vehicle.make} ${vehicle.model}`}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 40vw"
                                        priority={vehicles.indexOf(vehicle) === 0}
                                    />

                                    {/* Vignette Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[rgba(6,13,26,0.5)] to-transparent pointer-events-none" />

                                    {/* Top Tag */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white md:text-sm text-xs font-semibold border border-white/10 shadow-lg">
                                            {vehicle.year}
                                        </div>
                                    </div>

                                    {/* Bottom Content */}
                                    <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-10 flex justify-between items-end">
                                        <div>
                                            <p className="text-rd-gold text-xs uppercase tracking-[0.2em] font-bold mb-2">{vehicle.daily_rate ? `GH₵ ${vehicle.daily_rate.toLocaleString()}/day` : "Enquire for Price"}</p>
                                            <h4 className="text-2xl md:text-3xl font-bold text-white font-serif drop-shadow-md">
                                                {vehicle.make} {vehicle.model}
                                            </h4>
                                            <p className="text-white/60 text-sm mt-1">{vehicle.transmission}</p>
                                        </div>

                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-rd-gold group-hover:text-black group-hover:border-rd-gold transition-all duration-300">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Nav & CTA */}
            <div className="flex items-center justify-between px-4 mt-8 md:hidden relative z-10">
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full border-white/10 bg-white/5 text-white h-12 w-12"><ArrowLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full border-white/10 bg-white/5 text-white h-12 w-12"><ArrowRight className="h-4 w-4" /></Button>
                </div>
            </div>

            <div className="mt-16 text-center relative z-10">
                <Button asChild variant="outline" className="h-14 px-8 rounded-full border-rd-gold text-rd-gold hover:bg-rd-gold hover:text-black font-semibold tracking-wider uppercase text-sm">
                    <Link href="/dealership">Explore All Vehicles</Link>
                </Button>
            </div>
        </section>
    )
}
