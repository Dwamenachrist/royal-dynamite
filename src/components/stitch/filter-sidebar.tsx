"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, CarFront, Truck, Car } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Types for our filters
export interface StitchFilters {
    searchTerm: string;
    bodyStyle: string;
    priceRange: [number, number];
    make: string;
    model: string;
    yearRange: [number, number];
}

interface StitchFilterSidebarProps {
    onFilterChange: (filters: StitchFilters) => void;
    className?: string;
    isRental?: boolean;
}

export function StitchFilterSidebar({
    onFilterChange,
    className,
    isRental = false,
}: StitchFilterSidebarProps) {
    // Main filter state (committed values)
    const [filters, setFilters] = useState<StitchFilters>({
        searchTerm: "",
        bodyStyle: "all",
        priceRange: isRental ? [50, 2000] : [20000, 800000],
        make: "Any Make",
        model: "Any Model",
        yearRange: [2018, 2024],
    });

    // Local visual state for slider handles (so text updates while dragging)
    const [visualPriceRange, setVisualPriceRange] = useState<[number, number]>(
        isRental ? [50, 2000] : [20000, 800000]
    );

    const handleFilterChange = (key: keyof StitchFilters, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    // Update LOCAL visual state (no filtering)
    const handleSliderChange = (val: [number, number]) => {
        setVisualPriceRange(val);
    };

    // Commit state (triggers filtering)
    const handleSliderCommit = (val: [number, number]) => {
        setVisualPriceRange(val); // Ensure sync
        handleFilterChange("priceRange", val);
    };

    const handleReset = () => {
        const resetFilters: StitchFilters = {
            searchTerm: "",
            bodyStyle: "all",
            priceRange: isRental ? [50, 2000] : [20000, 800000],
            make: "Any Make",
            model: "Any Model",
            yearRange: [2018, 2024],
        };
        setFilters(resetFilters);
        setVisualPriceRange(isRental ? [50, 2000] : [20000, 800000]); // Reset visual too
        onFilterChange(resetFilters);
    };

    const bodyStyles = [
        { id: "sedan", label: "Sedan", icon: CarFront },
        { id: "suv", label: "SUV", icon: Car },
        { id: "truck", label: "Truck", icon: Truck },
        { id: "coupe", label: "Coupe", icon: Car },
    ];

    const minPrice = isRental ? 50 : 20000;
    const maxPrice = isRental ? 2000 : 1000000;
    const priceStep = isRental ? 50 : 10000;

    return (
        <aside className={cn("w-full lg:w-80 flex-shrink-0", className)}>
            <div className="lg:sticky lg:top-24 bg-[#112240] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                {/* Premium Glass Effect Overlay */}
                <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-rd-gold" />
                        Filters
                    </h2>
                    <button
                        onClick={handleReset}
                        className="text-[10px] text-slate-500 hover:text-rd-gold transition-colors uppercase tracking-wider font-bold"
                    >
                        Reset All
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative z-10 mb-8 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-rd-gold transition-colors" />
                    <input
                        type="text"
                        placeholder="Search keywords..."
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                        className="w-full bg-[#0a192f] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-rd-gold focus:outline-none transition-all shadow-inner"
                    />
                </div>

                {/* Body Style Toggles */}
                <div className="relative z-10 mb-8">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                        Body Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {bodyStyles.map((style) => {
                            const Icon = style.icon;
                            const isActive = filters.bodyStyle === style.id;
                            return (
                                <button
                                    key={style.id}
                                    onClick={() => handleFilterChange("bodyStyle", isActive ? "all" : style.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300",
                                        isActive
                                            ? "border-rd-gold bg-rd-gold/10 text-rd-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                            : "border-white/5 bg-[#0a192f]/50 text-slate-400 hover:bg-[#0a192f] hover:border-white/10"
                                    )}
                                >
                                    <Icon className="w-5 h-5 mb-2" />
                                    <span className="text-[10px] font-bold uppercase">{style.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Price Range Slider */}
                <div className="relative z-10 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {isRental ? "Daily Rate" : "Price Range"}
                        </label>
                    </div>

                    <div className="px-2 pb-4">
                        <div className="relative">
                            <Slider
                                min={minPrice}
                                max={maxPrice}
                                step={priceStep}
                                value={visualPriceRange}
                                onValueChange={handleSliderChange}
                                onValueCommit={handleSliderCommit}
                            />
                            {/* Ruler ticks */}
                            <div className="flex justify-between mt-3 px-[9px]">
                                {Array.from({ length: 6 }).map((_, i) => {
                                    const percentage = i * 20;
                                    const value = minPrice + ((maxPrice - minPrice) * (percentage / 100));
                                    let label = "0";
                                    if (value >= 1000) label = `${(value / 1000).toFixed(0)}k`;
                                    else if (value > 0) label = value.toFixed(0);

                                    return (
                                        <div key={i} className="flex flex-col items-center" style={{ width: '1px' }}>
                                            <div className="w-px h-2 bg-slate-600" />
                                            <span className="text-[9px] text-slate-500 font-medium mt-1">{label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-4 text-xs font-medium font-mono text-rd-gold">
                        <div className="px-2 py-1 bg-[#0a192f] rounded border border-white/10">
                            <span className="text-slate-500 mr-1">Min:</span>
                            GH₵ {isRental ? visualPriceRange[0] : (visualPriceRange[0] / 1000).toFixed(0) + 'k'}
                        </div>
                        <div className="px-2 py-1 bg-[#0a192f] rounded border border-white/10">
                            <span className="text-slate-500 mr-1">Max:</span>
                            GH₵ {isRental ? visualPriceRange[1] : (visualPriceRange[1] / 1000).toFixed(0) + 'k'}
                        </div>
                    </div>
                </div>

                {/* Dropdowns */}
                <div className="relative z-10 space-y-4">
                    <div className="relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                            Make
                        </label>
                        <select
                            value={filters.make}
                            onChange={(e) => handleFilterChange("make", e.target.value)}
                            className="w-full bg-[#0a192f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:border-rd-gold focus:outline-none transition-colors shadow-inner cursor-pointer"
                        >
                            <option value="Any Make">Any Make</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="Land Rover">Land Rover</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Lexus">Lexus</option>
                        </select>
                        <div className="absolute right-4 bottom-3.5 pointer-events-none text-slate-500 text-[10px]">▼</div>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                            Year
                        </label>
                        <select
                            className="w-full bg-[#0a192f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm appearance-none focus:border-rd-gold focus:outline-none transition-colors shadow-inner cursor-pointer"
                        >
                            <option>2018 - 2025</option>
                            <option>2020+</option>
                            <option>2022+</option>
                            <option>Brand New</option>
                        </select>
                        <div className="absolute right-4 bottom-3.5 pointer-events-none text-slate-500 text-[10px]">▼</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
