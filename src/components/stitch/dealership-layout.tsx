"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "@/types";
import { StitchVehicleCard } from "./vehicle-card";
import { StitchFilterSidebar, StitchFilters } from "./filter-sidebar";
import { MobileFilterSheet } from "./mobile-filter-sheet";


interface StitchDealershipLayoutProps {
    initialVehicles: Vehicle[];
}

export function StitchDealershipLayout({
    initialVehicles,
}: StitchDealershipLayoutProps) {
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState<StitchFilters>({
        searchTerm: "",
        bodyStyle: "all",
        priceRange: [20000, 1000000],
        make: "Any Make",
        model: "Any Model",
        yearRange: [2000, 2025],
    });



    const handleFiltersChange = (newFilters: StitchFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    // Filter Logic
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

            // 2. Body Style
            // Map "sedan", "suv" etc to category
            if (filters.bodyStyle !== "all") {
                const style = filters.bodyStyle.toLowerCase();
                const cat = v.category.toLowerCase();
                // Simple mapping
                if (style === "suv" && !cat.includes("suv")) return false;
                if (style === "sedan" && !cat.includes("sedan") && !cat.includes("luxury")) return false;
                if (style === "truck" && !cat.includes("truck") && !cat.includes("pickup")) return false;
            }

            // 3. Make
            if (filters.make !== "Any Make" && v.make !== filters.make) return false;

            // 4. Price range (Dual Handles)
            const price = v.price ?? 0;
            if (price > 0 && (price < filters.priceRange[0] || price > filters.priceRange[1])) return false;

            // 5. Year Range
            if (v.year < filters.yearRange[0] || v.year > filters.yearRange[1]) return false;

            return true;
        });
    }, [initialVehicles, filters]);

    const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
    const pagedVehicles = filteredVehicles.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative z-10 w-full max-w-full">
            <MobileFilterSheet
                filters={filters}
                onFilterChange={handleFiltersChange}
            />

            {/* Sidebar */}
            <div className="hidden lg:block w-80 shrink-0">
                <StitchFilterSidebar onFilterChange={handleFiltersChange} />
            </div>

            {/* Grid Content */}
            <div className="flex-grow w-full min-w-0">
                {/* Sort & Count Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-white/5">
                    <div>
                        <p className="text-white text-lg font-medium">
                            Showing <span className="text-rd-gold font-bold">{filteredVehicles.length}</span> Premium Vehicles
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Sort by:</span>
                        <div className="relative group">
                            <select className="bg-[#112240] text-white text-sm font-medium border border-white/10 rounded-lg px-4 py-2 pr-8 outline-none cursor-pointer appearance-none focus:border-rd-gold transition-colors">
                                <option>Newest Arrivals</option>
                                <option>Lowest Mileage</option>
                                <option>A–Z Make</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">▼</div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Grid */}
                <div className="grid gap-6 md:gap-8 w-full max-w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))' }}>
                    {pagedVehicles.map((vehicle) => (
                        <StitchVehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                    {pagedVehicles.length === 0 && (
                        <div className="col-span-1 md:col-span-2 xl:col-span-3 py-24 text-center text-slate-500">
                            No vehicles match your filters.
                        </div>
                    )}
                </div>

                {/* Pagination — only shown when there are multiple pages */}
                {totalPages > 1 && (
                    <div className="mt-16 flex justify-center">
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${page === currentPage ? 'bg-rd-gold text-[#0a192f]' : 'bg-[#112240] text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
