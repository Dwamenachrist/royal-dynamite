"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, CarFront, Truck, Car, X, Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { StitchFilters } from "./filter-sidebar";
import { VEHICLE_MAKES } from "@/lib/constants";

interface MobileFilterBarProps {
    onFilterChange: (filters: StitchFilters) => void;
    currentFilters: StitchFilters;
    isRental?: boolean;
}

const bodyStyles = [
    { id: "all", label: "All Vehicles", icon: CarFront },
    { id: "sedan", label: "Sedans", icon: CarFront },
    { id: "suv", label: "SUVs", icon: Car },
    { id: "truck", label: "Trucks", icon: Truck },
    { id: "coupe", label: "Coupes", icon: Car },
];

export function StitchMobileFilterBar({ onFilterChange, currentFilters, isRental = false }: MobileFilterBarProps) {
    const minPrice = isRental ? 50 : 20000;
    const maxPrice = isRental ? 2000 : 1000000;
    const priceStep = isRental ? 50 : 10000;

    const [visualPriceRange, setVisualPriceRange] = useState<[number, number]>(currentFilters.priceRange);
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleFilterChange = <K extends keyof StitchFilters>(key: K, value: StitchFilters[K]) => {
        const newFilters = { ...currentFilters, [key]: value };
        onFilterChange(newFilters);
    };

    const handleSliderChange = (val: [number, number]) => {
        setVisualPriceRange(val);
    };

    const handleSliderCommit = (val: [number, number]) => {
        setVisualPriceRange(val);
        handleFilterChange("priceRange", val);
    };

    const handleYearChange = (val: string) => {
        const ranges: Record<string, [number, number]> = {
            all: [2000, 2025],
            "2020": [2020, 2025],
            "2022": [2022, 2025],
            "2024": [2024, 2025],
        };
        handleFilterChange("yearRange", ranges[val] || [2000, 2025]);
    };

    const activeFilterCount =
        (currentFilters.make !== "Any Make" ? 1 : 0) +
        (currentFilters.yearRange[0] > 2000 ? 1 : 0) +
        (currentFilters.priceRange[0] > minPrice || currentFilters.priceRange[1] < maxPrice ? 1 : 0);

    return (
        <div className="w-full lg:hidden mb-6 flex flex-col gap-4 relative z-20">
            {/* Search and Filter Row */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={currentFilters.searchTerm}
                        onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                        className="w-full bg-[#112240] border border-white/5 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:border-rd-gold focus:outline-none focus:ring-1 focus:ring-rd-gold transition-all shadow-lg"
                    />
                </div>

                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <button className="relative flex items-center justify-center p-3.5 bg-[#112240] border border-white/5 rounded-2xl text-white hover:border-rd-gold/50 transition-all shadow-lg">
                            <SlidersHorizontal className="w-5 h-5 text-rd-gold" />
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rd-gold text-[#0a192f] text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="bg-[#112240] border-t border-white/10 p-0 rounded-t-3xl max-h-[85vh] overflow-y-auto">
                        <div className="p-6 pb-8 backdrop-blur-xl bg-[#0a192f]/50">
                            <SheetHeader className="pb-6 border-b border-white/5 mb-6 text-left">
                                <SheetTitle className="text-white text-lg font-serif tracking-wide flex items-center justify-between">
                                    Filters
                                    <button onClick={() => setSheetOpen(false)} className="p-1 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </SheetTitle>
                            </SheetHeader>

                            {/* Deep Filters */}
                            <div className="space-y-8">
                                {/* Price Slider */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {isRental ? "Daily Rate" : "Price Range"}
                                    </label>
                                    <div className="px-2 pt-2">
                                        <Slider
                                            min={minPrice}
                                            max={maxPrice}
                                            step={priceStep}
                                            value={visualPriceRange}
                                            onValueChange={handleSliderChange}
                                            onValueCommit={handleSliderCommit}
                                            className="[&_[role=slider]]:bg-rd-gold [&_[role=slider]]:border-none"
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs font-mono text-rd-gold">
                                        <span>GH₵ {isRental ? visualPriceRange[0] : (visualPriceRange[0] / 1000).toFixed(0) + 'k'}</span>
                                        <span>GH₵ {isRental ? visualPriceRange[1] : (visualPriceRange[1] / 1000).toFixed(0) + 'k'}</span>
                                    </div>
                                </div>

                                {/* Make Dropdown */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Make</label>
                                    <select
                                        value={currentFilters.make}
                                        onChange={(e) => handleFilterChange("make", e.target.value)}
                                        className="w-full bg-[#0a192f] border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm appearance-none focus:border-rd-gold focus:outline-none transition-colors"
                                    >
                                        {VEHICLE_MAKES.map((make) => (
                                            <option key={make} value={make}>{make}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Year Dropdown */}
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Year</label>
                                    <select
                                        value={currentFilters.yearRange[0] === 2024 ? "2024" : currentFilters.yearRange[0] === 2022 ? "2022" : currentFilters.yearRange[0] === 2020 ? "2020" : "all"}
                                        onChange={(e) => handleYearChange(e.target.value)}
                                        className="w-full bg-[#0a192f] border border-white/10 text-white rounded-xl px-4 py-3.5 text-sm appearance-none focus:border-rd-gold focus:outline-none transition-colors"
                                    >
                                        <option value="all">All Years</option>
                                        <option value="2020">2020 and newer</option>
                                        <option value="2022">2022 and newer</option>
                                        <option value="2024">Brand New (2024+)</option>
                                    </select>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => {
                                            handleFilterChange("make", "Any Make");
                                            handleFilterChange("yearRange", [2000, 2025]);
                                            handleSliderCommit([minPrice, maxPrice]);
                                        }}
                                        className="py-3.5 rounded-xl border border-white/10 text-white text-sm font-semibold tracking-wider uppercase hover:bg-white/5 transition-colors"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => setSheetOpen(false)}
                                        className="py-3.5 rounded-xl bg-rd-gold text-[#0a192f] text-sm font-semibold tracking-wider uppercase shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                                    >
                                        Show Results
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Horizontal Scrollable Pills for Categories */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {bodyStyles.map((style) => {
                    const isActive = currentFilters.bodyStyle === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => handleFilterChange("bodyStyle", style.id)}
                            className={cn(
                                "flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                isActive
                                    ? "bg-rd-gold border-rd-gold text-[#0a192f] shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
                                    : "bg-[#112240] border-white/5 text-slate-400 hover:text-white hover:border-white/20"
                            )}
                        >
                            {style.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
