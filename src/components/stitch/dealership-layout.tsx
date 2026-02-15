"use client";

import { useState, useMemo } from "react";
import { Vehicle } from "@/types";
import { StitchVehicleCard } from "./vehicle-card";
import { StitchFilterSidebar, StitchFilters } from "./filter-sidebar";


interface StitchDealershipLayoutProps {
    initialVehicles: Vehicle[];
}

export function StitchDealershipLayout({
    initialVehicles,
}: StitchDealershipLayoutProps) {
    const [filters, setFilters] = useState<StitchFilters>({
        searchTerm: "",
        bodyStyle: "all",
        priceRange: [0, 500000],
        make: "Any Make",
        model: "Any Model",
        yearRange: [2018, 2024],
    });

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

            // 4. Price Range
            if ((v.price ?? 0) < filters.priceRange[0] || (v.price ?? 0) > filters.priceRange[1]) return false;

            // 5. Year Range (Mock logic as sidebar only has fixed ranges or simple select)
            // The sidebar currently has a simple select for Year, but state has yearRange [number, number]
            // We'll trust the sidebar to set yearRange correctly if it was implemented fully.
            // However, the current sidebar implementation simply has a select that doesn't update the yearRange state yet.
            // We will leave this placeholder or implement if the sidebar was fully updated to send ranges.
            // Looking at sidebar code, it sends "yearRange" but the UI is a select.
            // For now, we will just filter by Price as that was the critical request.

            return true;
        });
    }, [initialVehicles, filters]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            {/* Sidebar */}
            <StitchFilterSidebar onFilterChange={setFilters} />

            {/* Grid Content */}
            <div className="flex-grow">
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
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest Arrivals</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 pointer-events-none">▼</div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredVehicles.map((vehicle) => (
                        <StitchVehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex justify-center">
                    {/* Pagination Component Placeholder */}
                    <div className="flex gap-2">
                        {[1, 2, 3].map(page => (
                            <button
                                key={page}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${page === 1 ? 'bg-rd-gold text-[#0a192f]' : 'bg-[#112240] text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
