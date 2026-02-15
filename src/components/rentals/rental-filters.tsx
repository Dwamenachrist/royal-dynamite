"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export interface RentalFilters {
    vehicleType: string;
    transmission: string;
    fuelTypes: string[];
    priceRange: [number, number];
    startDate?: string;
    endDate?: string;
}

interface RentalFilterSidebarProps {
    filters: RentalFilters;
    onFiltersChange: (filters: RentalFilters) => void;
    vehicleCount: number;
}

const VEHICLE_TYPES = [
    { value: "all", label: "All" },
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "van", label: "Van" },
    { value: "bus", label: "Bus" },
];

const TRANSMISSIONS = [
    { value: "all", label: "Any" },
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
];

const FUEL_OPTIONS = ["Petrol", "Diesel", "Hybrid", "Electric"];

const PRICE_MIN = 200;
const PRICE_MAX = 1500;

function FilterContent({ filters, onFiltersChange }: Omit<RentalFilterSidebarProps, "vehicleCount">) {
    const handleTypeChange = (type: string) => {
        onFiltersChange({ ...filters, vehicleType: type });
    };

    const handleTransmissionChange = (trans: string) => {
        onFiltersChange({ ...filters, transmission: trans });
    };

    const handleFuelToggle = (fuel: string) => {
        const newFuels = filters.fuelTypes.includes(fuel)
            ? filters.fuelTypes.filter((f) => f !== fuel)
            : [...filters.fuelTypes, fuel];
        onFiltersChange({ ...filters, fuelTypes: newFuels });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        onFiltersChange({ ...filters, priceRange: [PRICE_MIN, val] });
    };

    const handleReset = () => {
        onFiltersChange({
            vehicleType: "all",
            transmission: "all",
            fuelTypes: [],
            priceRange: [PRICE_MIN, PRICE_MAX],
            startDate: "",
            endDate: "",
        });
    };

    const hasActiveFilters =
        filters.vehicleType !== "all" ||
        filters.transmission !== "all" ||
        filters.fuelTypes.length > 0 ||
        filters.fuelTypes.length > 0 ||
        filters.priceRange[1] !== PRICE_MAX ||
        !!filters.startDate ||
        !!filters.endDate;

    return (
        <div className="space-y-7">
            {/* Date Range */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide">Rental Period</h3>
                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium ml-1">Pick-up Date</label>
                        <input
                            type="date"
                            value={filters.startDate || ""}
                            onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
                            className="w-full bg-transparent border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-rd-navy dark:focus:border-rd-gold transition-colors"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs text-muted-foreground font-medium ml-1">Return Date</label>
                        <input
                            type="date"
                            value={filters.endDate || ""}
                            onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
                            className="w-full bg-transparent border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-rd-navy dark:focus:border-rd-gold transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Vehicle Type */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide">Vehicle Type</h3>
                <div className="flex flex-wrap gap-2">
                    {VEHICLE_TYPES.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => handleTypeChange(t.value)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${filters.vehicleType === t.value
                                ? "bg-rd-navy text-white border-rd-navy shadow-sm"
                                : "bg-transparent text-muted-foreground border-border hover:border-rd-navy/30 hover:text-foreground"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide">Price Range</h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min={PRICE_MIN}
                        max={PRICE_MAX}
                        step={50}
                        value={filters.priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-rd-navy [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rd-navy [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>GH₵ {PRICE_MIN}</span>
                        <span className="font-medium text-foreground">GH₵ {filters.priceRange[1]}/day</span>
                    </div>
                </div>
            </div>

            {/* Fuel Type */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide">Fuel Type</h3>
                <div className="grid grid-cols-2 gap-2">
                    {FUEL_OPTIONS.map((fuel) => (
                        <label
                            key={fuel}
                            className="flex items-center gap-2.5 cursor-pointer group"
                        >
                            <div
                                className={`w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all duration-200 ${filters.fuelTypes.includes(fuel)
                                    ? "bg-rd-navy border-rd-navy"
                                    : "border-border/80 group-hover:border-rd-navy/40"
                                    }`}
                            >
                                {filters.fuelTypes.includes(fuel) && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{fuel}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide">Transmission</h3>
                <div className="flex gap-2">
                    {TRANSMISSIONS.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => handleTransmissionChange(t.value)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${filters.transmission === t.value
                                ? "bg-rd-navy text-white border-rd-navy shadow-sm"
                                : "bg-transparent text-muted-foreground border-border hover:border-rd-navy/30 hover:text-foreground"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
                <Button className="w-full bg-rd-navy hover:bg-rd-navy/90 text-white font-semibold rounded-lg">
                    Apply Filters
                </Button>
                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="w-full text-xs text-muted-foreground hover:text-rd-gold transition-colors py-1.5 font-medium"
                    >
                        Reset All
                    </button>
                )}
            </div>
        </div>
    );
}

// Desktop Sidebar
export function RentalFilterSidebar({ filters, onFiltersChange, vehicleCount }: RentalFilterSidebarProps) {
    return (
        <aside className="hidden lg:block w-[260px] shrink-0">
            <div className="sticky top-24 bg-[#FAFAFA] dark:bg-zinc-900/60 border border-border/50 rounded-2xl p-6">
                <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
            </div>
        </aside>
    );
}

// Mobile Filter Sheet
export function MobileFilterSheet({ filters, onFiltersChange, vehicleCount }: RentalFilterSidebarProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 rounded-full border-border/60">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[340px] p-6">
                    <SheetHeader className="mb-6">
                        <SheetTitle className="font-serif">Filter Vehicles</SheetTitle>
                    </SheetHeader>
                    <FilterContent filters={filters} onFiltersChange={onFiltersChange} />
                </SheetContent>
            </Sheet>
        </div>
    );
}
