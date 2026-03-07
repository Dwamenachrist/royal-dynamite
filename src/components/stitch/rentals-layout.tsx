"use client";

import { useState, useMemo, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types";
import { StitchVehicleCard } from "./vehicle-card";
import { StitchFilterSidebar, StitchFilters } from "./filter-sidebar";
import { MobileFilterSheet } from "./mobile-filter-sheet";
import { ChevronRight, Users, Package, Star, ArrowUpDown } from "lucide-react";
import LightRays from "../ui/LightRays";
import ElectricBorder from "../ui/ElectricBorder";
import AnimatedContent from "../ui/AnimatedContent";

interface StitchRentalsLayoutProps {
    initialVehicles: Vehicle[];
}

const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(amount);
};

export function StitchRentalsLayout({
    initialVehicles,
}: StitchRentalsLayoutProps) {
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState<StitchFilters>({
        searchTerm: "",
        bodyStyle: "all",
        priceRange: [50, 2000],
        make: "Any Make",
        model: "Any Model",
        yearRange: [2000, 2025],
    });

    const handleFiltersChange = (newFilters: StitchFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const filteredVehicles = useMemo(() => {
        return initialVehicles.filter((v) => {

            // 1. Search Term
            if (filters.searchTerm) {
                const term = filters.searchTerm.toLowerCase();
                const match =
                    v.make.toLowerCase().includes(term) ||
                    v.model.toLowerCase().includes(term) ||
                    v.year.toString().includes(term);
                if (!match) return false;
            }

            const activePrice = v.dailyRate || v.price || 0;
            // Budget check (Dual range handles applied to daily rate)
            if (activePrice > 0 && (activePrice < filters.priceRange[0] || activePrice > filters.priceRange[1])) return false;

            // Desktop Specific Filters
            if (filters.bodyStyle !== "all" && filters.bodyStyle !== "Same as category?") {
                const style = filters.bodyStyle.toLowerCase();
                const cat = v.category.toLowerCase();
                if (style === "sport" && cat !== "luxury") return false;
                if (style !== "sport" && cat !== style && style !== "all") return false;
            }

            if (filters.make !== "Any Make" && v.make !== filters.make) return false;

            return true;
        });
    }, [initialVehicles, filters]);

    const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
    const pagedVehicles = filteredVehicles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <>
            <MobileFilterSheet filters={filters} onFilterChange={handleFiltersChange} />

            {/* ════════════════════════════════════════════
                DESKTOP VIEW (Protected Layout)
            ════════════════════════════════════════════ */}
            <div className="hidden md:flex flex-col lg:flex-row gap-8 w-full">
                {/* Sidebar with Rental Mode */}
                <StitchFilterSidebar
                    className="w-full lg:w-80 flex-shrink-0"
                    onFilterChange={handleFiltersChange}
                    isRental={true}
                />

                {/* Grid */}
                <div className="flex-grow">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <p className="text-slate-400 mb-4 md:mb-0">
                            Showing <span className="text-white font-bold">{filteredVehicles.length}</span> Premium Rentals
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-400">Sort by:</span>
                            <div className="relative group">
                                <select className="bg-transparent text-white font-medium pr-8 pl-2 py-1 outline-none cursor-pointer appearance-none">
                                    <option className="bg-slate-900">Price: Low to High</option>
                                    <option className="bg-slate-900">Price: High to Low</option>
                                    <option className="bg-slate-900">Top Rated</option>
                                </select>
                                <ArrowUpDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rd-gold pointer-events-none group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {pagedVehicles.map((vehicle) => (
                            <StitchVehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                        {pagedVehicles.length === 0 && (
                            <div className="col-span-3 py-24 text-center text-slate-500">
                                No vehicles match your filters.
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-16">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${page === currentPage ? 'bg-rd-gold text-[#0a192f]' : 'border border-white/10 text-slate-400 hover:text-white hover:border-rd-gold hover:bg-rd-gold/10'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ════════════════════════════════════════════
                MOBILE VIEW (Cockpit Vault Rentals Feed)
            ════════════════════════════════════════════ */}
            <div className="block md:hidden relative w-full -mt-6">

                <div className="flex justify-between items-center mb-6 px-4">
                    <p className="text-[#8892B0] text-[10px] font-bold tracking-widest uppercase">
                        Deploying <span className="text-white">{filteredVehicles.length}</span> Assets
                    </p>
                </div>

                {/* The Rentals Vertical Feed (Cinematic Edge-to-Edge) */}
                <div className="w-[calc(100%+2rem)] -ml-4 pl-4 pr-10 overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar flex flex-col gap-6 h-[600px] pb-10">
                    {pagedVehicles.length > 0 ? (
                        pagedVehicles.map((v, idx) => {
                            const activePrice = v.dailyRate || v.price || 0;
                            return (
                                <Fragment key={v.id}>
                                    <AnimatedContent distance={30} direction="vertical" delay={0.1}>
                                        <article className="relative w-full h-[450px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] snap-center group border border-[#D4AF37]/15 bg-[#112240] shrink-0">
                                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-[1fr_120px] gap-0">
                                                {/* Top Image Area */}
                                                <div className="col-span-2 relative overflow-hidden bg-black">
                                                    <Image
                                                        src={v.images[0] || "/placeholder-car.jpg"}
                                                        alt={`${v.make} ${v.model}`}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                                                        sizes="100vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A111F] via-[#0A111F]/30 to-transparent" />
                                                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                                                        <div>
                                                            <h2 className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-2xl font-serif leading-tight">{v.make} {v.model}</h2>
                                                            <p className="text-[10px] text-[#D4AF37] font-bold tracking-[0.3em] mt-1 uppercase">{v.category} {"///"} {v.year}</p>
                                                        </div>
                                                        <div className="bg-[#112240]/50 backdrop-blur-md px-3 py-1 rounded-sm text-[9px] text-[#D4AF37] border border-[#D4AF37]/40 tracking-widest uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                                                            Available
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(212, 175, 55, 0.4) 50%)", backgroundSize: "100% 4px" }} />
                                                </div>

                                                {/* Bottom Left: Passenger & Luggage Telemetry */}
                                                <div className="bg-[#112240]/40 backdrop-blur-[24px] p-5 flex flex-col justify-between border-t border-r border-[#D4AF37]/10">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-[9px] text-[#8892B0] tracking-widest uppercase font-bold">CAPACITY</span>
                                                        <Users className="text-[#D4AF37] w-[14px] h-[14px]" />
                                                    </div>
                                                    <div className="flex items-baseline gap-1 mt-1">
                                                        <span className="text-3xl font-bold text-white leading-none font-serif">5</span>
                                                        <span className="text-xs text-[#D4AF37]/80">Seats</span>
                                                    </div>

                                                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-2">
                                                        <span className="text-[9px] text-[#8892B0] tracking-widest uppercase font-bold">LUGGAGE</span>
                                                        <div className="flex items-center gap-1">
                                                            <Package className="text-[#D4AF37] w-[10px] h-[10px]" />
                                                            <span className="text-xs font-bold text-white font-serif">4</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Bottom Right: Command Panel (Rent) */}
                                                <div className="bg-[#112240]/40 backdrop-blur-[24px] p-5 flex flex-col justify-between border-t border-[#D4AF37]/10 relative overflow-hidden">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-[9px] text-[#8892B0] tracking-widest uppercase font-bold">DAILY RATE</span>
                                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]"></div>
                                                    </div>
                                                    <div className="text-xl font-bold text-white truncate whitespace-nowrap">{formatPrice(activePrice)}</div>
                                                    <Link href={`/rentals/${v.id}`} className="w-full h-9 mt-2 shrink-0">
                                                        <ElectricBorder borderRadius={4} color="#D4AF37" speed={2.5} className="h-full w-full">
                                                            <button className="h-full w-full bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A111F] transition-colors duration-300 text-[10px] font-bold tracking-[0.15em] uppercase border border-[#D4AF37]/20 flex items-center justify-center gap-2 group/btn">
                                                                Reserve
                                                                <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                                            </button>
                                                        </ElectricBorder>
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </AnimatedContent>
                                    {idx === 1 && (
                                        <AnimatedContent distance={30} direction="vertical" delay={0.1}>
                                            <article className="relative w-full h-[450px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] snap-center flex flex-col items-center justify-center p-8 bg-[#D4AF37] shrink-0 text-center">
                                                <LightRays className="opacity-30 mix-blend-overlay" raysColor="#FFFFFF" />
                                                <div className="relative z-10">
                                                    <div className="w-16 h-16 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center backdrop-blur-md">
                                                        <Star className="w-8 h-8 text-[#0A111F]" fill="currentColor" />
                                                    </div>
                                                    <h3 className="text-3xl font-serif font-bold text-[#0A111F] mb-4">Chauffeur Service</h3>
                                                    <p className="text-[#0A111F]/80 text-sm mb-8 font-medium">Need a professional driver? Upgrade any rental with our executive chauffeur service for ultimate comfort.</p>
                                                    <Link href="/transport" className="inline-flex items-center justify-center w-full h-12 bg-[#0A111F] text-[#D4AF37] font-bold text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-[#112240] transition-colors shadow-2xl">
                                                        Add Chauffeuring
                                                    </Link>
                                                </div>
                                            </article>
                                        </AnimatedContent>
                                    )}
                                </Fragment>
                            );
                        })
                    ) : (
                        <div className="w-full py-24 text-center text-slate-500">
                            No rentals match your filters.
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center gap-2 pb-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${page === currentPage ? 'bg-[#D4AF37] text-[#0A111F] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#112240] text-slate-400 active:scale-95 border border-white/5'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
