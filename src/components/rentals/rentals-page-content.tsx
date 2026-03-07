"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    CheckCircle,
    ArrowRight,
    Search,
    MessageCircle,
    ChevronDown,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
    RentalFilterSidebar,
    MobileFilterSheet,
    RentalVehicleCard,
} from "@/components/rentals";
import type { RentalFilters } from "@/components/rentals";
import type { Vehicle } from "@/types";

type SortOption = "price-low" | "price-high" | "rating" | "newest";

interface RentalsPageContentProps {
    initialVehicles: Vehicle[];
}

export function RentalsPageContent({ initialVehicles }: RentalsPageContentProps) {
    const [filters, setFilters] = useState<RentalFilters>({
        vehicleType: "all",
        transmission: "all",
        fuelTypes: [],
        priceRange: [200, 1500],
    });

    const [sortBy, setSortBy] = useState<SortOption>("price-low");
    const [showSortMenu, setShowSortMenu] = useState(false);

    // Apply filters
    const filteredVehicles = useMemo(() => {
        let result = [...initialVehicles];

        // Vehicle type
        if (filters.vehicleType !== "all") {
            result = result.filter(
                (v: Vehicle) => v.category === filters.vehicleType || (filters.vehicleType === "suv" && v.category === "luxury")
            );
        }

        // Transmission
        if (filters.transmission !== "all") {
            result = result.filter((v: Vehicle) => v.transmission === filters.transmission);
        }

        // Fuel types
        if (filters.fuelTypes.length > 0) {
            result = result.filter((v: Vehicle) => {
                const fuel = v.fuelType?.toLowerCase() || "";
                return filters.fuelTypes.some((f) => {
                    if (f === "Gasoline") return fuel === "petrol" || fuel === "gasoline";
                    return fuel === f.toLowerCase();
                });
            });
        }

        // Price range
        result = result.filter(
            (v: Vehicle) =>
                v.dailyRate !== null &&
                v.dailyRate >= filters.priceRange[0] &&
                v.dailyRate <= filters.priceRange[1]
        );

        // Sort
        switch (sortBy) {
            case "price-low":
                result.sort((a: Vehicle, b: Vehicle) => (a.dailyRate ?? 0) - (b.dailyRate ?? 0));
                break;
            case "price-high":
                result.sort((a: Vehicle, b: Vehicle) => (b.dailyRate ?? 0) - (a.dailyRate ?? 0));
                break;
            case "rating":
                result.sort((a: Vehicle, b: Vehicle) => (b.rating ?? 0) - (a.rating ?? 0));
                break;
            case "newest":
                result.sort((a: Vehicle, b: Vehicle) => b.year - a.year);
                break;
        }

        return result;
    }, [initialVehicles, filters, sortBy]);

    const sortLabels: Record<SortOption, string> = {
        "price-low": "Lowest Price",
        "price-high": "Highest Price",
        rating: "Top Rated",
        newest: "Newest First",
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Compact Hero Strip */}
            <section className="bg-rd-navy pt-32 md:pt-36">
                <div className="container px-4 md:px-6 pb-8 md:pb-10">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                            Vehicle Rentals
                        </h1>
                        <p className="mt-2 text-sm md:text-base text-gray-400 max-w-lg mx-auto">
                            Premium & Reliable Mobility Solutions in Ghana
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-300">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle className="h-3.5 w-3.5 text-rd-gold" />
                                Verified Fleet
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle className="h-3.5 w-3.5 text-rd-gold" />
                                Insurance Included
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle className="h-3.5 w-3.5 text-rd-gold" />
                                24/7 Support
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content: Sidebar + Grid */}
            <section className="py-8 md:py-10">
                <div className="container px-4 md:px-6">
                    <div className="flex gap-8">
                        {/* Desktop Sidebar */}
                        <RentalFilterSidebar
                            filters={filters}
                            onFiltersChange={setFilters}
                            vehicleCount={filteredVehicles.length}
                        />

                        {/* Grid Area */}
                        <div className="flex-1 min-w-0">
                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    {/* Mobile filter trigger */}
                                    <MobileFilterSheet
                                        filters={filters}
                                        onFiltersChange={setFilters}
                                        vehicleCount={filteredVehicles.length}
                                    />
                                    <h2 className="text-lg font-semibold text-foreground">
                                        <span className="text-rd-navy dark:text-rd-gold font-bold">{filteredVehicles.length}</span>{" "}
                                        <span className="text-muted-foreground font-normal">vehicles available</span>
                                    </h2>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSortMenu(!showSortMenu)}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/50 hover:border-border"
                                    >
                                        <span className="hidden sm:inline text-xs text-muted-foreground/60">Sort by:</span>
                                        <span className="font-medium text-foreground text-xs">{sortLabels[sortBy]}</span>
                                        <ChevronDown className="h-3.5 w-3.5" />
                                    </button>
                                    {showSortMenu && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                                            <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-zinc-900 border border-border/60 rounded-xl shadow-lg py-1 min-w-[160px]">
                                                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => {
                                                            setSortBy(key);
                                                            setShowSortMenu(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 text-xs transition-colors ${sortBy === key
                                                            ? "text-rd-navy dark:text-rd-gold font-semibold bg-rd-navy/5 dark:bg-rd-gold/5"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                            }`}
                                                    >
                                                        {sortLabels[key]}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Vehicle Grid */}
                            {filteredVehicles.length > 0 ? (
                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {filteredVehicles.map((vehicle: Vehicle) => (
                                        <RentalVehicleCard key={vehicle.id} vehicle={vehicle} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-7 w-7 text-muted-foreground/40" />
                                    </div>
                                    <p className="font-serif font-semibold text-lg text-foreground mb-1">
                                        No vehicles match your filters
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Try adjusting your filter criteria or reset all filters.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() =>
                                            setFilters({
                                                vehicleType: "all",
                                                transmission: "all",
                                                fuelTypes: [],
                                                priceRange: [200, 1500],
                                            })
                                        }
                                    >
                                        Reset Filters
                                    </Button>
                                </div>
                            )}

                            {/* Pre-qualification notice */}
                            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-border/50 bg-[#FAFAFA] dark:bg-zinc-900/60">
                                <div className="w-10 h-10 rounded-xl bg-rd-navy/10 dark:bg-rd-gold/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-5 w-5 text-rd-navy dark:text-rd-gold" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-foreground">Pre-Qualification Required</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        A quick 5-minute form with valid ID and references — protects you and our fleet.
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-rd-navy hover:bg-rd-navy/90 text-white font-semibold rounded-full text-xs px-5 whitespace-nowrap"
                                    asChild
                                >
                                    <Link href="/rentals/apply">
                                        Start Application <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate CTA Banner */}
            <section className="border-t-2 border-rd-gold/30">
                <div className="bg-rd-navy">
                    <div className="container px-4 md:px-6 py-10 md:py-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                            <div className="text-center md:text-left">
                                <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
                                    Need a Corporate Fleet? Contact Our Concierge
                                </h2>
                                <p className="mt-2 text-sm text-gray-400 max-w-md">
                                    Discounted weekly and monthly rates for businesses. Dedicated account management included.
                                </p>
                            </div>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/25 text-white hover:bg-white hover:text-rd-navy font-semibold rounded-full px-8 transition-all duration-300"
                                asChild
                            >
                                <a
                                    href={generateWhatsAppLink(
                                        "Hello, I'd like to discuss corporate rental options.\n- Company name:\n- Number of vehicles needed:\n- Duration:"
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Chat on WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
